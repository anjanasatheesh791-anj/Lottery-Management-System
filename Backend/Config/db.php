<?php

echo json_encode([
    "host" => getenv("MYSQLHOST"),
    "user" => getenv("MYSQLUSER"),
    "password" => getenv("MYSQLPASSWORD"),
    "database" => getenv("MYSQLDATABASE"),
    "port" => getenv("MYSQLPORT")
]);

exit;