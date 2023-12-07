<?php
include 'db.php';

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare('SELECT * FROM users WHERE username = ?');
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {

        switch ($user['type']) {
            case 'admin':
                $redirect = 'admin_dashboard.php';
                break;
            case 'encoder':
                $redirect = 'encoder_dashboard.php';
                break;
            case 'user':
                $redirect = 'viewer_dashboard.php';
                break;
            case 'customer':
                $redirect = 'customer_dashboard.php';
                break;
            default:
                $redirect = 'index.html';
                break;
        }

        // Insert only user_id and login_time into login_history
        $stmt = $conn->prepare('INSERT INTO login_history (user_id, login_time) VALUES (?, CURRENT_TIMESTAMP)');
        $stmt->bind_param('i', $user['id']);
        if (!$stmt->execute()) {
            echo json_encode(['success' => false, 'message' => 'Error recording login history: ' . $stmt->error]);
        } else {
            echo json_encode(['success' => true, 'redirect' => $redirect]);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
    }
}

$conn->close();
?>
