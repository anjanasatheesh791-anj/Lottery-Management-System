<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 0); 
error_reporting(E_ALL);

include("../config/db.php");

$pool_id = $_GET['pool_id'] ?? null;
$pool_source = $_GET['pool_source'] ?? null;

if (!$pool_id || !$pool_source) {
    echo json_encode(["status" => "error", "message" => "Missing arguments."]);
    exit();
}

try {
    $table = ($pool_source === 'admin') ? 'contests' : 'usercreated_pools';
    $title_col = ($pool_source === 'admin') ? 'title' : 'pool_name';
    $fee_col = ($pool_source === 'admin') ? 'entry_fee' : 'entry_amount';
    $prize_col = ($pool_source === 'admin') ? 'prize_amount' : 'prize_pool';
    $slots_col = ($pool_source === 'admin') ? 'max_players' : 'total_slots';
    
    // 🌟 DYNAMIC VISIBILITY HANDLING
    // If it's admin, we hardcode 'Public' as the value. If user, we read the real column!
    $visibility_select = ($pool_source === 'admin') ? "'Public' AS visibility" : "visibility";

    // 1. Fetch Pool Details securely
    $query = "SELECT id, $title_col AS pool_name, $fee_col AS entry_amount, $prize_col AS prize_pool, $slots_col AS total_slots, filled_slots, $visibility_select, created_at FROM $table WHERE id = ?";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        throw new Exception("Failed to prepare pool query: " . $conn->error);
    }
    
    $stmt->bind_param("i", $pool_id);
    $stmt->execute();
    $pool = $stmt->get_result()->fetch_assoc();

    if (!$pool) {
        throw new Exception("Pool record not found in database.");
    }

    // 2. Fetch Joined Participants names
    $players_query = "
        SELECT u.name 
        FROM joined_pools jp 
        JOIN users u ON jp.user_id = u.id 
        WHERE jp.pool_id = ? AND jp.pool_source = ?
    ";
    $p_stmt = $conn->prepare($players_query);
    if (!$p_stmt) {
        throw new Exception("Failed to prepare players query: " . $conn->error);
    }

    $p_stmt->bind_param("is", $pool_id, $pool_source);
    $p_stmt->execute();
    $p_res = $p_stmt->get_result();

    $participants = [];
    while($row = $p_res->fetch_assoc()) {
        $participants[] = $row['name'];
    }

    echo json_encode([
        "status" => "success",
        "pool" => $pool,
        "participants" => $participants
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Server Error: " . $e->getMessage()
    ]);
}

if (isset($conn)) {
    $conn->close();
}
?>