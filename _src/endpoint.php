<?php
require "classes/class.filemanager.php";
require "classes/handler.php";
$action=fm::take("action");

switch($action){
	case "list":
		fm::listfiles();
		break;
	case "del":
		fm::delete();
		break;
	case "upload":
		$dir=fm::take("dir");
		$uploader = new UploadHandler();
		$uploader->allowedExtensions = array();
		$uploader->sizeLimit = 10 * 1024 * 1024;
		$uploader->inputName = "qqfile";
		$uploader->chunksFolder = "chunks";
		$method = $_SERVER["REQUEST_METHOD"];
		if ($method == "POST") {
		    header("Content-Type: text/plain");
			$result = $uploader->handleUpload($dir);
			$result["file"] = $uploader->getUploadName();
			$filesize=fm::bytesToSize(filesize($dir . $result["uploadName"]), 2);
			$n=0;
			$result['size'] = $filesize;
			$result['info'] = pathinfo($dir . $result["file"]);
			echo json_encode($result);
		}
		else {
		    header("HTTP/1.0 405 Method Not Allowed");
		}
		break;
	case "info":
		fm::info();
		break;
	default:
		break;
}
