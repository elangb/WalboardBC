<?php
    $string = '"Splits/Skills";"BRILIFE INBOUND INA;BRILIFE INBOUND ENG;OUTBOUND"
    "Split/Skill";"System Aux";"Istirahat";"Eskalasi";"Briefing";"Outgoing Call";"Isi Foam";"Rest Room";"Sholat";"System Error";"0"
    "BRILIFE INBOUND INA";0;0;1;0;1;0;0;0;0;0
    "OUTBOUND";0;0;0;0;0;0;0;0;0;0
    "BRILIFE INBOUND ENG";0;0;0;0;0;0;1;0;0;0';

    $baris = preg_split('/\r\n|\n|\r/', trim($string));

    $data = [];
    foreach ($baris as $key => $value) {
        if($key == 0) {
            $data['Head'] = explode(";", filter($value));
        } else {
            $items = explode(";", filter($value));
            
            if($key == 1) {
                $groups = $items;
                $groupKey = $groups[0];
            }

            if($key > 1) { 
                for ($i=0; $i < count($items)-1; $i++) { 
                    $detail[filter($groups[(1+$i)])] = filter($items[(1+$i)]);
                }
                
                $data['DataDetail'][] = [
                    filter($groupKey) => filter($items[0]),
                    "Detail" => $detail
                ];
            }
        }
    }

    function filter($teks)
    {
        return trim(preg_replace('/\s+/', ' ', preg_replace("/[^A-Za-z0-9\ \;]/", " ", $teks)));
    }
    
    // print_r($data);

    echo json_encode($data);