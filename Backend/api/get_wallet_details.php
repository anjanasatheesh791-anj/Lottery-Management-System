<?php

header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

include("../config/db.php");

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode([
        "status" => "error",
        "message" => "User ID missing"
    ]);
    exit();
}

$stmt = $conn->prepare("
    SELECT
        id,
        user_id,
        balance,
        created_at,
        updated_at
    FROM wallets
    WHERE user_id = ?
");

$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

if ($wallet = $result->fetch_assoc()) {

    echo json_encode([
        "status" => "success",
        "wallet" => [
            "wallet_id" => (int)$wallet['id'],
            "user_id" => (int)$wallet['user_id'],
            "balance" => (float)$wallet['balance'],
            "created_at" => $wallet['created_at'],
            "updated_at" => $wallet['updated_at']
        ]
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Wallet not found"
    ]);
}

$stmt->close();
$conn->close();

?>