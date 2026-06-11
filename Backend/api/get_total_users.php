<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$sql = "SELECT COUNT(*) AS total_users FROM users";
$result = mysqli_query($conn, $sql);

if ($result) {

    $row = mysqli_fetch_assoc($result);

    echo json_encode([
        "success" => true,
        "total_users" => $row["total_users"]
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch user count"
    ]);

}

mysqli_close($conn);

?>