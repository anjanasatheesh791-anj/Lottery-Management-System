<?php

$host = getenv("MYSQLHOST");
$user = getenv("MYSQLUSER");
$password = getenv("MYSQLPASSWORD");
$dbname = getenv("MYSQLDATABASE");
$port = getenv("MYSQLPORT");

echo json_encode([
    "host" => $host,
    "user" => $user,
    "dbname" => $dbname,
    "port" => $port
]);

?>