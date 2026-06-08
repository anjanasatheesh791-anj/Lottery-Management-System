<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$sql = "
SELECT
w.id,
u.name AS winner_name,
c.title AS contest_name,
w.prize_amount
FROM winners w
INNER JOIN users u ON w.user_id = u.id
INNER JOIN contests c ON w.contest_id = c.id
ORDER BY w.id DESC
";

$result = mysqli_query($conn,$sql);

$winners = [];

while($row = mysqli_fetch_assoc($result)){
    $winners[] = $row;
}

echo json_encode([
    "success" => true,
    "winners" => $winners
]);

?>