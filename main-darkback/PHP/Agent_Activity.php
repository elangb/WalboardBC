<?php

$string = file_get_contents("AgentActivity.txt");

$baris = preg_split('/\r\n|\n|\r/', trim($string));

$data = [];
foreach ($baris as $key => $value) {
    if ($key <= 13) {
        $items = explode(";", filter($value));
        $item_value = array_splice($items, 1);
        $data['Head'][filter($items[0])] = (count($item_value) == 1) ? $item_value[0] : $item_value;
    } else {
        $items = explode(";", filter($value));
        
        // Check if groups are correctly extracted at line 14
        if ($key == 14) {
            $groups = $items;
            var_dump($groups);  // Debugging output for groups
            $groupKey = $groups[0];
        }

        // Ensure proper mapping of data if groups are set
        if ($key > 14) {
            $detail = [];
            // Process data only if the group information is available
            if (isset($groups)) {
                for ($i = 0; $i < count($items) - 1; $i++) {
                    // Ensure proper key-value assignment
                    $detail[filter($groups[1 + $i])] = filter($items[1 + $i]);
                }
            }

            // Check if detail has any data before adding to DataDetail
            if (!empty($detail)) {
                $data['DataDetail'][] = $detail;
            }
        }
    }
}

// Print the processed data for debugging
// print_r($data);

// Output the data as JSON
echo json_encode($data, JSON_PRETTY_PRINT);

// Filter function to clean up data
function filter($teks)
{
    return trim(preg_replace('/\s+/', ' ', preg_replace("/[^A-Za-z0-9\s\;\-\_]/", " ", $teks)));
}

?>
