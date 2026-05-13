<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include __DIR__ . "/../Config/db.php";

$sql = "SELECT * FROM contests ORDER BY id DESC";

$result = $conn->query($sql);

$contests = [];

while ($row = $result->fetch_assoc()) {
    $contests[] = $row;
}

echo json_encode($contests);

?>