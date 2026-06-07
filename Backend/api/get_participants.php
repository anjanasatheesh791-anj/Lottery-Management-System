<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../config/db.php");

$contest_id = $_GET['contest_id'] ?? null;

if (!$contest_id) {

    echo json_encode([
        "success" => false,
        "message" => "Contest ID is required"
    ]);

    exit();
}

$stmt = $conn->prepare("
    SELECT
        u.id,
        u.name
    FROM joined_pools jp
    INNER JOIN users u
        ON jp.user_id = u.id
    WHERE jp.pool_id = ?
    AND jp.pool_source = 'admin'
");

$stmt->bind_param(
    "i",
    $contest_id
);

$stmt->execute();

$result = $stmt->get_result();

$participants = [];

while ($row = $result->fetch_assoc()) {

    $participants[] = $row;
}

echo json_encode([
    "success" => true,
    "participants" => $participants
]);

$conn->close();

?>