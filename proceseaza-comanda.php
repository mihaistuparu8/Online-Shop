<?php 
	if(!isset($_POST['nume'])) {
		die("false");
	}

	function get_data($data) {

		return isset($_POST[$data]) ? $_POST[$data] : "";
	}


	$data['nume'] = get_data('nume');
	$data['adresa'] = get_data('adresa');
	$data['adresa2'] = get_data('adresa2');
	$data['oras'] = get_data('oras');
	$data['judet'] = get_data('judet');
	$data['email'] = get_data('email');
	$data['telefon'] = get_data('telefon');
	$data['card'] = get_data('card');
	$data['numarCard'] = get_data('numarCard');
	$data['numeCard'] = get_data('numeCard');
	$data['dataCard'] = get_data('dataCard');
	$data['compute'] = get_data('compute');

	$to  = 'mihaistuparu8@gmail.com'; 
	$subject = 'Comanda - site atestat';

	$message = "
	<html>
	<head>
	  <title>Comanda Site</title>
	</head>
	<body>
		<style> 
			#checkout div#compute {
				clear: both;
				width: 640px;
				margin: 0 10px 18px;
				padding: 20px;
			}
			#compute table {
				width: 100%;
				border-collapse: collapse;
				border-bottom: 1px solid #282828;
				margin: 0 0 18px;
			}
			#compute table thead {
				color: #fff;
				font-size: 12px;
				line-height: 18px;
			}
			#compute table th {
				border-bottom: 1px solid #282828;
				padding-bottom: 6px;
			}
			#compute table td {
				color: #b9315a;
				font-size: 12px;
				font-weight: bold;
				letter-spacing: 1px;
				width: 90px;
				padding: 10px 0 12px;
				text-align: center;
			}
			#compute td:first-child, #compute th:first-child {
				width: 420px;
				letter-spacing: 0;
				text-align: left;
			}
			#compute table td p {
				font-weight: normal;
			}
			#compute span.title {
				font-size: 14px;
				font-weight: bold;
			}
			#compute .frame2 {
				float: left;
				background-position: 0 0;
				height: 42px;
				width: 46px;
				padding: 1px;
				margin-right: 10px;
			}
			#checkout #compute > ul {
				float: right;
				color: #fff;
				display: block;
				font-size: 12px;
				font-weight: bold;
				letter-spacing: 1px;
				width: 180px;
				margin-right: 26px;
				text-align: right;
			}
			#checkout #compute > ul > li > span {
				color: #b9315a;
				display: inline-block;
				font-size: 12px;
				width: 70px;
				text-align: right;
			}
			#checkout input.order {
				color: #f95f8d;
				margin-right: 10px;
				padding-bottom: 3px;
			}
		</style>
		<h1>Comanda site atestat</h1>
		<h3>Ai primit o noua comanda</h3>
		<h3>Aici sunt detaliile comenzii:</h3>
		<ul>";

			if($data['nume'] != "") {
				$message .= "<li>";
					$message .= "Nume: ".$data['nume'];		
			}
		
			if($data['adresa'] != "") {
				$message .= "<li>";
					$message .= "Adresa: ".$data['adresa'];		
			}
		
			if($data['adresa2'] != "") {
				$message .= "<li>";
					$message .= "Adresa 2: ".$data['adresa2'];		
			}
		
			if($data['oras'] != "") {
				$message .= "<li>";
					$message .= "Oras: ".$data['oras'];		
			}
		
			if($data['judet'] != "") {
				$message .= "<li>";
					$message .= "Judet: ".$data['judet'];		
			}
		
			if($data['email'] != "") {
				$message .= "<li>";
					$message .= "Email: ".$data['email'];		
			}

			if($data['telefon'] != "") {
				$message .= "<li>";
					$message .= "Telefon: ".$data['telefon'];		
			}

			if($data['card'] != "") {
				$message .= "<li>";
					$message .= "Card: ".$data['card'];		
			}

			if($data['numarCard'] != "") {
				$message .= "<li>";
					$message .= "Numar Card: ".$data['numarCard'];		
			}

			if($data['numeCard'] != "") {
				$message .= "<li>";
					$message .= "Nume Card: ".$data['numeCard'];		
			}

			if($data['dataCard'] != "") {
				$message .= "<li>";
					$message .= "Data Card: ".$data['dataCard'];		
			}
		 
		$message .="
		</ul>";

		$message .= '<div id="checkout">'.$data['compute'].'</div>';

		$message .="
	</body>
	</html>

	";

	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$result = mail($to, $subject, $message, $headers);

	echo (bool)$result;
?>