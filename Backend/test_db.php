<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli(
    "localhost",
    "lottery_user",
    "lottery123",
    "lotteryms_db"
);

if ($conn->connect_error) {
    die("DB FAILED: " . $conn->connect_error);
}

echo "SUCCESS: DB CONNECTED";

?>