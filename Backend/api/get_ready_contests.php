<?php

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