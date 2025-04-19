
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


$host = "localhost";
$db_name = "u877712588_crypto";
$username = "u877712588_crypto";
$password = 'jz&$F$M2VW9G#FpzbQ@n'; // Nota las comillas simples

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>

