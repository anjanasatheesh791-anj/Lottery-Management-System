<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    // Your Gmail address
    $mail->Username = 'YOUR_GMAIL@gmail.com';

    // Your App Password (NOT Gmail password)
    $mail->Password = 'YOUR_16_CHARACTER_APP_PASSWORD';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom(
        'YOUR_GMAIL@gmail.com',
        'SpinVault'
    );

    // Change this to your own email for testing
    $mail->addAddress('YOUR_TEST_EMAIL@gmail.com');

    $mail->isHTML(true);

    $mail->Subject = 'Welcome to SpinVault';

    $mail->Body = '
        <h2>Welcome to SpinVault 🎉</h2>
        <p>Your account has been created successfully.</p>
        <p>Enjoy using SpinVault.</p>
    ';

    $mail->send();

    echo "Email Sent Successfully";

} catch (Exception $e) {

    echo "Email Failed<br>";
    echo $mail->ErrorInfo;
}