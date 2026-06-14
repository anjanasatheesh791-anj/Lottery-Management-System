<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("../config/db.php");

try {

    // =========================
    // ADMIN CONTESTS SUMMARY
    // =========================

    $adminQuery = "
        SELECT
            COUNT(*) as contests,
            COALESCE(SUM(total_collected),0) as collection,
            COALESCE(SUM(admin_commission),0) as revenue,
            COALESCE(SUM(prize_pool),0) as prize
        FROM contests
    ";

    $adminResult = mysqli_query($conn, $adminQuery);
    $adminData = mysqli_fetch_assoc($adminResult);

    // =========================
    // USER POOLS SUMMARY
    // =========================

    $userQuery = "
        SELECT
            COUNT(*) as contests,
            COALESCE(SUM(total_collected),0) as collection,
            COALESCE(SUM(admin_commission),0) as revenue,
            COALESCE(SUM(prize_pool),0) as prize
        FROM usercreated_pools
    ";

    $userResult = mysqli_query($conn, $userQuery);
    $userData = mysqli_fetch_assoc($userResult);

    // =========================
    // COMBINED TOTALS
    // =========================

    $total_collection =
        $adminData['collection'] +
        $userData['collection'];

    $total_revenue =
        $adminData['revenue'] +
        $userData['revenue'];

    $total_prize =
        $adminData['prize'] +
        $userData['prize'];

    $completed_contests =
        $adminData['contests'] +
        $userData['contests'];

    // =========================
    // CONTEST BREAKDOWN
    // =========================

    $contests = [];

    // Admin contests
    $adminPools = mysqli_query($conn,"
        SELECT
            id,
            title as pool_name,
            entry_amount,
            filled_slots as participants,
            total_collected,
            admin_commission,
            prize_pool,
            'Admin Contest' as source
        FROM contests
        ORDER BY id DESC
    ");

    while($row = mysqli_fetch_assoc($adminPools))
    {
        $contests[] = [
            "pool_name" => $row['pool_name'],
            "source" => $row['source'],
            "entry_amount" => (float)$row['entry_amount'],
            "participants" => (int)$row['participants'],
            "collection" => (float)$row['total_collected'],
            "revenue" => (float)$row['admin_commission'],
            "prize_pool" => (float)$row['prize_pool']
        ];
    }

    // User pools
    $userPools = mysqli_query($conn,"
        SELECT
            id,
            pool_name,
            entry_amount,
            filled_slots as participants,
            total_collected,
            admin_commission,
            prize_pool,
            'User Pool' as source
        FROM usercreated_pools
        ORDER BY id DESC
    ");

    while($row = mysqli_fetch_assoc($userPools))
    {
        $contests[] = [
            "pool_name" => $row['pool_name'],
            "source" => $row['source'],
            "entry_amount" => (float)$row['entry_amount'],
            "participants" => (int)$row['participants'],
            "collection" => (float)$row['total_collected'],
            "revenue" => (float)$row['admin_commission'],
            "prize_pool" => (float)$row['prize_pool']
        ];
    }

    echo json_encode([
        "status" => "success",

        "revenue" => [
            "total_collection" => $total_collection,
            "total_revenue" => $total_revenue,
            "total_prize" => $total_prize,
            "completed_contests" => $completed_contests
        ],

        "contests" => $contests
    ]);

}
catch(Exception $e)
{
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

$conn->close();

?>