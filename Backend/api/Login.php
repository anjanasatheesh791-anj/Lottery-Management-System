<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// 1. DATABASE CONNECTION
require_once __DIR__ . '/../Config/db.php';

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
try {
     $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]); 
} catch (\PDOException $e) {
     echo json_encode(["status" => "error", "message" => "Connection failed."]);
     exit;
}

// 2. PROCESS LOGIN
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = isset($data['email']) ? trim($data['email']) : '';
    $pass  = isset($data['password']) ? $data['password'] : '';

    if (empty($email) || empty($pass)) {
        echo json_encode(["status" => "error", "message" => "Email and password are required."]);
        exit;
    }

    // Search for user
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($pass, $user['password'])) {
        // CHECK IF VERIFIED
        if ($user['is_verified'] == 0) {
            echo json_encode([
                "status" => "unverified", 
                "message" => "Please verify your account first.",
                "user_id" => $user['id'] // Allow them to go back to OTP page
            ]);
            exit;
        }

        // SUCCESS
        echo json_encode([
            "status" => "success",
            "message" => "Login successful!",
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "role" => $user['role']
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
    }
}