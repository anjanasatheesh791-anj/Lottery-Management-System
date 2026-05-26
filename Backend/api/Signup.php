<?php
date_default_timezone_set('Asia/Kolkata');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

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

$dsn = "mysql:host=$host;dbname=$dbname;port=$port;charset=utf8mb4"; 
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

    $name  = isset($data['name']) ? trim($data['name']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $phone = isset($data['phone']) ? trim($data['phone']) : '';
    
    // CRITICAL FIX: Use $u_password so it doesn't overwrite the database $password
    $u_password = isset($data['password']) ? $data['password'] : ''; 
    $confirmPassword = isset($data['confirm_password']) ? $data['confirm_password'] : '';

    if (empty($name) || empty($email) || empty($phone) || empty($u_password) || empty($confirmPassword)) {
        echo json_encode(["status" => "error", "message" => "All fields are mandatory."]);
        exit;
    }

    if ($u_password !== $confirmPassword) {
        echo json_encode(["status" => "error", "message" => "Passwords do not match."]);
        exit;
    }

    $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = ? OR phone = ?");
    $checkStmt->execute([$email, $phone]);
    if ($checkStmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Email or Phone already exists."]);
        exit;
    }

    $hashedPassword = password_hash($u_password, PASSWORD_BCRYPT);
    $role = 'user'; 

    try {
        $pdo->beginTransaction();
        $userSql = "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)";
        $userStmt = $pdo->prepare($userSql);
        $userStmt->execute([$name, $email, $phone, $hashedPassword, $role]);
        
        $userId = $pdo->lastInsertId();
        $otpCode = (string)random_int(100000, 999999);
        $expiresAt = date('Y-m-d H:i:s', strtotime('+10 minutes'));

        $otpSql = "INSERT INTO otp_verifications (user_id, otp_code, otp_type, expires_at) VALUES (?, ?, 'email', ?)";
        $otpStmt = $pdo->prepare($otpSql);
        $otpStmt->execute([$userId, $otpCode, $expiresAt]);

        $pdo->commit();
        echo json_encode(["status" => "success", "message" => "Account created!", "user_id" => $userId]);

    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(["status" => "error", "message" => "Failure: " . $e->getMessage()]);
    }
}
?>