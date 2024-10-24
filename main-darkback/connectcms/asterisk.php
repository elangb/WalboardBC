<?php

$callRecordPath="/var/spool/asterisk/monitor/2023/02/15/exten-10001-10002-20230215-151123-1676448683.152.wav";
$mysqli = new mysqli("192.168.37.22","uidesk","Uidesk123!","asteriskcdrdb");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

// Perform query
if ($result = $mysqli -> query("SELECT * FROM cdr where YEAR(calldate) > '2022' and recordingfile<>'' order by calldate desc")) {
  //echo "Returned rows are: " . $result -> num_rows;
  // Free result set
  //$result -> free_result();
  $data = [];
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$data[] = $row;
		//echo json_encode($row);
		//echo $row['calldate']."---".$row['src']."---".$row['dst']."---".$row['duration']."---".$row['recordingfile']."<br>";
	}
	
	echo json_encode($data);
}

$mysqli -> close();
?>
<!-- 
<audio controls>
<source src="https://192.168.37.22/stream.php?file=/var/spool/asterisk/monitor/2023/02/15/exten-10001-10002-20230215-151123-1676448683.152.wav" type="audio/wav">
Your browser does not support the audio element.
</audio> -->