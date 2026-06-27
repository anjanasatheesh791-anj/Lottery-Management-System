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
    $mail->Username = 'spinvault.project@gmail.com';

    // Your App Password (NOT Gmail password)
    $mail->Password = 'gaml wpsi igvd qngc';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom(
        'spinvault.project@gmail.com',
        'SpinVault'
    );

    // Change this to your own email for testing
    $mail->addAddress('anjanasatheesh791@gmail.com');

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