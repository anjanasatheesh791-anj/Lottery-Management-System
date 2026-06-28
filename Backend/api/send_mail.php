<?php

function sendWelcomeEmail($email, $name)
{
    $apiKey = getenv('BREVO_API_KEY');

    $data = [
        "sender" => [
            "name" => "SpinVault",
            "email" => "YOUR_PROJECT_GMAIL@gmail.com"
        ],

        "to" => [
            [
                "email" => $email,
                "name" => $name
            ]
        ],

        "subject" => "Welcome to SpinVault 🎉",

        "htmlContent" => "
            <h2>Welcome to SpinVault 🎉</h2>
            <p>Hello $name,</p>
            <p>Your account has been created successfully.</p>
            <p>Thank you for joining SpinVault.</p>
            <p>Have fun and good luck!</p>
        "
    ];

    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.brevo.com/v3/smtp/email",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => [
            "accept: application/json",
            "api-key: $apiKey",
            "content-type: application/json"
        ]
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        return "cURL Error: " . curl_error($ch);
    }

    curl_close($ch);

    return $response;
}