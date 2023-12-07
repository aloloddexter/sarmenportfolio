<?php
session_start();
include 'db.php';

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];

    // Update the logout_time in the login_history table
    $stmt = $conn->prepare('UPDATE login_history SET logout_time = CURRENT_TIMESTAMP WHERE user_id = ?');
    $stmt->bind_param('i', $userId);

    if ($stmt->execute()) {
        // Successfully updated the logout_time
        session_unset();
        session_destroy();
        header('Location: index.html'); // Redirect to the login page
        exit();
    } else {
        echo 'Error updating logout time: ' . $stmt->error;
    }
} else {
    // If the user is not logged in, redirect them to the login page
    header('Location: index.html');
    exit();
}

$conn->close();
?>
