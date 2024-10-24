<?php
    /*$string = '"Top Agents Staffed:";1;"Split/Skill:";"BRILIFE INBOUND ENG"
    "Top Agents Avail:";0
    "Skill State:";"NORMAL"
    "Top Agents Ringing:";0
    "Calls Waiting:";0
    "Top Agents on ACD Calls:";0
    "Oldest Call Waiting:";0;"Top Agents in ACW:";0
    "Top Agents in AUX:";1
    "Direct Agent Calls Waiting:";0
    "Top Agents in Other:";0
    "% Within Service Level:";0
    "Service Level:";0;"Flex Agents Staffed:";0
    "ACD Calls:";0;"Reserve1 Agents Staffed:";0
    "Aban Calls:";0;"Reserve2 Agents Staffed:";0
    "";"Agent Name";"Login ID";"Extn";"AUX Reason";"State";"Split/Skill";"Level";"Time";"VDN Name"
    5;"Agent04";"5704";"4735";"Rest Room";"AUX";0;"";117250;""
    5;"Agent04";"5704";"4735";"Rest Room";"AUX";0;"";117250;""';*/
	
	$string =file_get_contents("QueueTopAgent-INA.txt");

    $baris = preg_split('/\r\n|\n|\r/', trim($string));

    $data = [];
    foreach ($baris as $key => $value) {
        if($key <= 13) {
            $items = explode(";", filter($value));
            $item_value = array_splice($items, 1);
            $data['Head'][filter($items[0])] = (count($item_value) == 1) ? $item_value[0] : $item_value;
        } else {
            $items = explode(";", filter($value));
            
            if($key == 14) {
                $groups = $items;
                $groupKey = $groups[0];
            }

            if($key > 14) { 
                for ($i=0; $i < count($items)-1; $i++) { 
                    $detail[filter($groups[(1+$i)])] = filter($items[(1+$i)]);
                }
                
                $data['DataDetail'][] = $detail;
            }
        }
    }

    function filter($teks)
    {
        return trim(preg_replace('/\s+/', ' ', preg_replace("/[^A-Za-z0-9\ \;]/", " ", $teks)));
    }
    
    // print_r($data);

    echo json_encode($data);