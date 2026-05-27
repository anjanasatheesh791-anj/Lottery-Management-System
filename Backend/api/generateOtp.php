<?php

header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

$host = getenv("MYSQLHOST");
$user = getenv("MYSQLUSER");
$password = getenv("MYSQLPASSWORD");
$dbname = getenv("MYSQLDATABASE");
$port = getenv("MYSQLPORT");

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
        $user,
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "User ID required"]);
    exit;
}

// DELETE OLD OTP
$pdo->prepare("DELETE FROM otp_verifications WHERE user_id = ?")
    ->execute([$user_id]);

// CREATE NEW OTP
$otp = rand(100000, 999999);
$expires_at = date("Y-m-d H:i:s", strtotime("+10 minutes"));

$stmt = $pdo->prepare("
    INSERT INTO otp_verifications (user_id, otp_code, expires_at, is_used)
    VALUES (?, ?, ?, 0)
");

$stmt->execute([$user_id, $otp, $expires_at]);

echo json_encode([
    "status" => "success",
    "message" => "OTP generated",
    "otp" => $otp
]);