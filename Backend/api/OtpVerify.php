<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Force PHP to use the correct timezone to match your system
date_default_timezone_set('Asia/Kolkata'); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// 2. DATABASE CONNECTION
$configFile = dirname(__DIR__) . '/config/db.php';
if (!file_exists($configFile)) {
    echo json_encode(["status" => "error", "message" => "db.php file not found."]);
    exit;
}
require_once $configFile; 

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4"; 
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $password, $options); 
} catch (\PDOException $e) {
     echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
     exit;
}

// 3. CAPTURE & DECODE
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    $userId     = isset($data['user_id']) ? trim($data['user_id']) : '';
    $otpEntered = isset($data['otp']) ? trim($data['otp']) : '';

    if (empty($userId) || empty($otpEntered)) {
        echo json_encode(["status" => "error", "message" => "Required data fields are missing."]);
        exit;
    }

    // 4. VERIFY THE OTP
    // Removed "AND expires_at > NOW()" from the SQL to handle it manually in PHP
    $query = "SELECT * FROM otp_verifications 
              WHERE user_id = ? 
              AND otp_code = ? 
              AND is_used = 0 
              ORDER BY created_at DESC LIMIT 1";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute([$userId, $otpEntered]);
    $otpRecord = $stmt->fetch();

    if ($otpRecord) {
        // --- TIMEZONE FIX START ---
        $expiryTime = strtotime($otpRecord['expires_at']);
        $currentTime = time(); // Current PHP time

        if ($currentTime > $expiryTime) {
            echo json_encode(["status" => "error", "message" => "The security code has expired."]);
            exit;
        }
        // --- TIMEZONE FIX END ---

        try {
            $pdo->beginTransaction();

            $updateOtpStmt = $pdo->prepare("UPDATE otp_verifications SET is_used = 1 WHERE id = ?");
            $updateOtpStmt->execute([$otpRecord['id']]);

            $verifyUserStmt = $pdo->prepare("UPDATE users SET is_verified = 1 WHERE id = ?");
            $verifyUserStmt->execute([$userId]);

            $initWalletStmt = $pdo->prepare("INSERT IGNORE INTO wallets (user_id, balance) VALUES (?, 0.00)");
            $initWalletStmt->execute([$userId]);

            $pdo->commit();
            echo json_encode(["status" => "success", "message" => "Account verified!"]);

        } catch (Exception $e) {
            $pdo->rollBack();
            echo json_encode(["status" => "error", "message" => "System error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid security code."]);
    }
}
?>