<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	$mail->setFrom('www@ya.ru', 'URPH');
	$mail->addAddress('shishokina.irina@mail.ru');
	$mail->Subject = 'Заявка на съёмку';

	$city = 'Кемерово';
	if($_POST['city'] == 'ber'){
		$city = 'Берёзовский';
	}

	//Тело письма
	$body = '<h1>Данные заявки:</h1>';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['city']))){
		$body.='<p><strong>Город:</strong> '.$city.'</p>';
	}
	if(trim(!empty($_POST['types']))){
		$body.='<p><strong>Тип съёмки:</strong> '.$_POST['types'].'</p>';
	}
	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка отправки данных';
		// return false;
	} else {
		$message = 'Спасибо за заявку. Я свяжусь с вами в ближайшее время.';
		// return true;
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>
