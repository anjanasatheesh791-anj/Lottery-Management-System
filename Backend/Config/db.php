<?php

$host = getenv("DB_HOST");
$user = getenv("DB_USER");
$password = getenv("DB_PASS");
$dbname = getenv("DB_NAME");
$port = getenv("DB_PORT");

$conn = new mysqli($host, $user, $password, $dbname, $port);

if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
}

?>