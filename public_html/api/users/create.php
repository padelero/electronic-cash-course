<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');

include_once '../config/db.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id'], $input['email'], $input['name'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios']);
    exit;
}

$id = $input['id'];
$email = $input['email'];
$name = $input['name'];
$role = isset($input['role']) ? $input['role'] : 'student';
$wallet_address = isset($input['wallet_address']) ? $input['wallet_address'] : null;

try {
    $query = "INSERT INTO users (id, email, name, role, wallet_address)
              VALUES (:id, :email, :name, :role, :wallet_address)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':role', $role);
    $stmt->bindParam(':wallet_address', $wallet_address);

    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Usuario creado correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error en la base de datos', 'error' => $e->getMessage()]);
}
?>