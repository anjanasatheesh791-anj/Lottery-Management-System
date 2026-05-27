<?php

header("Access-Control-Allow-Origin: https://lottery-management-system.vercel.app");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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
    echo json_encode(["status" => "error", "message" => "DB error"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$otp_entered = $data['otp'] ?? null;

if (!$user_id || !$otp_entered) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit;
}

// GET ONLY LATEST OTP
$stmt = $pdo->prepare("
    SELECT * FROM otp_verifications
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
");
$stmt->execute([$user_id]);
$otpRecord = $stmt->fetch();

if (!$otpRecord) {
    echo json_encode(["status" => "error", "message" => "OTP not found"]);
    exit;
}

// CHECK EXPIRED
if (strtotime($otpRecord['expires_at']) < time()) {
    echo json_encode(["status" => "error", "message" => "OTP expired"]);
    exit;
}

// CHECK USED
if ($otpRecord['is_used'] == 1) {
    echo json_encode(["status" => "error", "message" => "OTP already used"]);
    exit;
}

// CHECK OTP
if ($otpRecord['otp_code'] != $otp_entered) {
    echo json_encode(["status" => "error", "message" => "Invalid OTP"]);
    exit;
}

// MARK USED + VERIFY USER
try {
    $pdo->beginTransaction();

    $pdo->prepare("UPDATE otp_verifications SET is_used = 1 WHERE id = ?")
        ->execute([$otpRecord['id']]);

    $pdo->prepare("UPDATE users SET is_verified = 1 WHERE id = ?")
        ->execute([$user_id]);

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Account verified"
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => "Server error"]);
}