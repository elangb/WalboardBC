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
  myVarY = setInterval(AutoCall, 10000);
}

function AutoCall() {
  scrollAgent();
  scrollMultichat();
  scrollEmail();
  scrollSosmed();
  ListAgent();
  getDateTime();
  getDataEmail();
  ListMultichat();
  getListSosmed();
}

let scrollIntervalSosmed = null;
let mSosmed = 0;
let nSosmed = 550; // Sesuaikan dengan tinggi div
const speedSosmed = 50; // Kecepatan scroll

// Fungsi untuk menangani scroll Sosmed
function scrollSosmed(rowCount) {
    const div1 = document.getElementById('div1-sosmed');
    const div2 = document.getElementById('div2-sosmed');

    // Hentikan scroll jika row kurang dari atau sama dengan 5
    if (rowCount <= 5) {
        clearInterval(scrollIntervalSosmed);
        scrollIntervalSosmed = null;
        div1.style.top = '0px';
        div2.style.top = '550px';
        return;
    }

    if (!scrollIntervalSosmed) {
        scrollIntervalSosmed = setInterval(() => {
            if (div1 && div2) {
                div1.style.top = mSosmed + 'px';
                div2.style.top = nSosmed + 'px';
                mSosmed--;
                nSosmed--;

                if (mSosmed <= -550) {
                    mSosmed = 550;
                }

                if (nSosmed <= -550) {
                    nSosmed = 550;
                }
            }
        }, speedSosmed);
    }
}

// Fungsi untuk mengambil data Social Media
async function getListSosmed() {
    try {
        const response = await fetch(
            "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataActivitiesSosmed",
            {
                method: "GET",
                headers: {
                    Accept: "text/plain", // Menentukan header accept
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        const json = JSON.parse(data);

        const div1 = document.getElementById("div1-sosmed");
        const div2 = document.getElementById("div2-sosmed");

        let tableContent = "<tbody>";
        json.forEach((items) => {
            let row = `
                <tr>
                    <td style="min-width: 200px; max-width: 200px;">${items["name"] || "-"}</td>
                    <td>${items["status"] === "Ready" ? '<span class="status-available">' + items["status"] + '</span>' : '<span class="status-istirahat">' + items["status"] + '</span>'}</td>
                    <td>${items["nowHandle"] || "-"}</td>
                    <td>-</td>
                    <td>${items["longers"] || "-"}</td>
                </tr>
            `;
            tableContent += row;
        });

        // Tambahkan baris kosong jika kurang dari 5
        const missingRows = 5 - json.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableContent += `
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
            }
        }

        tableContent += "</tbody>";

        // Insert konten ke kedua div untuk efek scroll
        div1.querySelector('table').innerHTML = tableContent;
        div2.querySelector('table').innerHTML = tableContent;

        // Hitung jumlah baris dan aktifkan atau nonaktifkan scroll
        const rowCount = Math.max(json.length, 5); // Pastikan minimal ada 5 baris
        scrollSosmed(rowCount);
    } catch (error) {
        console.error("Terjadi kesalahan: ", error);
    }
}

let scrollIntervalMultichat = null;
let mMultichat = 0;
let nMultichat = 550; // Sesuaikan dengan tinggi div
const speedMultichat = 50; // Kecepatan scroll

function scrollMultichat(rowCount) {
    const div1 = document.getElementById('div1-multichat');
    const div2 = document.getElementById('div2-multichat');

    // Hentikan scroll jika row kurang dari atau sama dengan 6
    if (rowCount <= 5) {
        clearInterval(scrollIntervalMultichat);
        scrollIntervalMultichat = null;
        div1.style.top = '0px';
        div2.style.top = '550px';
        return;
    }

    if (!scrollIntervalMultichat) {
        scrollIntervalMultichat = setInterval(() => {
            if (div1 && div2) {
                div1.style.top = mMultichat + 'px';
                div2.style.top = nMultichat + 'px';
                mMultichat--;
                nMultichat--;

                if (mMultichat <= -550) {
                    mMultichat = 550;
                }

                if (nMultichat <= -550) {
                    nMultichat = 550;
                }
            }
        }, speedMultichat);
    }
}

async function ListMultichat() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivityPusatMultimedia";
    const gambarMap = {
        10: "wa-whtie.png",
        1: "fb-white.png",
        99: "x-white.png",
        11: "chat.png",
        2: "ig-white.png",
        7: "chat-white.png",
    };

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const div1 = document.getElementById("div1-multichat");
        const div2 = document.getElementById("div2-multichat");

        let tableContent = "<tbody>";
        data.forEach((items) => {
            let gambarHTML = "";
            const channels = items["chat"] ? items["chat"].split(",") : [];
            channels.forEach((channel) => {
                if (gambarMap[channel]) {
                    const imgSrc = gambarMap[channel];
                    gambarHTML += `<img src="../images/agentactivity/${imgSrc}" alt="Channel ${channel}" width="22px" style="margin-right: 5px;">`;
                }
            });

            // Apply text truncation to agent names (and potentially other long text fields)
            const agentName = items.agent ? items.agent : "-";
            const truncatedAgentName = agentName.length > 20 ? agentName.substring(0, 20) + "..." : agentName;

            tableContent += `
            <tr>
                <td class="first-column" style="min-width: 200px; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${truncatedAgentName}</td>
                <td><span class="${items.status === "Ready" ? "status-available" : "status-istirahat"}">${items.status || "-"}</span></td>
                <td>${items.nowHandle || "-"}</td>
                <td>${gambarHTML || "-"}</td>
                <td>${items.longest || "-"}</td>
            </tr>`;
        });

        // Add empty rows if the data is less than 5 rows
        const missingRows = 5 - data.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableContent += `
                <tr>
                    <td class="first-column" style="min-width: 200px; max-width: 200px;">-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>`;
            }
        }

        tableContent += "</tbody>";

        div1.querySelector('table').innerHTML = tableContent;
        div2.querySelector('table').innerHTML = tableContent;

        // Calculate row count and enable/disable scroll
        const rowCount = Math.max(data.length, 5); // Ensure a minimum of 5 rows
        scrollMultichat(rowCount);
    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

let scrollIntervalEmail = null;
let mEmail = 0;
let nEmail = 800; // Sesuaikan dengan tinggi div
const speedEmail = 50; // Kecepatan scroll

// Fungsi untuk menangani scroll email
function scrollEmail(rowCount) {
    const div1 = document.getElementById('div1-email');
    const div2 = document.getElementById('div2-email');

    // Hentikan scroll jika row kurang dari atau sama dengan 5
    if (rowCount <= 5) {
        clearInterval(scrollIntervalEmail);
        scrollIntervalEmail = null;
        div1.style.top = '0px';
        div2.style.top = '800px';
        return;
    }

    if (!scrollIntervalEmail) {
        scrollIntervalEmail = setInterval(() => {
            if (div1 && div2) {
                div1.style.top = mEmail + 'px';
                div2.style.top = nEmail + 'px';
                mEmail--;
                nEmail--;

                if (mEmail <= -800) {
                    mEmail = 800;
                }

                if (nEmail <= -800) {
                    nEmail = 800;
                }
            }
        }, speedEmail);
    }
}

// Fungsi untuk mengambil data email
async function getDataEmail() {
    try {
      const response = await fetch(
        "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailActivites",
        {
          method: "GET",
          headers: {
            Accept: "text/plain", // Menentukan header accept
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.text();
      const json = JSON.parse(data);
  
      const div1 = document.getElementById("div1-email");
      const div2 = document.getElementById("div2-email");
  
      let tableContent = "<tbody>";
      json.forEach((items) => {
        let row = `
          <tr>
              <td style="min-width: 300px; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${items["name"] || "-"}</td>
              <td style="min-width: 120px; max-width: 120px;">${items["levelUser"] || "-"}</td>
              <td style="min-width: 60px; max-width: 60px;">${items["status"] === "Ready" ? '<span class="status-available">' + items["status"] + '</span>' : '<span class="status-istirahat">' + items["status"] + '</span>'}</td>
              <td style="min-width: 80px; max-width: 80px;">${items["nowHandle"] || "-"}</td>
              <td>${parseInt(items["longers"]) > 60 ? '<span class="status-istirahat">' + items["longers"] + '</span>' : items["longers"]}</td>
          </tr>
        `;
        tableContent += row;
      });
  
      // Tambahkan baris kosong jika kurang dari 5
      const missingRows = 5 - json.length;
      if (missingRows > 0) {
        for (let i = 0; i < missingRows; i++) {
          tableContent += `
          <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
          </tr>`;
        }
      }
  
      tableContent += "</tbody>";
  
      // Insert konten ke kedua div untuk efek scroll
      div1.querySelector('table').innerHTML = tableContent;
      div2.querySelector('table').innerHTML = tableContent;
  
      // Hitung jumlah baris dan aktifkan atau nonaktifkan scroll
      const rowCount = Math.max(json.length, 5); // Pastikan minimal ada 5 baris
      scrollEmail(rowCount);
  
    } catch (error) {
      console.error("Terjadi kesalahan: ", error);
    }
  }
    
let scrollIntervalAgent = null;
let mAgent = 0;
let nAgent = 650; // Sesuaikan dengan tinggi div
const speedAgent = 50; // Kecepatan scroll

function scrollAgent(rowCount) {
    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');

    // Hentikan scroll jika row kurang dari atau sama dengan 5
    if (rowCount <= 5) {
        clearInterval(scrollIntervalAgent);
        scrollIntervalAgent = null;
        div1.style.top = '0px';
        div2.style.top = '650px';
        return;
    }

    if (!scrollIntervalAgent) {
        scrollIntervalAgent = setInterval(() => {
            if (div1 && div2) {
                div1.style.top = mAgent + 'px';
                div2.style.top = nAgent + 'px';
                mAgent--;
                nAgent--;

                if (mAgent <= -650) {
                    mAgent = 650;
                }

                if (nAgent <= -650) {
                    nAgent = 650;
                }
            }
        }, speedAgent);
    }
}

// Fungsi untuk mengambil data agent
async function ListAgent() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataAgentPusat";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const div1 = document.getElementById("div1");
        const div2 = document.getElementById("div2");

        let tableRows = "<tbody>";

        data.forEach((agent, index) => {
            let row = `
                <tr>
                    <td style="min-width: 150px; max-width: 150px;">${agent.agentName || "-"}</td>
                    <td>${agent.extn || "-"}</td>
                    <td>
                        <span class="badge ${getStatusClass(agent.state)}">${agent.state || "-"}</span>
                    </td>
                    <td>${formatDurationNew(agent.time) || "0"}</td>
                </tr>
            `;
            tableRows += row;
        });

        // Tambahkan baris kosong jika jumlah row kurang dari 5
        const missingRows = 5 - data.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableRows += `
                    <tr>
                        <td style="min-width: 150px; max-width: 150px;">-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
            }
        }

        tableRows += "</tbody>";

        // Set the same content for div1 and div2 for seamless scroll
        div1.querySelector('table').innerHTML = tableRows;
        div2.querySelector('table').innerHTML = tableRows;

        // Hitung jumlah row dan aktifkan/disable scrolling berdasarkan jumlah row
        const rowCount = Math.max(data.length, 5); // Minimal 5 row
        scrollAgent(rowCount);

    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

// Fungsi untuk mendapatkan status class
function getStatusClass(status) {
    const statusMap = {
        'Available': 'status-available',
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

// Fungsi untuk format durasi
function formatDurationNew(time) {
    // Implementasi format durasi jika diperlukan
    return time; // Placeholder, implement as needed
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

// Fungsi untuk memformat durasi ke format mm:ss
// function formatDuration(durationInSeconds) {
// const totalSeconds = parseInt(durationInSeconds, 10) || 0;
// const minutes = Math.floor(totalSeconds / 60);
// const seconds = totalSeconds % 60;
// return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// }

// Fungsi formatDuration (jika belum ada)
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Fungsi formatDuration untuk format waktu
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
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
  // divDateNya.append( 'September' + " " + '27' + ", " + '2024' );
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
