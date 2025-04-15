<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../config/db.php';

try {
    $query = "SELECT * FROM users";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            'success' => true,
            'data' => $users
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'data' => []
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
