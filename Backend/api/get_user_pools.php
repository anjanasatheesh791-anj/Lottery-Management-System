<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle pre-flight OPTIONS network requests gracefully before standard verification execution
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


include("../config/db.php"); 

// fallback simulation catch if db connection handles are globally referenced as $conn or $db
if (!isset($conn) && isset($db)) {
    $conn = $db; 
}


$user_id = isset($_GET['user_id']) ? trim($_GET['user_id']) : '';

// Quick failure circuit breaker if the query identity token is missing entirely
if (empty($user_id)) {
    http_response_code(400); // Bad Request status
    echo json_encode([
        "status" => "error",
        "message" => "Routing lifecycle failed: Mandatory 'user_id' parameter trace missing from request profile context."
    ]);
    exit();
}

// Sanitize string to lock down database fields against malicious injection payloads
$user_id_clean = mysqli_real_escape_string($conn, $user_id);

// Construct the operational query command targeting your local SQL server ledger
// Pulls records chronologically, placing your newest deployed pools at the top of the grid view
$sql_query = "SELECT * FROM usercreated_pools WHERE creator_id = '$user_id_clean' ORDER BY id DESC";

$query_execution = mysqli_query($conn, $sql_query);

// Handle operational database execution connection failure crashes gracefully
if (!$query_execution) {
    http_response_code(500); // Internal Server Error status
    echo json_encode([
        "status" => "error",
        "message" => "Database Transaction Failure: " . mysqli_error($conn)
    ]);
    exit();
}

// =========================================================================
// ARTIFACT COMPILATION & RESPONSE REVEAL
// =========================================================================
$user_pools_array = [];

// Loop through your matching raw database rows, mapping keys to string value arrays
while ($row_entry = mysqli_fetch_assoc($query_execution)) {
    
    // Explicit typecasting mappings to ensure values render uniformly back on the React canvas
    $user_pools_array[] = [
        "id" => (int)$row_entry['id'],
        "creator_id" => $row_entry['creator_id'],
        "pool_name" => $row_entry['pool_name'],
        "pool_type" => $row_entry['pool_type'],
        "total_slots" => (int)$row_entry['total_slots'],
        "entry_amount" => (float)$row_entry['entry_amount'],
        "winner_count" => (int)$row_entry['winner_count'],
        "visibility" => $row_entry['visibility'],
        "description" => $row_entry['description'],
        "expiry_hours" => isset($row_entry['expiry_hours']) ? (int)$row_entry['expiry_hours'] : 24,
        "prize_pool" => (float)$row_entry['prize_pool'],
        "invite_code" => $row_entry['invite_code'],
        "created_at" => isset($row_entry['created_at']) ? $row_entry['created_at'] : null
    ];
}

// Return execution tracking codes directly back to React alongside the JSON array stack
http_response_code(200);
echo json_encode([
    "status" => "success",
    "total_records" => count($user_pools_array),
    "data" => $user_pools_array
]);