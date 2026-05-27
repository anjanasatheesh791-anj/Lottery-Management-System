<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json");

// HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ================= DATABASE =================

$host = getenv("MYSQLHOST");
$user = getenv("MYSQLUSER");
$password = getenv("MYSQLPASSWORD");
$dbname = getenv("MYSQLDATABASE");
$port = getenv("MYSQLPORT");

try {

    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";

    $pdo = new PDO($dsn, $user, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {

    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed",
        "error" => $e->getMessage()
    ]);

    exit();
}

// ================= READ JSON INPUT =================

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON data"
    ]);
    exit();
}

// ================= GET VALUES =================

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$password = trim($data['password'] ?? '');
$confirm_password = trim($data['confirm_password'] ?? '');

// ================= VALIDATION =================

if (
    empty($name) ||
    empty($email) ||
    empty($phone) ||
    empty($password) ||
    empty($confirm_password)
) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit();
}

if ($password !== $confirm_password) {
    echo json_encode([
        "status" => "error",
        "message" => "Passwords do not match"
    ]);
    exit();
}

// ================= CHECK EXISTING EMAIL =================

try {

    $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {

        echo json_encode([
            "status" => "error",
            "message" => "Email already registered"
        ]);

        exit();
    }

} catch(PDOException $e) {

    echo json_encode([
        "status" => "error",
        "message" => "Email check failed",
        "error" => $e->getMessage()
    ]);

    exit();
}

// ================= HASH PASSWORD =================

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// ================= GENERATE OTP =================

$otp = rand(100000, 999999);

// ================= INSERT USER =================

try {

    $stmt = $pdo->prepare("
        INSERT INTO users 
        (name, email, phone, password, otp, is_verified)
        VALUES (?, ?, ?, ?, ?, 0)
    ");

    $stmt->execute([
        $name,
        $email,
        $phone,
        $hashed_password,
        $otp
    ]);

    $user_id = $pdo->lastInsertId();

    echo json_encode([
        "status" => "success",
        "message" => "Signup successful",
        "user_id" => $user_id,
        "otp" => $otp
    ]);

} catch(PDOException $e) {

    echo json_encode([
        "status" => "error",
        "message" => "Registration failed",
        "error" => $e->getMessage()
    ]);
}