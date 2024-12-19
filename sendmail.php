<?php
require "PHPMailerAutoload.php";

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'smtp.mail.ru';
$mail->SMTPAuth = true;
$mail->Username = 'your_email@example.com';
$mail->Password = 'your_email_password';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom($email, $name);
$mail->addAddress('your_email@example.com');
$mail->isHTML(true);

$mail->Subject = 'Сообщение с формы обратной связи';
$mail->Body    = "От: $name <br> Email: $email <br> Телефон: $phone";

if (!$mail->send()) {
    echo 'Ошибка при отправке сообщения.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Сообщение успешно отправлено!';
}
