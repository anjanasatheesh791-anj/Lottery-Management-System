<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include("../config/db.php");

$sql = "
SELECT
    id,
    name,
    email,
    phone,
    role,
    is_verified,
    can_create_pool,
    can_join_pool,
    account_status,
    created_at
FROM users
ORDER BY id DESC
";

$result = mysqli_query($conn, $sql);

if (!$result) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch users"
    ]);
    exit;
}

$users = [];

while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
}

echo json_encode([
    "success" => true,
    "users" => $users
]);

mysqli_close($conn);

?>