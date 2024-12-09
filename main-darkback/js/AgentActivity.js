function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var myVarX;
var myVarY;
function myFunction() {
	
	 myVarY = setInterval(AutoCall, 16000);
	
}

function AutoCall(){
	getDateTime();
    ListAgent();
	getDataEmail();
	getListMultichat();
	getListSosmed();
  
}
async function getListSosmed() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataActivitiesSosmed", {
            method: "GET",
            headers: {
                'Accept': 'text/plain'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        const json = JSON.parse(data);
        const minimumRows = 5; // Jumlah minimal baris yang ditampilkan
        const tableRows = [];

        // Membuat baris data
        json.forEach(items => {
            let row = '<tr>';
            row += '<td>' + (items["name"] || '-') + '</td>';

            // Status formatting
            if (items["status"] === 'Ready')
                row += '<td><span class="status-available">' + items["status"] + '</span></td>';
            else
                row += '<td><span class="status-istirahat">' + items["status"] + '</span></td>';

            // Now Handle
            row += '<td>' + (items["nowHandle"] || '-') + '</td>';

            // Channel (kosong jika tidak ada informasi)
            row += '<td>-</td>';

            // Longest
            row += '<td>' + (items["longers"] || '-') + '</td>';
            row += '</tr>';

            tableRows.push(row);
        });

        // Tambahkan baris kosong jika kurang dari 5
        while (tableRows.length < minimumRows) {
            let emptyRow = '<tr class="empty-row">' +
                '<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>' +
                '</tr>';
            tableRows.push(emptyRow);
        }        

        // Fungsi untuk memperbarui tabel
        let startIndex = 0;
        const updateTable = () => {
            const displayedRows = [];
            for (let i = 0; i < minimumRows; i++) {
                const index = (startIndex + i) % tableRows.length;
                displayedRows.push(tableRows[index]);
            }

            let table = '<table class="table table-dark table-striped">';
            table += '<thead><tr>' +
                '<th>Nama Agent</th>' +
                '<th>Status</th>' +
                '<th>Now Handle</th>' +
                '<th>Channel</th>' +
                '<th>Longest</th>' +
                '</tr></thead><tbody>';
            table += displayedRows.join('');
            table += '</tbody></table>';

            // Tampilkan tabel di halaman
            $('#ListSosmed').html(table);

            // Update indeks awal untuk rolling
            startIndex = (startIndex + 1) % tableRows.length;
        };

        // Tampilkan tabel pertama kali
        updateTable();

        // Interval rolling jika ada lebih dari 5 data
        if (tableRows.length > minimumRows) {
            setInterval(updateTable, 2000); // Rolling setiap 2 detik
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function getListMultichat() {
    const gambarMap = {
        10: 'wa-whtie.png',
        1: 'fb-white.png',
        99: 'x-white.png',
        11: 'chat.png',
        2: 'ig-white.png',
        7: 'chat-white.png'
    };

    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivityPusatMultimedia", {
            method: "GET",
            headers: {
                'Accept': 'text/plain'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        const json = JSON.parse(data);
        const minimumRows = 5; // Jumlah minimal baris di tabel
        const tableRows = [];

        // Membuat baris data
        json.forEach(items => {
            let row = '<tr>';
            row += '<td>' + (items["agent"] || '-') + '</td>';

            // Status formatting
            if (items["status"] === 'Ready')
                row += '<td><span class="status-available">' + items["status"] + '</span></td>';
            else
                row += '<td><span class="status-istirahat">' + items["status"] + '</span></td>';

            // Now Handle
            row += '<td>' + (items["nowHandle"] || '-') + '</td>';

            // Channel formatting
            let gambarHTML = '';
            const data = items["chat"] || '';
            const nomorArray = data.split(','); // Pisahkan berdasarkan koma
            nomorArray.forEach(nomor => {
                if (gambarMap[nomor]) {
                    const imgSrc = gambarMap[nomor];
                    gambarHTML += '<img src="' + '../images/agentactivity/' + imgSrc + '" alt="Gambar ' + nomor + '" width="22px" style="margin-right: 5px;">';
                }
            });
            row += '<td>' + (gambarHTML || '-') + '</td>';

            // Longest
            row += '<td>' + (items["longest"] || '-') + '</td>';
            row += '</tr>';

            tableRows.push(row);
        });

        // Tambahkan baris kosong jika kurang dari 5
        while (tableRows.length < minimumRows) {
            let emptyRow = '<tr class="empty-row">' +
                '<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>' +
                '</tr>';
            tableRows.push(emptyRow);
        }        

        // Fungsi untuk memperbarui tabel
        let startIndex = 0;
        const updateTable = () => {
            const displayedRows = [];
            for (let i = 0; i < minimumRows; i++) {
                const index = (startIndex + i) % tableRows.length;
                displayedRows.push(tableRows[index]);
            }

            let table = '<table class="table table-dark table-striped">';
            table += '<thead><tr>' +
                '<th>Nama Agent</th>' +
                '<th>Status</th>' +
                '<th>Now Handle</th>' +
                '<th>Channel</th>' +
                '<th>Longest</th>' +
                '</tr></thead><tbody>';
            table += displayedRows.join('');
            table += '</tbody></table>';

            // Tampilkan tabel di halaman
            $('#ListMultichat').html(table);

            // Update indeks awal untuk scrolling
            startIndex = (startIndex + 1) % tableRows.length;
        };

        // Awal tabel
        updateTable();

        // Interval untuk rolling data jika lebih dari lima baris
        if (tableRows.length > minimumRows) {
            setInterval(updateTable, 2000); // Rolling setiap 2 detik
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function getDataEmail() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailActivites", {
            method: "GET",
            headers: {
                'Accept': 'text/plain' // Setting the accept header
            }
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        const json = JSON.parse(data);
        const minimumRows = 5; // Jumlah minimal baris di tabel
        const tableRows = [];

        // Membuat baris data
        json.forEach(items => {
            let row = '<tr>';
            row += '<td>' + (items["name"] || '-') + '</td>';
            row += '<td>' + (items["levelUser"] || '-') + '</td>';

            // Status formatting
            if (items["status"] === 'Ready')
                row += '<td><span class="status-available">' + items["status"] + '</span></td>';
            else
                row += '<td><span class="status-istirahat">' + items["status"] + '</span></td>';

            // Now Handle
            row += '<td>' + (items["nowHandle"] || '-') + '</td>';

            // Longest formatting
            const intvalue = parseInt(items["longers"]) || 0;
            if (intvalue > 60)
                row += '<td><span class="status-istirahat">' + items["longers"] + '</span></td>';
            else
                row += '<td>' + items["longers"] + '</td>';
            row += '</tr>';

            tableRows.push(row);
        });

        // Tambahkan baris kosong jika kurang dari 5
        while (tableRows.length < minimumRows) {
            let emptyRow = '<tr class="empty-row">' +
                '<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>' +
                '</tr>';
            tableRows.push(emptyRow);
        }        

        // Fungsi untuk memperbarui tabel
        let startIndex = 0;
        const updateTable = () => {
            const displayedRows = [];
            for (let i = 0; i < minimumRows; i++) {
                const index = (startIndex + i) % tableRows.length;
                displayedRows.push(tableRows[index]);
            }

            let table = '<table class="table table-dark table-striped">';
            table += '<thead><tr>' +
                '<th>Nama Agent</th>' +
                '<th>Role</th>' +
                '<th>Status</th>' +
                '<th>Now Handle</th>' +
                '<th>Longest</th>' +
                '</tr></thead><tbody>';
            table += displayedRows.join('');
            table += '</tbody></table>';

            // Tampilkan tabel di halaman
            $('#listEmail').html(table);

            // Update indeks awal untuk scrolling
            startIndex = (startIndex + 1) % tableRows.length;
        };

        // Awal tabel
        updateTable();

        // Interval untuk rolling data jika lebih dari lima baris
        if (tableRows.length > minimumRows) {
            setInterval(updateTable, 2000); // Rolling setiap 2 detik
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function ListAgent() {
    $.getJSON("PHP/Agent_Activity.php", function (data) {
        const agents = data.Head || []; // Data agent dari server
        const minimumRows = 5; // Jumlah minimal baris di tabel
        const tableRows = [];

        // Membuat baris data dari hasil fetch
        for (const key in agents) {
            if (key !== "Split Skill") {
                const items = agents[key];
                if (items[0] !== "Agent Name") {
                    let row = '<tr>';
                    row += '<td>' + (items[0] || '-') + '</td>'; // Nama Agent
                    row += '<td>' + (items[2] || '-') + '</td>'; // Extension
                    
                    // Status formatting
                    if (items[4] === 'AVAIL')
                        row += '<td><span class="status-available">' + items[4] + '</span></td>';
                    else if (items[4] === 'ACW')
                        row += '<td><span class="status-acw">' + items[4] + '</span></td>';
                    else if (items[4] === 'ACDIN')
                        row += '<td><span class="status-acd">' + items[4] + '</span></td>';
                    else if (items[4] === 'AUX')
                        row += '<td><span class="status-makan">' + items[4] + '</span></td>';
                    else if (items[4] === 'RING')
                        row += '<td><span class="status-ringing">' + items[4] + '</span></td>';
                    else
                        row += '<td><span class="status-other">' + (items[4] || '-') + '</span></td>';

                    // Menggunakan items[6] untuk duration dan memformat ke mm:ss
                    const timeValue = items[6] || "0";
                    const duration = formatDuration(timeValue);
                    row += '<td>' + duration + '</td>';
                    row += '</tr>';
                    tableRows.push(row);
                }
            }
        }

        // Tambahkan baris kosong jika kurang dari minimumRows
        while (tableRows.length < minimumRows) {
            tableRows.push('<tr class="empty-row">' +
                '<td>-</td><td>-</td><td>-</td><td>-</td>' +
                '</tr>');
        }

        // Fungsi untuk memperbarui tabel
        let startIndex = 0;
        const updateTable = () => {
            const displayedRows = [];
            for (let i = 0; i < minimumRows; i++) {
                const index = (startIndex + i) % tableRows.length; // Rolling index
                displayedRows.push(tableRows[index]);
            }

            let table = '<table class="table table-dark table-striped">';
            table += '<thead><tr>' +
                '<th>Nama Agent</th>' +
                '<th>Extension</th>' +
                '<th>Status</th>' +
                '<th>Duration</th>' +
                '</tr></thead><tbody>';
            table += displayedRows.join('');
            table += '</tbody></table>';

            // Tampilkan tabel
            $('#AgentCall').html(table);

            // Update indeks awal untuk rolling
            startIndex = (startIndex + 1) % tableRows.length;
        };

        // Update tabel pertama kali
        updateTable();

        // Interval untuk rolling data
        if (tableRows.length > minimumRows) {
            setInterval(updateTable, 2000); // Rolling setiap 2 detik
        }
    });
}

// Fungsi untuk memformat durasi ke format mm:ss
function formatDuration(durationInSeconds) {
    const totalSeconds = parseInt(durationInSeconds, 10) || 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


// Fungsi formatDuration (jika belum ada)
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}


// Fungsi formatDuration untuk format waktu
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


function formatDuration(timeValue) {
    // Jika tidak ada nilai, kembalikan "00:00"
    if (!timeValue || timeValue === "0") return "00:00";
    
    // Konversi string ke number dan kalikan dengan 60 untuk mendapatkan total detik
    const totalSeconds = parseFloat(timeValue) * 60;
    
    // Hitung menit dan detik
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    // Format ke mm:ss
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
 
function getDateTime() {
  var today = new Date();
  let hours = today.getHours(); // get hours
  let minutes = today.getMinutes(); // get minutes
  let seconds = today.getSeconds(); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  var time = hours + ":" + minutes + " WIB"
  var today = new Date();
  var dateNya = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNya + ' ' + time;
  
  // Good
															// Morn/After/Even and Have a Nice Day // Good
															// Morn/After/Even and Have a Nice Day
  var divTimenya = $('#timeNya');
  var divDateNya = $('#dateNya');

  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var current_date = new Date();
  current_date.setDate(current_date.getDate() + 0);
  month_value = current_date.getMonth();
  day_value = current_date.getDate();
  year_value = current_date.getFullYear();
  
 
     
  
  divTimenya.empty();
  divTimenya.append(time);
  divDateNya.empty();

  divDateNya.append( hari[current_date.getDay()] +" | "+day_value + " " +  months[month_value]  + " " + year_value +" | " + time );
 // divDateNya.append( 'September' + " " + '27' + ", " + '2024' );
  
  
     
}


    function convertSeconds(seconds) {
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= (24 * 3600);
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return `${hours}:${minutes}:${seconds}`;
    }
	
// Fungsi untuk memperbarui waktu
function updateDateTime() {
    const now = new Date();

    // Daftar nama hari
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const day = days[now.getDay()]; // Mendapatkan hari saat ini

    // Daftar nama bulan
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const month = months[now.getMonth()]; // Mendapatkan bulan saat ini

    // Format tanggal
    const date = now.getDate(); // Tanggal
    const year = now.getFullYear(); // Tahun
    const hours = String(now.getHours()).padStart(2, '0'); // Jam (format 2 digit)
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Menit (format 2 digit)
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Detik (format 2 digit)

    // Mengupdate elemen dengan waktu saat ini
    document.querySelector('.date-time-text').textContent = `${day} | ${date} ${month} ${year} | ${hours}:${minutes}:${seconds}`;
}

// Memperbarui waktu setiap detik
setInterval(updateDateTime, 1000);

// Panggil fungsi saat halaman dimuat untuk langsung menampilkan waktu
document.addEventListener('DOMContentLoaded', updateDateTime);



				
				 
