<?php 
phpinfo();

$servername = "mysql";
$username = "root";
$password = "1q2w3e";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  echo "Not Connect";
  die("Connection failed: " . $conn->connect_error);
}
echo "MySQL Connected successfully";




?>