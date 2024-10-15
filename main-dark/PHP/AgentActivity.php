<?php
    // Path to your text file
    $file = 'AgentActivity.txt';

    if (file_exists($file)) {
        $fileContent = file($file);

        $data = [];
        foreach ($fileContent as $key => $line) {
            if ($key > 1) { // Skipping the header rows
                $columns = explode(';', trim($line));

                // Parse columns based on your text file's structure
                $agent = [
                    'nama_agent' => $columns[1],
                    'calls' => rand(10, 50), // Random data for example, replace with actual data
                    'avg_ring_time' => sprintf('%02d:%02d', rand(0, 5), rand(0, 59)), // Simulating ring time
                    'avg_talk_time' => sprintf('%02d:%02d', rand(0, 30), rand(0, 59)) // Simulating talk time
                ];

                $data[] = $agent;
            }
        }

        // Send JSON data to the client
        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'File not found']);
    }
?>