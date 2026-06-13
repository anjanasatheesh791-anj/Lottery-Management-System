<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include __DIR__ . "/../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

// RECEIVE DATA
$title             = $data["title"] ?? "";
$entry_amount      = $data["entry_amount"] ?? 0;
$winner_count      = $data["winner_count"] ?? 0;
$contest_datetime  = $data["contest_datetime"] ?? "";
$max_players       = $data["max_players"] ?? 0;

$total_collected   = $data["total_collected"] ?? 0;
$admin_commission  = $data["admin_commission"] ?? 0;
$prize_pool        = $data["prize_pool"] ?? 0;

// VALIDATION
if (
    empty($title) ||
    empty($contest_datetime) ||
    $max_players <= 0 ||
    $entry_amount <= 0 ||
    $winner_count <= 0
) {
    echo json_encode([
        "success" => false,
        "message" => "All required fields must be provided"
    ]);
    exit;
}

// INSERT QUERY
$sql = "INSERT INTO contests
(
    title,
    entry_amount,
    winner_count,
    contest_datetime,
    max_players,
    total_collected,
    admin_commission,
    prize_pool
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

$stmt->bind_param(
    "sdisiddd",
    $title,
    $entry_amount,
    $winner_count,
    $contest_datetime,
    $max_players,
    $total_collected,
    $admin_commission,
    $prize_pool
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Contest created successfully",
        "contest_id" => $conn->insert_id
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Database insert failed: " . $stmt->error
    ]);

}

$stmt->close();
$conn->close();

?>