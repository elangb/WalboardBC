function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var myVarX;
var myVarY;
function myFunction() {
  myVarY = setInterval(AutoCall, 8000);

  //chartPie();
}

function AutoCall() {
  // scrollAgent();
  // scrollAgentSoeta();
  // scrollAgenPasbar();
  // scrollMultichatTanjungPriuk();
  // scrollMultichat();
  // scrollMultichatPasarBaru();

  ListAgentPasbar();
  ListAgentSoetta();
  ListAgentTanjungPriok();
  getDataEmail();
//   getDataEmailPasbar();
  listMultiChatTanjungPriuk();
  listMultiChatPasarBaru();
  listMultiChatSoeta();
  getDateTime();
  getGreeting();
}

let scrollIntervalsEmail = {};
let scrollPositionsEmail = {};
const rowHeightEmail = 40; // Adjust row height if necessary
const speedEmail = 50; // Scrolling speed in milliseconds

async function getDataEmail(sideId, tableBodyId) {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailAllSide";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data API:", data);

        
        const sideData = data.filter(item => {
            
            return item.sideId && typeof item.sideId === 'String' && item.sideId === sideId();
        });

        console.log(`${sideId} Data:`, sideData);

        populateTable(tableBodyId, sideData, 2);

        if (sideData.length > 2) {
            startAutoScroll(tableBodyId, sideId, sideData.length);
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function populateTable(tableBodyId, data, minRows) {
    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) {
        console.error(`Element with ID '${tableBodyId}' not found!`);
        return; // Exit the function if the table body element is not found
    }

    let tableRows = "";

    if (data.length === 0) {
        console.warn(`No data found for table: ${tableBodyId}`);
    }

    // Populate the table with actual data
    data.forEach(item => {
        tableRows += `
            <tr>
                <td>${item.name || "-"}</td>
                <td>${item.status || "-"}</td>
                <td>${item.handleTime || "-"}</td>
                <td>${item.loginTime || "-"}</td>
            </tr>
        `;
    });

    // Ensure at least `minRows` are displayed by adding empty rows
    const missingRows = Math.max(minRows - data.length, 0);
    for (let i = 0; i < missingRows; i++) {
        tableRows += `
            <tr class="empty-row">
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        `;
    }

    // Add table rows directly
    tableBody.innerHTML = tableRows;

    // Create duplicated rows for scrolling effect
    let duplicatedRows = tableRows.repeat(30); // Duplicate rows for scrolling effect

    // Apply duplicated rows for the scrolling effect
    tableBody.innerHTML += duplicatedRows;
}

function startAutoScroll(tableBodyId, sideId, totalRows) {
    if (scrollIntervalsEmail[sideId]) clearInterval(scrollIntervalsEmail[sideId]);

    const tableBody = document.getElementById(tableBodyId);
    scrollPositionsEmail[sideId] = 0;

    const scrollFunction = () => {
        scrollPositionsEmail[sideId] -= 1;
        tableBody.style.transform = `translateY(${scrollPositionsEmail[sideId]}px)`;

        // Reset scroll position if the end is reached
        if (Math.abs(scrollPositionsEmail[sideId]) >= totalRows * rowHeightEmail) {
            scrollPositionsEmail[sideId] = 0;
        }
    };

    // Start scrolling only if there are enough rows for scrolling
    if (totalRows > 2) {
        scrollIntervalsEmail[sideId] = setInterval(scrollFunction, speedEmail);
    }
}

function getStatusClass(calls) {
  if (calls < 10) {
    return "status-istirahat";
  } else if (calls >= 10 && calls < 20) {
    return "status-acd";
  } else if (calls >= 20) {
    return "status-available";
  }

  const statusMap = {
    Available: "status-available",
    ACW: "status-acw",
    ACDIN: "status-acd",
    Istirahat: "status-istirahat",
    Toilet: "status-istirahat",
    Makan: "status-istirahat",
    AUX: "status-istirahat",
    RING: "status-ringing",
  };

  return statusMap[calls] || "status-other";
}

// Fungsi utama untuk memuat data
let scrollInterval = null;
let scrollPosition = 0;
const rowHeight = 40; // Tinggi satu baris dalam px
const speed = 50; // Kecepatan scroll dalam ms

// Fungsi utama untuk memuat data agent di Tanjung Priok
async function ListAgentTanjungPriok() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataAgentPriuk";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const tableBody = document.getElementById("table-body");

        let tableRows = "";

        // Buat baris berdasarkan data
        data.forEach((agent) => {
            let row = `
                <tr>
                    <td style="min-width: 80px;">${agent.agentName || "-"}</td>
                    <td>${agent.extn || "-"}</td>
                    <td>
                        <span class="badge ${getStatusClass(agent.state)}">
                            ${agent.state || "-"}</span>
                    </td>
                    <td>${agent.calls || "0"}</td>
                </tr>
            `;
            tableRows += row;
        });

        // Tambahkan baris kosong jika kurang dari 4 baris
        const missingRows = 4 - data.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableRows += `
                    <tr class="empty-row">
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
            }
        }

        // Masukkan baris ke tabel
        tableBody.innerHTML = tableRows;

        // Aktifkan atau hentikan scrolling berdasarkan jumlah baris
        const rowCount = Math.max(data.length, 4); // Minimal 4 baris
        if (rowCount > 4) {
            startAutoScroll(rowCount);
        } else {
            stopAutoScroll();
        }
    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

// Fungsi untuk memulai auto-scroll
function startAutoScroll(rowCount) {
    const tableBody = document.getElementById("table-body");

    if (rowCount <= 4) {
        stopAutoScroll();
        return;
    }

    if (!scrollInterval) {
        scrollInterval = setInterval(() => {
            scrollPosition -= 1; // Geser scroll ke atas 1px
            tableBody.style.transform = `translateY(${scrollPosition}px)`;

            // Reset posisi ketika sudah mencapai akhir
            if (Math.abs(scrollPosition) >= rowCount * rowHeight) {
                scrollPosition = 0; // Kembalikan ke posisi awal
            }
        }, speed);
    }
}

// Fungsi untuk menghentikan auto-scroll
function stopAutoScroll() {
    const tableBody = document.getElementById("table-body");
    clearInterval(scrollInterval);
    scrollInterval = null;
    scrollPosition = 0; // Reset posisi scroll
    tableBody.style.transform = "translateY(0px)"; // Reset posisi ke atas
}

// Fungsi untuk menentukan kelas status
function getStatusClass(status) {
    const statusMap = {
        'Available': 'status-available',
        'AVAIL': 'status-available',
        'ACW': 'status-acw',
        'ACDIN': 'status-acd',
        'Istirahat': 'status-istirahat',
        'Toilet': 'status-istirahat',
        'Makan': 'status-istirahat',
        'AUX': 'status-istirahat',
        'RING': 'status-ringing'
    };
    return statusMap[status] || 'status-other';
}


let scrollIntervalSoeta = null;
let scrollPositionSoeta = 0;
const rowHeightSoeta = 40; // Tinggi satu baris dalam px
const scrollSpeedSoeta = 50; // Kecepatan scroll dalam ms

async function ListAgentSoetta() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataAgentSoetta";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const tableBody = document.getElementById("table-body-soeta");

        // Render data dari API
        let tableRows = data.map(agent => `
            <tr>
                <td style="min-width: 80px;">${agent.agentName || "-"}</td>
                <td>${agent.extn || "-"}</td>
                <td>
                    <span class="badge ${getStatusClassSoeta(agent.state)}">
                        ${agent.state || "-"}
                    </span>
                </td>
                <td>${agent.calls || "0"}</td>
            </tr>
        `).join("");

        // Tambahkan baris kosong jika kurang dari 2 baris
        const totalRows = Math.max(data.length, 2); // Minimal 2 baris
        const missingRows = Math.max(2 - data.length, 0);

        if (missingRows > 0) {
            tableRows += Array(missingRows).fill(`
                <tr class="empty-row">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `).join("");
        }

        tableBody.innerHTML = tableRows;

        // Aktifkan scrolling jika data lebih dari 2 baris
        if (totalRows > 2) {
            startAutoScrollSoeta(totalRows);
        } else {
            stopAutoScrollSoeta();
        }
    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

// Fungsi untuk memulai auto-scroll
function startAutoScrollSoeta(rowCount) {
    const tableBody = document.getElementById("table-body-soeta");

    // Hitung tinggi tabel total
    const totalHeight = rowCount * rowHeightSoeta;

    // Mulai auto-scrolling
    if (!scrollIntervalSoeta) {
        scrollIntervalSoeta = setInterval(() => {
            scrollPositionSoeta -= 1; // Geser scroll ke atas 1px
            tableBody.style.transform = `translateY(${scrollPositionSoeta}px)`;

            // Reset posisi scroll jika sudah mencapai akhir
            if (Math.abs(scrollPositionSoeta) >= totalHeight) {
                scrollPositionSoeta = 0; // Kembalikan ke posisi awal
            }
        }, scrollSpeedSoeta);
    }
}

// Fungsi untuk menghentikan auto-scroll
function stopAutoScrollSoeta() {
    const tableBody = document.getElementById("table-body-soeta");
    clearInterval(scrollIntervalSoeta);
    scrollIntervalSoeta = null;
    scrollPositionSoeta = 0; // Reset posisi scroll
    tableBody.style.transform = "translateY(0px)"; // Reset posisi scroll ke atas
}

// Fungsi tambahan untuk status badge
function getStatusClassSoeta(state) {
    const statusMap = {
        'Available': 'status-available',
        'AVAIL': 'status-available',
        'ACW': 'status-acw',
        'ACDIN': 'status-acd',
        'Istirahat': 'status-istirahat',
        'Toilet': 'status-istirahat',
        'Makan': 'status-istirahat',
        'AUX': 'status-istirahat',
        'RING': 'status-ringing'
    };
    return statusMap[state] || 'status-other';
}


function formatDuration(timeInSeconds) {
  // Memastikan timeInSeconds adalah angka yang valid
  const seconds = parseInt(timeInSeconds, 10);

  if (isNaN(seconds)) {
    return "0:00:00"; // Kembalikan default jika timeInSeconds tidak valid
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

let scrollIntervalPasbar = null;
let scrollPositionPasbar = 0;
const rowHeightPasbar = 40; // Tinggi satu baris dalam px
const scrollSpeedPasbar = 50; // Kecepatan scroll dalam ms

async function ListAgentPasbar() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataAgentPasarBaru";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const tableBody = document.getElementById("table-body-pasbar");

        // Render data dari API
        let tableRows = data.map(agent => `
            <tr>
                <td style="min-width: 80px;">${agent.agentName || "-"}</td>
                <td>${agent.extn || "-"}</td>
                <td>
                    <span class="badge ${getStatusClassPasbar(agent.state)}">
                        ${agent.state || "-"}
                    </span>
                </td>
                <td>${agent.calls || "0"}</td>
            </tr>
        `).join("");

        // Tambahkan baris kosong jika kurang dari 2 baris
        const missingRows = Math.max(2 - data.length, 0);
        if (missingRows > 0) {
            tableRows += Array(missingRows).fill(`
                <tr class="empty-row">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `).join("");
        }

        tableBody.innerHTML = tableRows;

        // Aktifkan scrolling jika data lebih dari 2 baris
        if (data.length > 2) {
            startAutoScrollPasbar(data.length);
        } else {
            stopAutoScrollPasbar();
        }

    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

// Fungsi untuk memulai auto-scroll
function startAutoScrollPasbar(rowCount) {
    const tableBody = document.getElementById("table-body-pasbar");

    // Hitung tinggi total berdasarkan jumlah baris
    const totalHeight = rowCount * rowHeightPasbar;

    // Mulai auto-scrolling
    if (!scrollIntervalPasbar) {
        scrollIntervalPasbar = setInterval(() => {
            scrollPositionPasbar -= 1; // Scroll ke atas 1px
            tableBody.style.transform = `translateY(${scrollPositionPasbar}px)`;

            // Reset posisi scroll jika sudah mencapai akhir
            if (Math.abs(scrollPositionPasbar) >= totalHeight - (2 * rowHeightPasbar)) {
                scrollPositionPasbar = 0; // Kembali ke awal
            }
        }, scrollSpeedPasbar);
    }
}

// Fungsi untuk menghentikan auto-scroll
function stopAutoScrollPasbar() {
    const tableBody = document.getElementById("table-body-pasbar");
    clearInterval(scrollIntervalPasbar);
    scrollIntervalPasbar = null;
    scrollPositionPasbar = 0; // Reset posisi scroll
    tableBody.style.transform = "translateY(0px)"; // Kembali ke posisi awal
}

// Fungsi untuk menentukan kelas status
function getStatusClassPasbar(status) {
    const statusMap = {
        'Available': 'status-available',
        'AVAIL': 'status-available',
        'ACW': 'status-acw',
        'ACDIN': 'status-acd',
        'Istirahat': 'status-istirahat',
        'Toilet': 'status-istirahat',
        'Makan': 'status-istirahat',
        'AUX': 'status-istirahat',
        'RING': 'status-ringing'
    };
    return statusMap[status] || 'status-other';
}


function formatDurationNew(time) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Cek jika formatnya hanya detik, misalnya ":54"
  if (time.startsWith(":")) {
    seconds = parseInt(time.slice(1)); // Ambil angka setelah ":"
  } else if (time.includes(":")) {
    // Cek format menit:detik, misalnya "105:31"
    const parts = time.split(":");
    minutes = parseInt(parts[0]); // Menit
    seconds = parseInt(parts[1]); // Detik

    // Jika menit lebih dari 60, konversikan menjadi jam
    if (minutes >= 60) {
      hours = Math.floor(minutes / 60); // Menghitung jam
      minutes = minutes % 60; // Menghitung sisa menit
    }
  } else if (time.includes(".")) {
    // Cek format menit.detik, misalnya "105.31"
    const totalMinutes = parseFloat(time); // Menangani format menit.detik
    hours = Math.floor(totalMinutes / 60); // Menghitung jam
    minutes = Math.floor(totalMinutes % 60); // Menghitung menit
    seconds = Math.round((totalMinutes % 1) * 60); // Menghitung detik dari bagian desimal
  }

  // Format menjadi HH:mm:ss
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

// Fungsi tambahan untuk format durasi (misalnya "3600" menjadi "1:00:00")
function formatDuration(timeInSeconds) {
  const seconds = parseInt(timeInSeconds, 10);

  if (isNaN(seconds)) {
    return "0:00:00"; // Kembalikan default jika timeInSeconds tidak valid
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

let scrollIntervalMultichatTanjungPriok = null;
let scrollPositionMultichat = 0;
const rowHeightMultichat = 40; // Tinggi satu baris dalam px
const speedMultichat = 50; // Kecepatan scroll dalam ms

async function listMultiChatTanjungPriuk() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivityPriuk"; // Ganti dengan URL API Anda

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Asumsikan respons berupa JSON
        const tableBody = document.getElementById("multichat-body");

        let tableRows = "";

        // Buat baris berdasarkan data
        data.forEach((item) => {
            let row = `
                <tr>
                    <td>${item.agent || "-"}</td>
                    <td><span class="badge ${item.status === 'Ready' ? 'badge-green' : 'badge-pink'}">${item.status || "-"}</span></td>
                    <td>${item.nowHandle || "-"}</td>
                    <td>${item.chat || "0"}</td>
                </tr>
            `;
            tableRows += row;
        });

        // Tambahkan baris kosong jika data kurang dari 4
        const missingRows = 4 - data.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableRows += `
                    <tr class="empty-row">
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
            }
        }

        // Tampilkan baris pada tabel
        tableBody.innerHTML = tableRows;

        // Aktifkan scrolling jika data lebih dari 4
        if (data.length > 4) {
            startAutoScrollMultichat(data.length);
        } else {
            stopAutoScrollMultichat(); // Matikan scrolling jika data <= 4
        }
    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

// Fungsi untuk memulai auto-scroll
function startAutoScrollMultichat(rowCount) {
    const tableBody = document.getElementById("multichat-body");

    if (!scrollIntervalMultichatTanjungPriok) {
        scrollIntervalMultichatTanjungPriok = setInterval(() => {
            scrollPositionMultichat -= 1; // Geser scroll ke atas 1px
            tableBody.style.transform = `translateY(${scrollPositionMultichat}px)`;

            // Reset posisi scroll jika mencapai akhir
            if (Math.abs(scrollPositionMultichat) >= rowCount * rowHeightMultichat) {
                scrollPositionMultichat = 0; // Kembali ke awal
            }
        }, speedMultichat);
    }
}

// Fungsi untuk menghentikan auto-scroll
function stopAutoScrollMultichat() {
    const tableBody = document.getElementById("multichat-body");
    clearInterval(scrollIntervalMultichatTanjungPriok);
    scrollIntervalMultichatTanjungPriok = null;
    scrollPositionMultichat = 0; // Reset posisi scroll
    tableBody.style.transform = "translateY(0px)"; // Reset posisi ke atas
}

let scrollIntervalMultichatSoeta = null;
let scrollPositionMultichatSoeta = 0;
const rowHeightMultichatSoeta = 40; // Tinggi satu baris dalam px
const speedMultichatSoeta = 50; // Kecepatan scroll dalam ms

async function listMultiChatSoeta() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivitySoetta";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Asumsikan respons berupa JSON
        const tableBody = document.getElementById("multichat-soeta-body");

        let tableRows = "";

        // Buat baris berdasarkan data
        data.forEach((item) => {
            let row = `
                <tr>
                    <td>${item.agent || "-"}</td>
                    <td><span class="badge ${item.status === 'Ready' ? 'badge-green' : 'badge-pink'}">${item.status || "-"}</span></td>
                    <td>${item.nowHandle || "-"}</td>
                    <td>${item.chat || "0"}</td>
                </tr>
            `;
            tableRows += row;
        });

        // Tambahkan baris kosong jika data kurang dari 2
        const missingRows = 2 - data.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableRows += `
                    <tr class="empty-row">
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
            }
        }

        // Tampilkan baris pada tabel
        tableBody.innerHTML = tableRows;

        // Aktifkan scrolling jika data lebih dari 2
        if (data.length > 2) {
            startAutoScrollMultichatSoeta(data.length);
        } else {
            stopAutoScrollMultichatSoeta(); // Matikan scrolling jika data <= 2
        }
    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

// Fungsi untuk memulai auto-scroll
function startAutoScrollMultichatSoeta(rowCount) {
    const tableBody = document.getElementById("multichat-soeta-body");

    if (!scrollIntervalMultichatSoeta) {
        scrollIntervalMultichatSoeta = setInterval(() => {
            scrollPositionMultichatSoeta -= 1; // Geser scroll ke atas 1px
            tableBody.style.transform = `translateY(${scrollPositionMultichatSoeta}px)`;

            // Reset posisi scroll jika mencapai akhir
            if (Math.abs(scrollPositionMultichatSoeta) >= rowCount * rowHeightMultichatSoeta) {
                scrollPositionMultichatSoeta = 0; // Kembali ke awal
            }
        }, speedMultichatSoeta);
    }
}

// Fungsi untuk menghentikan auto-scroll
function stopAutoScrollMultichatSoeta() {
    const tableBody = document.getElementById("multichat-soeta-body");
    clearInterval(scrollIntervalMultichatSoeta);
    scrollIntervalMultichatSoeta = null;
    scrollPositionMultichatSoeta = 0; // Reset posisi scroll
    tableBody.style.transform = "translateY(0px)"; // Reset posisi ke atas
}

let scrollIntervalMultichatPasarBaru = null;
let scrollPositionMultichatPasarBaru = 0;
const rowHeightMultichatPasarBaru = 40; // Tinggi satu baris dalam px
const speedMultichatPasarBaru = 50; // Kecepatan scroll dalam ms

async function listMultiChatPasarBaru() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivityPasarBaru";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Asumsikan respons berupa JSON
        const tableBody = document.getElementById("multichat-pasarbaru-body");

        let tableRows = "";

        // Buat baris berdasarkan data
        data.forEach((item) => {
            let row = `
                <tr>
                    <td>${item.agent || "-"}</td>
                    <td><span class="badge ${item.status === 'Ready' ? 'badge-green' : 'badge-pink'}">${item.status || "-"}</span></td>
                    <td>${item.nowHandle || "-"}</td>
                    <td>${item.chat || "0"}</td>
                </tr>
            `;
            tableRows += row;
        });

        // Tambahkan baris kosong jika data kurang dari 2
        const missingRows = 2 - data.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableRows += `
                    <tr class="empty-row">
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
            }
        }

        // Tampilkan baris pada tabel
        tableBody.innerHTML = tableRows;

        // Aktifkan scrolling jika data lebih dari 2
        if (data.length > 2) {
            startAutoScrollMultichatPasarBaru(data.length);
        } else {
            stopAutoScrollMultichatPasarBaru(); // Matikan scrolling jika data <= 2
        }
    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

// Fungsi untuk memulai auto-scroll
function startAutoScrollMultichatPasarBaru(rowCount) {
    const tableBody = document.getElementById("multichat-pasarbaru-body");

    if (!scrollIntervalMultichatPasarBaru) {
        scrollIntervalMultichatPasarBaru = setInterval(() => {
            scrollPositionMultichatPasarBaru -= 1; // Geser scroll ke atas 1px
            tableBody.style.transform = `translateY(${scrollPositionMultichatPasarBaru}px)`;

            // Reset posisi scroll jika mencapai akhir
            if (Math.abs(scrollPositionMultichatPasarBaru) >= rowCount * rowHeightMultichatPasarBaru) {
                scrollPositionMultichatPasarBaru = 0; // Kembali ke awal
            }
        }, speedMultichatPasarBaru);
    }
}

// Fungsi untuk menghentikan auto-scroll
function stopAutoScrollMultichatPasarBaru() {
    const tableBody = document.getElementById("multichat-pasarbaru-body");
    clearInterval(scrollIntervalMultichatPasarBaru);
    scrollIntervalMultichatPasarBaru = null;
    scrollPositionMultichatPasarBaru = 0; // Reset posisi scroll
    tableBody.style.transform = "translateY(0px)"; // Reset posisi ke atas
}


function getGreeting() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // Determine the greeting based on the time range
  if (hours < 10 || (hours === 10 && minutes === 0)) {
    $("#Greeting").html("Good Morning");
  } else if (hours < 14 || (hours === 14 && minutes === 0)) {
    $("#Greeting").html("Good Afternoon");
  } else {
    $("#Greeting").html("Good Evening");
  }
}

function getDateTime() {
  var today = new Date();
  let hours = today.getHours(); // get hours
  let minutes = today.getMinutes(); // get minutes
  let seconds = today.getSeconds(); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var time = hours + ":" + minutes + " WIB";
  var today = new Date();
  var dateNya =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  //var dateNya = 'September' + " " + '27' + ", " + '2024';
  // divDateNya.append('September' + " " + '27' + ", " + '2024');
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNya + " " + time;

  // Good
  // Morn/After/Even and Have a Nice Day // Good
  // Morn/After/Even and Have a Nice Day
  var divTimenya = $("#timeNya");
  var divDateNya = $("#dateNya");

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
  divDateNya.append(
    hari[current_date.getDay()] +
      " | " +
      day_value +
      " " +
      months[month_value] +
      " " +
      year_value +
      " | " +
      time
  );
}

function convertSeconds(seconds) {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
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
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = months[now.getMonth()]; // Mendapatkan bulan saat ini

  // Format tanggal
  const date = now.getDate(); // Tanggal
  const year = now.getFullYear(); // Tahun
  const hours = String(now.getHours()).padStart(2, "0"); // Jam (format 2 digit)
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Menit (format 2 digit)
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Detik (format 2 digit)

  // Mengupdate elemen dengan waktu saat ini
  document.querySelector(
    ".date-time-text"
  ).textContent = `${day} | ${date} ${month} ${year} | ${hours}:${minutes}:${seconds}`;
}

// Memperbarui waktu setiap detik
setInterval(updateDateTime, 1000);

// Panggil fungsi saat halaman dimuat untuk langsung menampilkan waktu
document.addEventListener("DOMContentLoaded", updateDateTime);
