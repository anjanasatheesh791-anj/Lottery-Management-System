<?php
header("Access-Control-Allow-Origin: https://lottery-management-system.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../config/db.php");

/* CHECK USER ID */

if (!isset($_GET['id'])) {

    echo json_encode([
        "status" => "error",
        "message" => "User ID missing"
    ]);

    exit;
}

$user_id = $_GET['id'];

/* FETCH WALLET BALANCE */

$sql = "SELECT balance FROM wallets WHERE user_id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $user_id);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {

    echo json_encode([
        "status" => "success",
        "wallet" => [
            "balance" => (float)$row['balance']
        ]
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Wallet not found"
    ]);
}
?>