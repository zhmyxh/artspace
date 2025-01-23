<?php
header("Content-Type: application/json; charset=UTF-8");
$response = array("message" => "Hello, World!");
return json_encode($response);
?>
