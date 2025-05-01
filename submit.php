<?php
// Database connection
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'userdb';

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch form data with sanitization
$full_name = filter_input(INPUT_POST, 'full_name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$upi_id = filter_input(INPUT_POST, 'upi_id', FILTER_SANITIZE_STRING);
$amount = filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_NUMBER_INT);

// Validation
$errors = [];

if (empty($full_name) || !preg_match("/^[a-zA-Z\s]+$/", $full_name)) {
    $errors[] = "Invalid full name (letters and spaces only).";
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email address.";
}
if (empty($upi_id) || !preg_match("/^[\w.-]+@[\w.-]+$/", $upi_id)) {
    $errors[] = "Invalid UPI ID format.";
}
if (empty($amount) || !filter_var($amount, FILTER_VALIDATE_INT) || $amount <= 0) {
    $errors[] = "Invalid amount (must be a positive number).";
}

if (empty($errors)) {
    // Start transaction
    $conn->begin_transaction();

    try {
        // Insert user details into `user_details` table
        $stmt = $conn->prepare("INSERT INTO user_details (full_name, email, upi_id, amount) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $full_name, $email, $upi_id, $amount);

        if (!$stmt->execute()) {
            throw new Exception("Error adding user details: " . $stmt->error);
        }

        $user_id = $stmt->insert_id; // Get the last inserted user ID
        $stmt->close();

        // Insert order into `orders` table (Ensure `orders.user_id` references `user_details.id`)
        $stmt_order = $conn->prepare("INSERT INTO orders (user_id, quantity, total_price, order_date) VALUES (?, ?, ?, NOW())");
        $quantity = 1; // Default quantity
        $stmt_order->bind_param("iid", $user_id, $quantity, $amount);

        if (!$stmt_order->execute()) {
            throw new Exception("Error adding order: " . $stmt_order->error);
        }

        $order_id = $stmt_order->insert_id; // Get the last inserted order ID
        $stmt_order->close();

        // Commit transaction
        $conn->commit();

        // Redirect to order confirmation page
        header("Location: order_confirmation.php?order_id=$order_id");
        exit();
    } catch (Exception $e) {
        // Rollback on error
        $conn->rollback();
        echo "Transaction failed: " . $e->getMessage();
    }
} else {
    foreach ($errors as $error) {
        echo $error . "<br>";
    }
}

$conn->close();
?>
