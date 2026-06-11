<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

// Active admin contests
$contestQuery = mysqli_query(
    $conn,
    "SELECT COUNT(*) AS total FROM contests WHERE status='active'"
);

$contestCount = mysqli_fetch_assoc($contestQuery)['total'];

// Open user-created pools
$poolQuery = mysqli_query(
    $conn,
    "SELECT COUNT(*) AS total FROM usercreated_pools WHERE status='open'"
);

$poolCount = mysqli_fetch_assoc($poolQuery)['total'];

$totalActiveContests = $contestCount + $poolCount;

echo json_encode([
    "success" => true,
    "active_contests" => $totalActiveContests,
    "admin_contests" => $contestCount,
    "user_pools" => $poolCount
]);

mysqli_close($conn);

?>