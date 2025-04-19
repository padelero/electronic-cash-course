<?php
// Permitir peticiones desde cualquier origen
header("Access-Control-Allow-Origin: *"); 
// O específicamente desde tu dominio:
// header("Access-Control-Allow-Origin: https://miapp.com");

// Permitir ciertos métodos HTTP
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permitir ciertas cabeceras, incluyendo 'Authorization'
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Si es una solicitud OPTIONS (preflight), terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// El resto del código PHP...

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
