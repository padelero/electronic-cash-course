<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$host = "https://195.35.53.21"; // Usa la IP de tu base de datos
$db_name = "u877712588_crypto";
$username = "u877712588_crypto";
$password = "jz&$F$M2VW9G#FpzbQ@n";
$conn = null;

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    die();
}
?>
