<?php
    header('Content-Type: application/json');

    $string = file_get_contents("Agent_Site_Activities_Performance_PasarBaru.txt");

    $lines = explode("\n", $string);

    // Ambil header dari baris kedua
    $headerLine = isset($lines[1]) ? $lines[1] : '';

    // Bersihkan header
    $headers = array_map(function($header) {
        return trim(str_replace('"', '', $header));
    }, explode(';', trim($headerLine)));

    $agents = [];

    // Loop untuk mengambil data mulai dari baris ketiga
    for ($i = 2; $i < count($lines); $i++) {
        if (!empty(trim($lines[$i]))) {
            $agentValues = explode(';', trim($lines[$i]));

            // Buat array asosiatif untuk setiap agent
            $agentInfo = [];
            for ($j = 0; $j < count($headers); $j++) {
                $agentInfo[$headers[$j]] = isset($agentValues[$j]) ? trim(str_replace('"', '', $agentValues[$j])) : null;
            }

            $agents[] = $agentInfo;
        }
    }

    // Kembalikan JSON
    echo json_encode($agents);
?>
