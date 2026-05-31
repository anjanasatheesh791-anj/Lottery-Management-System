<?php
header("Access-Control-Allow-Origin:https://lottery-management-system.vercel.app/");
header("Content-Type: application/json");

include __DIR__ . "/../config/db.php";

$userquery = $conn->query("SELECT COUNT(*) as total_users FROM users");
$totalUsers = $userQuery->fetch_assoc()['total_users'];
$contestQuery = $conn->query("

SELECT
(
  SELECT COUNT(*)
  FROM contests
  WHERE status='active'
)
+
(
  SELECT COUNT(*)
  FROM usercreated_pools
  WHERE status='open'
)

AS active_contests

");

$activeContests =
$contestQuery->fetch_assoc()['active_contests'];

$ticketsQuery = $conn->query("
SELECT COUNT(*) as tickets_sold
FROM joined_pools
");
