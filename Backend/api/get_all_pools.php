<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


include("../config/db.php");

// This array will store BOTH:
// - admin contests
// - user created pools
$allPools = [];



$adminQuery = "
SELECT 
    id,
    title AS pool_name,
    entry_fee AS entry_amount,
    max_players,
    NULL AS winner_count,
    filled_slots,
    'Public' AS visibility,
    'admin' AS pool_source
FROM contests
WHERE status='active'
";

// Execute query
$adminResult = $conn->query($adminQuery);

// Check if contests exist
if ($adminResult && $adminResult->num_rows > 0) {

    // Loop through all admin contests
    while ($row = $adminResult->fetch_assoc()) {

        // Store inside common array
        $allPools[] = [
            "id" => $row['id'],
            "pool_name" => $row['pool_name'],
            "entry_amount" => $row['entry_amount'],
            "total_slots" => $row['max_players'],
            "filled_slots"=> $row['filled_slots'],
            "winner_count" => $row['winner_count'],
            "visibility" => $row['visibility'],
            "pool_source" => $row['pool_source']
        ];
    }
}


// Only PUBLIC pools are fetched
// Private pools require invite code

$userQuery = "
SELECT 
    id,
    pool_name,
    entry_amount,
    prize_pool,
    total_slots,
    winner_count,
    visibility,
    filled_slots,
    'user' AS pool_source
FROM usercreated_pools
WHERE visibility='Public'
AND status='Open'
";

// Execute query
$userResult = $conn->query($userQuery);

// Check if pools exist
if ($userResult && $userResult->num_rows > 0) {

    // Loop through all user pools
    while ($row = $userResult->fetch_assoc()) {

        // Add into common array
        $allPools[] = [
            "id" => $row['id'],
            "pool_name" => $row['pool_name'],
            "entry_amount" => $row['entry_amount'],
            "prize_pool" => $row['prize_pool'],
            "total_slots" => $row['total_slots'],
            "winner_count" => $row['winner_count'],
            "visibility" => $row['visibility'],
            "filled_slots" => $row['filled_slots'],
            "pool_source" => $row['pool_source']
        ];
    }
}



// Sort newest IDs first
usort($allPools, function($a, $b) {
    return $b['id'] - $a['id'];
});



echo json_encode([
    "status" => "success",
    "data" => $allPools
]);


$conn->close();

?>