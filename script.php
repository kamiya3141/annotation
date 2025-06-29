<?php
$content = file_get_contents("php://input");
if (isset($content)) {
	$data = json_decode($content, true, 512, JSON_BIGINT_AS_STRING);
	$baseUrl = $data["base_url"];
	$jsonUrl = $data["dir0"]."/".$data["dir1"]."/".$data["dir_json"]."/".$data["dir2"]." (".$data["num"].").json";
	file_put_contents($jsonUrl, $data["json"]);
	if ($data["text"] != "change-text") {
		$textUrl = $data["dir0"]."/".$data["dir1"]."/".$data["dir_text"]."/".$data["dir2"]." (".$data["num"].").txt";
		file_put_contents($textUrl, $data["text"]);
	}
}
?>