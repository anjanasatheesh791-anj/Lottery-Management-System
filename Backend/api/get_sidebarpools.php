<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config/db.php");

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "Missing User ID."]);
    exit();
}

try {
    $history = [];

    // 1. Get the 5 most recent pools joined by this specific user
    $query = "SELECT pool_id, pool_source FROM joined_pools WHERE user_id = ? ORDER BY id DESC LIMIT 5";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $pool_id = $row['pool_id'];
        $source = $row['pool_source'];

        // 2. Set dynamic table parameters based on source
        $table = ($source === 'admin') ? 'contests' : 'usercreated_pools';
        $title_col = ($source === 'admin') ? 'title' : 'pool_name';
        $fee_col = ($source === 'admin') ? 'entry_fee' : 'entry_amount';

        // 3. Fetch the individual pool details
        $pool_query = "SELECT id, $title_col AS pool_name, $fee_col AS entry_amount, status, winner_id FROM $table WHERE id = ?";
        $p_stmt = $conn->prepare($pool_query);
        $p_stmt->bind_param("i", $pool_id);
        $p_stmt->execute();
        $pool = $p_stmt->get_result()->fetch_assoc();

        if ($pool) {
            // 4. Determine the game status outcome
            $status_display = "Live";
            if ($pool['status'] === 'completed' || $pool['status'] === 'Drawn') {
                $status_display = ((int)$pool['winner_id'] === (int)$user_id) ? "Won" : "Lost";
            }

            $history[] = [
                "pool_name" => $pool['pool_name'],
                "entry_amount" => $pool['entry_amount'],
                "status" => $status_display
            ];
        }
    }

    echo json_encode(["status" => "success", "data" => $history]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
?>