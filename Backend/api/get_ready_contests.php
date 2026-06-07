<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


include("../config/db.php");

$query = $conn->query("
SELECT *
FROM contests
WHERE status='completed'
");

$contests = [];

while($row = $query->fetch_assoc()){

    $contests[] = $row;

}

echo json_encode([
    "success" => true,
    "contests" => $contests
]);