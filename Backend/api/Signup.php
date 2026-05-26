<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once dirname(__DIR__) . '/config/db.php';

try {

    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";

    $pdo = new PDO($dsn, $user, $password);

    echo json_encode([
        "status" => "success",
        "message" => "Database connected"
    ]);

} catch(PDOException $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}