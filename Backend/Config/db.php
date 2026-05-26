<?php

$host = getenv("MYSQLHOST");
$user = getenv("MYSQLUSER");
$password = getenv("MYSQLPASSWORD");
$dbname = getenv("MYSQLDATABASE");
$port = getenv("MYSQLPORT");

$conn = new mysqli($host, $user, $password, $dbname, $port);

// CHECK CONNECTION
if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
}

?>