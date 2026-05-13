<?php

$host = "localhost";
$user = "lottery_user";
$password = "lottery123";
$dbname = "lotteryms_db";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
}

?>