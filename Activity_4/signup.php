<?php
include 'db.php';

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$type = $_POST['type'];

$stmt = $conn->prepare('INSERT INTO users (date, time, username, password, type, status) VALUES (CURDATE(), CURTIME(), ?, ?, ?, "active")');
$stmt->bind_param('sss', $username, $password, $type);

if ($stmt->execute()) {
  echo "New user created successfully";
  echo '<meta http-equiv="refresh" content="2;url=index.html">';
} else {
  echo "Error: " . $stmt->error;
}

$conn->close();
?>
