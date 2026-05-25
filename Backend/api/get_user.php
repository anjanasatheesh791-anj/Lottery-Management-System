<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

include("../config/db.php");

/* GET USER ID */

if (!isset($_GET['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "User ID missing"
    ]);
    exit;
}

$user_id = $_GET['id'];

/* FETCH USER */

$sql = "SELECT id, name, email, phone FROM users WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $user_id);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {

    echo json_encode([
        "status" => "success",
        "user" => $row
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
}
?>