<?php
header("Content-Type: application/json; charset=UTF-8");
$response = array("message" => "Hello, World!");
echo json_encode($response);
?>
