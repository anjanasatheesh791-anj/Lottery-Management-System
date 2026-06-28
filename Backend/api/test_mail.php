<?php

require_once 'send_mail.php';

$result = sendWelcomeEmail(
    'anjanasatheesh791@gmail.com',
    'Anjana'
);

echo "<pre>";
print_r($result);
echo "</pre>";