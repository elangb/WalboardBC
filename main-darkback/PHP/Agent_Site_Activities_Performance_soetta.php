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
	"";"Agent Name";"Login ID";"Extn";"AUX Reason";"State";"Split/Skill";"Level";"Time";"VDN Name"ss
	2;"Agent01";"5701";"4704";"";"AVAIL";0;"";25;""
	*/
	
	$string =file_get_contents("Agent_Site_Activities_Performance_Soetta.txt");

 $lines = explode("\n", $string);

// Retrieve the header line (the second line in this case)
$headerLine = isset($lines[1]) ? $lines[1] : '';

// Process the header line to get column names
$headers = explode(';', trim($headerLine));

// Initialize an array to hold all agents' data
$agents = [];

// Loop through the remaining lines to extract agent information
for ($i = 2; $i < count($lines); $i++) {
    if (!empty(trim($lines[$i]))) {
        $agentValues = explode(';', trim($lines[$i]));
        
        // Create an associative array for each agent
        $agentInfo = [];
        for ($j = 0; $j < count($headers); $j++) {
            $agentInfo[trim($headers[$j])] = isset($agentValues[$j]) ? trim($agentValues[$j]) : null;
        }
        
        // Add the agent info to the agents array
        $agents[] = $agentInfo;
    }
}

// Return JSON response
echo json_encode($agents);

?>