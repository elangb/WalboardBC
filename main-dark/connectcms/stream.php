<?php
    $filePath = $_GET['file'];
    $fileName = basename($filePath);
    $fp=fopen($filePath, "rb");
    header("Content-type: application/octet-stream");
    header('Content-disposition: attachment; filename=$fileName');
    header("Content-transfer-encoding: binary");
    header("Content-length: ".filesize($filePath)."    ");
    fpassthru($fp);
    fclose($fp);
	
?>