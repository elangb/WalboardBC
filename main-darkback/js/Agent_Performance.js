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
   // getGreeting();
   
   ListAgent();
    // ListAgentSoetta();
	 // ListAgentTanjungPriok();
	 getDataEmail();
	 getListMultichat();
	 getListSosmed();
  
}
async function getListSosmed() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/PerformanceSosmed", {
            method: "GET",
            headers: {
                'Accept': 'text/plain' // Setting the accept header
            }
        });

        // Periksa apakah respons berhasil
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text(); // Menggunakan text() karena header Accept adalah text/plain
        const json = JSON.parse(data);

        const minimumRows = 5; // Jumlah minimal baris di tabel
        const tableRows = [];

        // Membuat baris data dari hasil fetch
        json.forEach(items => {
            let row = '<tr>';
            row += '<td>' + (items["name"] || '-') + '</td>'; // Nama Agent
            
            // Chats dengan badge
            const chats = parseInt(items["answer"]) || 0;
            if (chats > 20) {
                row += '<td><span class="badge badge-green">' + chats + '</span></td>';
            } else if (chats > 10) {
                row += '<td><span class="badge badge-orange">' + chats + '</span></td>';
            } else {
                row += '<td><span class="badge badge-pink">' + chats + '</span></td>';
            }

            // Avg Response Time
            row += '<td>' + (items["frt"] || '-') + '</td>';
            
            // Avg Conversation Time
            row += '<td>' + (items["aht"] || '-') + '</td>';
            row += '</tr>';
            tableRows.push(row);
        });

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
                '<th>Chats</th>' +
                '<th>Avg. Resp. Time</th>' +
                '<th>Avg. Conv. Time</th>' +
                '</tr></thead><tbody>';
            table += displayedRows.join('');
            table += '</tbody></table>';

            // Tampilkan tabel
            $('#ListSosmed').html(table);

            // Update indeks awal untuk rolling
            startIndex = (startIndex + 1) % tableRows.length;
        };

        // Update tabel pertama kali
        updateTable();

        // Interval untuk rolling data
        if (tableRows.length > minimumRows) {
            setInterval(updateTable, 2000); // Rolling setiap 2 detik
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}


async function getListMultichat() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataPerformanceMultiChat", {
            method: "GET",
            headers: {
                'Accept': 'text/plain' // Setting the accept header
            }
        });

        // Periksa apakah respons berhasil
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text(); // Menggunakan text() karena header Accept adalah text/plain
        const json = JSON.parse(data);

        const minimumRows = 5; // Jumlah minimal baris di tabel
        const tableRows = [];

        // Membuat baris data dari hasil fetch
        json.forEach(items => {
            let row = '<tr>';
            row += '<td>' + (items["name"] || '-') + '</td>'; // Nama Agent
            
            // Chats dengan badge
            const chats = parseInt(items["answer"]) || 0;
            if (chats > 20) {
                row += '<td><span class="badge badge-green">' + chats + '</span></td>';
            } else if (chats > 10) {
                row += '<td><span class="badge badge-orange">' + chats + '</span></td>';
            } else {
                row += '<td><span class="badge badge-pink">' + chats + '</span></td>';
            }

            // Avg Response Time
            row += '<td>' + (items["frt"] || '-') + '</td>';
            
            // Avg Conversation Time
            row += '<td>' + (items["aht"] || '-') + '</td>';
            row += '</tr>';
            tableRows.push(row);
        });

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
                '<th>Chats</th>' +
                '<th>Avg. Resp. Time</th>' +
                '<th>Avg. Conv. Time</th>' +
                '</tr></thead><tbody>';
            table += displayedRows.join('');
            table += '</tbody></table>';

            // Tampilkan tabel
            $('#ListMultichat').html(table);

            // Update indeks awal untuk rolling
            startIndex = (startIndex + 1) % tableRows.length;
        };

        // Update tabel pertama kali
        updateTable();

        // Interval untuk rolling data
        if (tableRows.length > minimumRows) {
            setInterval(updateTable, 2000); // Rolling setiap 2 detik
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function getDataEmail() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailPerpormance", {
            method: "GET",
            headers: {
                'Accept': 'text/plain' // Setting the accept header
            }
        });

        // Periksa apakah respons berhasil
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text(); // Menggunakan text() karena header Accept adalah text/plain
        const json = JSON.parse(data);

        const minimumRows = 5; // Jumlah minimal baris di tabel
        const tableRows = [];

        // Membuat baris data dari hasil fetch
        json.forEach(items => {
            let row = '<tr>';
            row += '<td>' + (items["name"] || '-') + '</td>'; // Nama Agent
            
            // Emails dengan badge
            const emails = parseInt(items["answer"]) || 0;
            if (emails > 20) {
                row += '<td><span class="badge badge-green">' + emails + '</span></td>';
            } else if (emails > 10) {
                row += '<td><span class="badge badge-orange">' + emails + '</span></td>';
            } else {
                row += '<td><span class="badge badge-pink">' + emails + '</span></td>';
            }

            // Avg Response Time
            row += '<td>' + (items["frt"] || '-') + '</td>';
            
            // Avg Handle Time
            row += '<td>' + (items["aht"] || '-') + '</td>';
            row += '</tr>';
            tableRows.push(row);
        });

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
                '<th>Emails</th>' +
                '<th>Avg. Resp. Time</th>' +
                '<th>Avg. Hand. Time</th>' +
                '</tr></thead><tbody>';
            table += displayedRows.join('');
            table += '</tbody></table>';

            // Tampilkan tabel
            $('#listEmail').html(table);

            // Update indeks awal untuk rolling
            startIndex = (startIndex + 1) % tableRows.length;
        };

        // Update tabel pertama kali
        updateTable();

        // Interval untuk rolling data
        if (tableRows.length > minimumRows) {
            setInterval(updateTable, 2000); // Rolling setiap 2 detik
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function ListAgent() {
    $.getJSON("PHP/AgentPerformance.php", function (data) {
        const agents = data.Head || []; // Data agent dari server
        const minimumRows = 5; // Jumlah minimal baris di tabel
        const tableRows = [];

        // Membuat baris data dari hasil fetch
        for (const key in agents) {
            if (key !== "Split Skill") {
                const items = agents[key];
                if (Array.isArray(items) && items[0] !== "Agent Name" && items[0] !== "Informasi") {
                    let row = '<tr>';
                    row += '<td>' + (items[0] || '-') + '</td>'; // Nama Agent
                    
                    // ACD Calls dengan badge
                    const acdCalls = parseInt(items[2]) || 0;
                    if (acdCalls > 20) {
                        row += '<td><span class="badge badge-success">' + acdCalls + '</span></td>';
                    } else if (acdCalls > 10) {
                        row += '<td><span class="badge badge-primary">' + acdCalls + '</span></td>';
                    } else {
                        row += '<td><span class="badge badge-danger">' + acdCalls + '</span></td>';
                    }

                    // Avg Response Time (kolom 9)
                    row += '<td>' + (items[9] || '-') + '</td>';
                    
                    // Avg Handle Time (kolom 10)
                    row += '<td>' + (items[10] || '-') + '</td>';
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
                '<th>ACD Calls</th>' +
                '<th>Avg Resp Time</th>' +
                '<th>Avg Handle Time</th>' +
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


				
				 
