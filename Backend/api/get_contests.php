<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*"); // Added to prevent any mobile network CORS blocks
header("Content-Type: application/json");

include __DIR__ . "/../Config/db.php";

// 🌟 CHECK IF A SPECIFIC CONTEST ID WAS REQUESTED
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // A single contest is being requested (from the JoinContest phone scan)
    $stmt = $conn->prepare("SELECT * FROM contests WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode(["success" => true, "contest" => $row]);
    } else {
        echo json_encode(["success" => false, "message" => "Contest not found."]);
    }
} else {
    // No ID parameter supplied, run your original logic for the Admin Dashboard list
    $sql = "SELECT * FROM contests ORDER BY id DESC";
    $result = $conn->query($sql);
    $contests = [];

    while ($row = $result->fetch_assoc()) {
        $contests[] = $row;
    }

    echo json_encode($contests);
}

?>