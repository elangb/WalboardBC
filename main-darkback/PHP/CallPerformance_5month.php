<?php
    /*
	"Top Agents Staffed:";1;"Split/Skill:";"BRILIFE INBOUND INA"
	"Top Agents Avail:";1
	"Skill State:";"NORMAL"
	"Top Agents Ringing:";0
	"Calls Waiting:";0
	"Top Agents on ACD Calls:";0
	"Oldest Call Waiting:";0;"Top Agents in ACW:";0
	"Top Agents in AUX:";0
	"Direct Agent Calls Waiting:";0
	"Top Agents in Other:";0
	"% Within Service Level:";0
	"Service Level:";0;"Flex Agents Staffed:";0
	"ACD Calls:";1;"Reserve1 Agents Staffed:";0
	"Aban Calls:";0;"Reserve2 Agents Staffed:";0
	"";"Agent Name";"Login ID";"Extn";"AUX Reason";"State";"Split/Skill";"Level";"Time";"VDN Name"
	2;"Agent01";"5701";"4704";"";"AVAIL";0;"";25;""
	*/
	
	$string =file_get_contents("CallPerformances_Reportmontly.txt");

    $lines = preg_split('/\r\n|\n|\r/', trim($string));

$data = [];
$headerProcessed = false;

// Process each line
foreach ($lines as $key => $line) {
    // Clean and split the line by semicolon
    $items = explode(";", filter($line));

    if ($key < 4) { // First 4 lines are headers
        switch ($key) {
            case 0: $data['Dates'] = filter($items[1]); break;
            case 1: $data['TimeZone'] = filter($items[1]); break;
            case 2: $data['SplitSkill'] = filter($items[1]); break;
            case 3:
                $data['Columns'] = array_map('filter', array_slice($items, 1));
                break;
        }
    } else {
        if ($key == 4) {
            $data['Totals'] = array_map('filter', array_slice($items, 1));
        } else {
            $detail = [];
            for ($i = 1; $i < count($items); $i++) {
                $detail[$data['Columns'][$i - 1]] = filter($items[$i]);
            }
            $data['DataDetail'][] = $detail;
        }
    }
}

// Function to clean the input strings
function filter($text)
{
    return trim(preg_replace('/\s+/', ' ', preg_replace("/[^A-Za-z0-9\.,\/\ \;]/", " ", $text)));
}

// Set the content type to JSON
header('Content-Type: application/json');

// Output the structured data as JSON
echo json_encode($data, JSON_PRETTY_PRINT);

	?>