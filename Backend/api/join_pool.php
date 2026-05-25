<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include("../config/db.php");

// Get the POST data from React
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$pool_id = $data['pool_id'] ?? null;
$pool_source = $data['pool_source'] ?? null; // 'admin' or 'user'

if (!$user_id || !$pool_id || !$pool_source) {
    echo json_encode(["status" => "error", "message" => "Missing required data."]);
    exit();
}

// Map the pool source to your exact database tables
// Map the pool source to your exact database tables
if ($pool_source === 'admin') {
    $table = "contests";
    $fee_col = "entry_fee";
    $prize_col = "prize_amount";
    $slots_col = "max_players";
    $status_active_val = "active";
    $status_closed_val = "completed"; // 🌟 Matches your Admin ENUM
} else {
    $table = "usercreated_pools";
    $fee_col = "entry_amount";
    $prize_col = "prize_pool";
    $slots_col = "total_slots";
    $status_active_val = "Open";
    $status_closed_val = "Drawn";     // 🌟 Matches your User ENUM
}

// 1. Fetch Pool details dynamically
$pool_stmt = $conn->prepare("SELECT $fee_col AS entry_amount, $prize_col AS prize_pool, $slots_col AS total_slots, filled_slots, status FROM $table WHERE id = ?");
$pool_stmt->bind_param("i", $pool_id);
$pool_stmt->execute();
$pool = $pool_stmt->get_result()->fetch_assoc();

if (!$pool || $pool['status'] !== $status_active_val) {
    echo json_encode(["status" => "error", "message" => "This pool is not open or doesn't exist."]);
    exit();
}

if ($pool['filled_slots'] >= $pool['total_slots']) {
    echo json_encode(["status" => "error", "message" => "This pool is already full!"]);
    exit();
}

// 2. Prevent duplicate entries in the same pool (Using your joined_pools table)
$check_stmt = $conn->prepare("SELECT id FROM joined_pools WHERE pool_id = ? AND user_id = ? AND pool_source = ?");
$check_stmt->bind_param("iis", $pool_id, $user_id, $pool_source);
$check_stmt->execute();
if ($check_stmt->get_result()->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "You have already joined this pool!"]);
    exit();
}

// 3. Check user balance from wallets table
$wallet_stmt = $conn->prepare("SELECT balance FROM wallets WHERE user_id = ?");
$wallet_stmt->bind_param("i", $user_id);
$wallet_stmt->execute();
$wallet = $wallet_stmt->get_result()->fetch_assoc();

if (!$wallet || $wallet['balance'] < $pool['entry_amount']) {
    echo json_encode(["status" => "error", "message" => "Insufficient wallet balance."]);
    exit();
}

// 4. DATABASE TRANSACTION (Deduct money, register player, run lottery if full)
$conn->begin_transaction();

try {
    // A. Deduct entry amount from wallets table
    $deduct_stmt = $conn->prepare("UPDATE wallets SET balance = balance - ? WHERE user_id = ?");
    $deduct_stmt->bind_param("di", $pool['entry_amount'], $user_id);
    $deduct_stmt->execute();

    // B. Insert into joined_pools tracking table
    $join_stmt = $conn->prepare("INSERT INTO joined_pools (pool_id, user_id, pool_source) VALUES (?, ?, ?)");
    $join_stmt->bind_param("iis", $pool_id, $user_id, $pool_source);
    $join_stmt->execute();

    // C. Increment filled_slots count
    $new_filled_slots = $pool['filled_slots'] + 1;
    $update_pool_stmt = $conn->prepare("UPDATE $table SET filled_slots = ? WHERE id = ?");
    $update_pool_stmt->bind_param("ii", $new_filled_slots, $pool_id);
    $update_pool_stmt->execute();

    $extra_msg = "";

    // D. INSTANT LOTTERY ENGINE TRIGGER (Runs right on the HTTP request if slots are full!)
    if ($new_filled_slots == $pool['total_slots']) {
        
        // Fetch everyone who joined this specific pool
        $players_stmt = $conn->prepare("SELECT user_id FROM joined_pools WHERE pool_id = ? AND pool_source = ?");
        $players_stmt->bind_param("is", $pool_id, $pool_source);
        $players_stmt->execute();
        $players_res = $players_stmt->get_result();
        
        $participants = [];
        while ($p_row = $players_res->fetch_assoc()) {
            $participants[] = $p_row['user_id'];
        }

        if (count($participants) > 0) {
            // Pick a completely random winner using cryptographically secure random_int
            $winning_index = random_int(0, count($participants) - 1);
            $winner_id = $participants[$winning_index];

            // Close the contest and update winner_id (Ensure your tables have a winner_id column)
            $close_stmt = $conn->prepare("UPDATE $table SET status = ?, winner_id = ? WHERE id = ?");
            $close_stmt->bind_param("sii", $status_closed_val, $winner_id, $pool_id);
            $close_stmt->execute();

            // Payout prize amount directly to the winner's wallet
            $payout_stmt = $conn->prepare("UPDATE wallets SET balance = balance + ? WHERE user_id = ?");
            $payout_stmt->bind_param("di", $pool['prize_pool'], $winner_id);
            $payout_stmt->execute();

            $extra_msg = " Pool filled! The draw took place instantly.";
        }
    }

    $conn->commit();
    echo json_encode(["status" => "success", "message" => "Successfully joined pool!" . $extra_msg]);

} catch (Exception $e) {
    $conn->rollback();
    // CHANGE THIS LINE TEMPORARILY TO SEE THE EXACT ERROR:
    echo json_encode(["status" => "error", "message" => "SQL Error: " . $e->getMessage()]);
}

$conn->close();
?>