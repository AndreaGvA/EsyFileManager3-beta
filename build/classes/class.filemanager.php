<?php

/**
 * EsyFileManager
 * filemanager endpoint 
 * @author  AndreaG
 */
class fm{
	
	/**
	 * TAKE 
	 * returns $_GET or $_POST with priority GET->POST and sanitize it with SECURE STRING
	 * @return string
	 * @author AndreaG
	 */
	public static function take($var) {
		$tmp = '';
		if (isset($_GET[$var]))
			$tmp = $_GET[$var];
		if ($tmp == '') {
			if (isset($_POST[$var]))
				$tmp = $_POST[$var];
		}
		return $tmp;
	}
	/**
	 * LIST FILES
	 * Return a json list of files and files properties 
	 * @return string
	 * @author AndreaG
	 */
	public static function listfiles(){
		$dir=self::take("dir");
		//Open the directory
		$handle = opendir($dir);
		//cycle the files
		$n=0;
		while (false !== ($file = readdir($handle))) {
			// if non . or ..
			if ($file != "." && $file != ".." && substr($file, 0, 1) !== '.') {
				//if 
				if (is_file($dir . $file)) {
					//is a file
					$filesize=self::bytesToSize(filesize($dir . $file), 2);
					$n++;
					$item[$n]['file'] = $file;
					$item[$n]['size'] = $filesize;
					$item[$n]['info'] = pathinfo($dir . $file);
				} else {
					//is a directory
				}
			}
		}
		echo json_encode($item);
	}
	public static function delete(){
		$dir=self::take("dir");
		$files=self::take("files");
		foreach($files as $file) {
			if (file_exists($dir.$file)) {
				unlink($dir.$file);
				$arr["success"]=true;
			} else {
				
				$arr['success']=false;
			}
		}
		echo json_encode($arr);
	}
	public static function bytesToSize($bytes, $precision = 2) {
		$kilobyte = 1024;
		$megabyte = $kilobyte * 1024;
		$gigabyte = $megabyte * 1024;
		$terabyte = $gigabyte * 1024;

		if (($bytes >= 0) && ($bytes < $kilobyte)) {
			return $bytes . ' B';

		} elseif (($bytes >= $kilobyte) && ($bytes < $megabyte)) {
			return round($bytes / $kilobyte, $precision) . ' KB';

		} elseif (($bytes >= $megabyte) && ($bytes < $gigabyte)) {
			return round($bytes / $megabyte, $precision) . ' MB';

		} elseif (($bytes >= $gigabyte) && ($bytes < $terabyte)) {
			return round($bytes / $gigabyte, $precision) . ' GB';

		} elseif ($bytes >= $terabyte) {
			return round($bytes / $terabyte, $precision) . ' TB';
		} else {
			return $bytes . ' B';
		}
	}
} // END


