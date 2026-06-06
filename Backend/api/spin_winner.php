<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$contest_id = $data['contest_id'] ?? null;

if (!$contest_id) {

    echo json_encode([
        "success" => false,
        "message" => "Contest ID required"
    ]);

    exit();
}

/*
|--------------------------------------------------------------------------
| CHECK CONTEST
|--------------------------------------------------------------------------
*/

$contest_stmt = $conn->prepare("
    SELECT
        id,
        prize_amount,
        status,
        winner_id
    FROM contests
    WHERE id = ?
");

$contest_stmt->bind_param(
    "i",
    $contest_id
);

$contest_stmt->execute();

$contest =
$contest_stmt
->get_result()
->fetch_assoc();

if (!$contest) {

    echo json_encode([
        "success" => false,
        "message" => "Contest not found"
    ]);

    exit();
}

if ($contest['status'] !== 'completed') {

    echo json_encode([
        "success" => false,
        "message" => "Contest is not ready for draw"
    ]);

    exit();
}

if (!empty($contest['winner_id'])) {

    echo json_encode([
        "success" => false,
        "message" => "Winner already declared"
    ]);

    exit();
}

/*
|--------------------------------------------------------------------------
| FETCH PARTICIPANTS
|--------------------------------------------------------------------------
*/

$participant_stmt = $conn->prepare("
    SELECT
        u.id,
        u.name
    FROM joined_pools jp
    INNER JOIN users u
        ON jp.user_id = u.id
    WHERE jp.pool_id = ?
    AND jp.pool_source = 'admin'
");

$participant_stmt->bind_param(
    "i",
    $contest_id
);

$participant_stmt->execute();

$result =
$participant_stmt->get_result();

$participants = [];

while (
    $row =
    $result->fetch_assoc()
) {

    $participants[] = $row;
}

if (count($participants) === 0) {

    echo json_encode([
        "success" => false,
        "message" => "No participants found"
    ]);

    exit();
}

/*
|--------------------------------------------------------------------------
| RANDOM WINNER
|--------------------------------------------------------------------------
*/

$winner =
$participants[
    array_rand($participants)
];

$conn->begin_transaction();

try {

    /*
    ----------------------------------------------------------
    CREDIT WALLET
    ----------------------------------------------------------
    */

    $wallet_stmt = $conn->prepare("
        UPDATE wallets
        SET balance = balance + ?
        WHERE user_id = ?
    ");

    $wallet_stmt->bind_param(
        "di",
        $contest['prize_amount'],
        $winner['id']
    );

    $wallet_stmt->execute();

    /*
    ----------------------------------------------------------
    SAVE WINNER
    ----------------------------------------------------------
    */

    $winner_stmt = $conn->prepare("
        INSERT INTO winners
        (
            contest_id,
            user_id,
            prize_amount
        )
        VALUES
        (
            ?, ?, ?
        )
    ");

    $winner_stmt->bind_param(
        "iid",
        $contest_id,
        $winner['id'],
        $contest['prize_amount']
    );

    $winner_stmt->execute();

    /*
    ----------------------------------------------------------
    UPDATE CONTEST
    ----------------------------------------------------------
    */

    $drawn_status = "drawn";

    $update_stmt = $conn->prepare("
        UPDATE contests
        SET
            winner_id = ?,
            status = ?
        WHERE id = ?
    ");

    $update_stmt->bind_param(
        "isi",
        $winner['id'],
        $drawn_status,
        $contest_id
    );

    $update_stmt->execute();

    $conn->commit();

    echo json_encode([
        "success" => true,
        "winner" => [
            "id" => $winner['id'],
            "name" => $winner['name']
        ]
    ]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}

$conn->close();

?>