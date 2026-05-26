<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// INCLUDE DB CONNECTION

include("../config/db.php");

// CHECK ID

if (!isset($_GET['id'])) {

    echo json_encode([
        "success" => false,
        "message" => "Contest ID Missing"
    ]);

    exit();

}

$id = $_GET['id'];

// FETCH CONTEST

$sql = "SELECT * FROM contests WHERE id='$id'";

$result = $conn->query($sql);

// CHECK RESULT

if ($result->num_rows > 0) {

    $contest = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "contest" => $contest
    ]);

}

else {

    echo json_encode([
        "success" => false,
        "message" => "Contest Not Found"
    ]);

}

$conn->close();

?>