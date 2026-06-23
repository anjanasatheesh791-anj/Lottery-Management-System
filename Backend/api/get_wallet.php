<?php
// Turn off error reporting display to prevent breaking JSON response structures
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: https://lottery-management-system.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../config/db.php");

if (!isset($_GET['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "User ID missing"
    ]);
    exit;
}

$user_id = $_GET['id'];

$sql = "SELECT balance FROM wallets WHERE user_id = ?";
$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
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
    mysqli_stmt_close($stmt);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database query statement failed"
    ]);
}
?>