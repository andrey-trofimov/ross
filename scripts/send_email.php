<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['uName']);
    $email = htmlspecialchars($_POST['uEmail']);
    $phone = htmlspecialchars($_POST['uPhone']);

    // Проверка на наличие данных
    if (!empty($name) && !empty($email) && !empty($phone)) {
        // Настройки для отправки email
        $to = "va_bank@mail.ru"; // Укажите свой email
        $subject = "Новое сообщение от $name";
        $body = "Имя: $name\nEmail: $email\n\nСообщение:\n$phone";
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Отправка email
        if (mail($to, $subject, $body, $headers)) {
            echo "Сообщение успешно отправлено!";
        } else {
            echo "Ошибка при отправке сообщения.";
        }
    } else {
        echo "Пожалуйста, заполните все поля.";
    }
}
?>
