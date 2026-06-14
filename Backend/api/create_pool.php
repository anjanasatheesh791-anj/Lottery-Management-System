<?php
// 1. SET UP NETWORK & SECURITY HEADERS (CORS)
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle HTTP preflight OPTIONS requests gracefully before React shoots the real POST request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../config/db.php");

// 3. CAPTURE THE RAW INCOMING REACT JSON INJECTION
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

// 4. VALIDATION SANITY AUDIT
if (
    empty($data['creator_id']) || 
    empty($data['pool_name']) || 
    empty($data['pool_type']) || 
    empty($data['total_slots']) || 
    !isset($data['entry_amount']) || 
    empty($data['winner_count']) ||
    empty($data['visibility']) ||
    !isset($data['expiry_hours']) ||
    !isset($data['prize_pool'])
) {
    echo json_encode(["status" => "error", "message" => "Deployment structural failure. Missing parameters."]);
    exit();
}

// 5. SECURE & PURGE INCOMING VARIABLES (Prevents SQL Injection attacks)
$creator_id   = intval($data['creator_id']);
$pool_name    = $conn->real_escape_string($data['pool_name']);
$pool_type    = $conn->real_escape_string($data['pool_type']);
$total_slots  = intval($data['total_slots']);
$entry_amount = floatval($data['entry_amount']);
$winner_count = intval($data['winner_count']);
$visibility   = $conn->real_escape_string($data['visibility']);
$description  = isset($data['description']) ? $conn->real_escape_string($data['description']) : '';
$expiry_hours = intval($data['expiry_hours']);
$prize_pool   = floatval($data['prize_pool']);
$total_collected = floatval($data['total_collected']);
$admin_commission = floatval($data['admin_commission']);

// 6. CRYPTOGRAPHIC INVITE CODE GENERATOR 
function generateUniqueCode($conn) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $code = '';
    // Loops to stitch together a randomized 6-character alphanumeric sequence
    for ($i = 0; $i < 6; $i++) {
        $code .= $characters[rand(0, strlen($characters) - 1)];
    }
    
    // Check if collision occurs in the database table name usercreated_pools
    $duplicate_check = $conn->query("SELECT id FROM usercreated_pools WHERE invite_code = '$code'");
    if ($duplicate_check->num_rows > 0) {
        return generateUniqueCode($conn); // Recursively try again if code exists
    }
    return $code;
}

if($visibility == 'Public')
    {
        $invite_code=null;
    }
else{
$invite_code = generateUniqueCode($conn);
}

// 7. TRANSFORM RELATIVE EXPIRY HOURS TO REAL TIMESTAMP FOR MYSQL
$expiry_time = date('Y-m-d H:i:s', strtotime("+$expiry_hours hours"));

// 8. COMPILE PREPARED STATEMENT SAFELY
$sql = "INSERT INTO usercreated_pools
(
creator_id,
pool_name,
pool_type,
total_slots,
entry_amount,
winner_count,
visibility,
description,
expiry_time,
total_collected,
admin_commission,
prize_pool,
invite_code,
status
)
VALUES
(
?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Open'
)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "SQL initialization crash: " . $conn->error]);
    exit();
}

// Bind our sanitized variables securely to the data-markers
$stmt->bind_param(
    "issidisssddds", 
    $creator_id, 
    $pool_name, 
    $pool_type, 
    $total_slots, 
    $entry_amount, 
    $winner_count, 
    $visibility, 
    $description, 
    $expiry_time, 
    $total_collected,    
    $admin_commission, 
    $prize_pool,   
    $invite_code
);

// 9. DISPATCH TO DB ENGINE
if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Dynamic instance successfully deployed!",
        "pool_id" => $stmt->insert_id,
        "invite_code" => $invite_code
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database runtime storage rejection: " . $stmt->error
    ]);
}

// 10. CLEAN UP STORAGE PIPELINES
$stmt->close();
$conn->close();
?>