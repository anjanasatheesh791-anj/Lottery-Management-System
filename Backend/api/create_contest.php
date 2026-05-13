<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include __DIR__ . "/../Config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$title = $data["title"] ?? "";
$prize_amount = $data["prize_amount"] ?? "";
$contest_datetime = $data["contest_datetime"] ?? "";
$max_players = $data["max_players"] ?? "";

if (
    empty($title) ||
    empty($prize_amount) ||
    empty($contest_datetime) ||
    empty($max_players)
) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

$sql = "INSERT INTO contests 
(title, prize_amount, contest_datetime, max_players)
VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssi",
    $title,
    $prize_amount,
    $contest_datetime,
    $max_players
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
        "message" => "Database insert failed"
    ]);

}

?>