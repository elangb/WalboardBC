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
  getDateTime();
  // scrollAgent();
  // scrollEmail();
  // scrollMultichat();
  // scrollSosmed();
  ListAgent();
  getDataMultichat();
  getDataEmail();
  getListSosmed();
}

let scrollIntervalSosmed = null;
let scrollPositionSosmed = 0;
const rowHeightSosmed = 40; // Adjust based on row height
const speedSosmed = 50; // Scroll speed

function timeToSeconds(time) {
    if (!time || typeof time !== "string") return 0;
    const parts = time.split(":").map(Number);
    return (parts[0] * 3600) + (parts[1] * 60) + (parts[2] || 0);
}

async function getListSosmed() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Wallboad/PerformanceSosmed";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const tableBody = document.getElementById("table-body-sosmed");

        let tableRows = "";

        data.forEach((item) => {
            const chats = parseInt(item.total) || 0;
            const chatBadge = chats > 20
                ? '<span class="badge badge-green">' + chats + '</span>'
                : chats > 10
                    ? '<span class="badge badge-orange">' + chats + '</span>'
                    : '<span class="badge badge-pink">' + chats + '</span>';

            const truncatedName = item.name
                ? (item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name)
                : "-";

            const frtFormatted = item.frt || "-";
            const frtInSeconds = timeToSeconds(item.frt);
            const frtDisplay = frtInSeconds > 90
                ? `<span class="badge badge-pink">${frtFormatted}</span>`
                : frtFormatted;

            const aht = item.aht || "-";

            tableRows += `
                <tr>
                    <td style="min-width: 200px; max-width: 200px;" title="${item.name || '-'}">${truncatedName}</td>
                    <td>${chatBadge}</td>
                    <td>${frtDisplay}</td>
                    <td>${aht}</td>
                </tr>
            `;
        });

        // Tambah baris kosong jika data kurang dari 5
        const missingRows = 5 - data.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableRows += `
                    <tr class="empty-row">
                        <td style="min-width: 200px; max-width: 200px;">-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
            }
        }

        // Duplikasi baris untuk auto-scroll
        let duplicatedRows = "";
        for (let i = 0; i < 30; i++) {
            duplicatedRows += tableRows;
        }
        tableBody.innerHTML = duplicatedRows;

        // Ambil posisi scroll terakhir
        const lastScrollPositionSosmed = localStorage.getItem("scrollPositionSosmed");
        if (lastScrollPositionSosmed) {
            scrollPositionSosmed = parseInt(lastScrollPositionSosmed, 10);
        }

        // Mulai auto-scroll jika data lebih dari 5
        const rowCountSosmed = Math.max(data.length, 5) * 30;
        if (data.length > 5) {
            startAutoScrollSosmed(rowCountSosmed);
        }

    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

function startAutoScrollSosmed(rowCountSosmed) {
    const tableBodySosmed = document.getElementById("table-body-sosmed");

    // Start auto-scrolling
    if (!scrollIntervalSosmed) {
        scrollIntervalSosmed = setInterval(() => {
            scrollPositionSosmed -= 1; // Move up 1px
            tableBodySosmed.style.transform = `translateY(${scrollPositionSosmed}px)`;

            // Save the scroll position to localStorage on each change
            localStorage.setItem("scrollPositionSosmed", scrollPositionSosmed);

            // If scroll position exceeds the data's total length, reset it
            if (Math.abs(scrollPositionSosmed) >= rowCountSosmed * rowHeightSosmed) {
                scrollPositionSosmed = 0; // Reset scroll to the top after the data is scrolled through
            }
        }, speedSosmed);
    }
}


let scrollIntervalMultichat = null;
let scrollPositionMultichat = 0;
const rowHeightMultichat = 40; // Adjust this based on your table row height
const speedMultichat = 50; // Scroll speed

function fixTimeFormat(time) {
  if (!time) return "-";

  const parts = time.split(":");
  if (parts.length !== 3) return "-";

  const hours = Math.max(0, parseInt(parts[0], 10) || 0);
  const minutes = Math.max(0, parseInt(parts[1], 10) || 0);
  const seconds = Math.max(0, parseInt(parts[2], 10) || 0);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function timeToSeconds(time) {
  if (!time) return 0;
  const parts = time.split(":").map(Number);
  return (parts[0] * 3600) + (parts[1] * 60) + (parts[2] || 0);
}

async function getDataMultichat() {
  const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataPerformanceMultiChat";
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data); // Logging data for debugging

      const tableBody = document.getElementById("table-body-multichat");
      let tableRows = "";

      data.forEach((item) => {
          const chats = parseInt(item.total) || 0;
          const chatBadge = chats > 19
              ? '<span class="badge badge-green">' + chats + '</span>'
              : chats > 14
                  ? '<span class="badge badge-orange">' + chats + '</span>'
                  : '<span class="badge badge-pink">' + chats + '</span>';

          const truncatedName = item.name
              ? (item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name)
              : "-";

          const frtFormatted = fixTimeFormat(item.frt);
          const frtSeconds = timeToSeconds(frtFormatted);
          const frt = frtSeconds > 90
              ? `<span class="badge badge-pink">${frtFormatted}</span>`
              : frtFormatted;
          const aht = fixTimeFormat(item.aht);

          tableRows += `
              <tr>
                  <td style="min-width: 200px; max-width: 200px;" title="${item.name || '-'}">${truncatedName}</td>
                  <td>${chatBadge}</td>
                  <td>${frt}</td>
                  <td>${aht}</td>
              </tr>
          `;
      });

      const missingRows = 5 - data.length;
      if (missingRows > 0) {
          for (let i = 0; i < missingRows; i++) {
              tableRows += `
                  <tr class="empty-row">
                      <td style="min-width: 200px; max-width: 200px;">-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                  </tr>
              `;
          }
      }

      let duplicatedRows = "";
      for (let i = 0; i < 30; i++) {
          duplicatedRows += tableRows;
      }
      tableBody.innerHTML = duplicatedRows;

      const lastScrollPositionMultichat = localStorage.getItem("scrollPositionMultichat");
      if (lastScrollPositionMultichat) {
          scrollPositionMultichat = parseInt(lastScrollPositionMultichat, 10);
      }

      const rowCountMultichat = Math.max(data.length, 5) * 30; 
      if (data.length > 5) {
          startAutoScrollMultichat(rowCountMultichat);
      }
  } catch (error) {
      console.error("Error loading data: ", error);
  }
}


function startAutoScrollMultichat(rowCountMultichat) {
    const tableBodyMultichat = document.getElementById("table-body-multichat");

    // Start auto-scrolling
    if (!scrollIntervalMultichat) {
        scrollIntervalMultichat = setInterval(() => {
            scrollPositionMultichat -= 1; // Move up 1px
            tableBodyMultichat.style.transform = `translateY(${scrollPositionMultichat}px)`;

            // Save the scroll position to localStorage on each change
            localStorage.setItem("scrollPositionMultichat", scrollPositionMultichat);

            // If scroll position exceeds the total length of data, reset it
            if (Math.abs(scrollPositionMultichat) >= rowCountMultichat * rowHeightMultichat) {
                scrollPositionMultichat = 0; // Reset scroll to the top after the data is scrolled through
            }
        }, speedMultichat);
    }
}


let scrollIntervalEmail = null;
let scrollPositionEmail = 0;
const rowHeightEmail = 40; // Adjust this based on your table row height
const speedEmail = 50; // Scroll speed

function fixTimeFormat(time) {
  if (!time) return "-";

  const parts = time.split(":");
  if (parts.length !== 3) return "-";

  const hours = Math.max(0, parseInt(parts[0], 10) || 0);
  const minutes = Math.max(0, parseInt(parts[1], 10) || 0);
  const seconds = Math.max(0, parseInt(parts[2], 10) || 0);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

async function getDataEmail() {
  const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailPerpormance";
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const tableBody = document.getElementById("table-body-email");

      let tableRows = "";

      data.forEach((item) => {
          const emails = parseInt(item.answer) || 0;
          const emailBadge = emails > 20
              ? '<span class="badge badge-green">' + emails + '</span>'
              : emails > 10
                  ? '<span class="badge badge-orange">' + emails + '</span>'
                  : '<span class="badge badge-pink">' + emails + '</span>';

          const truncatedName = item.name
              ? (item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name)
              : "-";

          // Memperbaiki format waktu sebelum ditampilkan
          const frt = fixTimeFormat(item.frt);
          const aht = fixTimeFormat(item.aht);

          tableRows += ` 
              <tr>
                  <td style="min-width: 200px; max-width: 200px;" title="${item.name || '-'}">${truncatedName}</td>
                  <td>${emailBadge}</td>
                  <td>${frt}</td>
                  <td>${aht}</td>
              </tr>
          `;
      });

      // Add empty rows if data length is less than 5
      const missingRows = 5 - data.length;
      if (missingRows > 0) {
          for (let i = 0; i < missingRows; i++) {
              tableRows += `
                  <tr class="empty-row">
                      <td style="min-width: 200px; max-width: 200px;">-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                  </tr>
              `;
          }
      }

      // Duplicate rows for seamless scrolling
      let duplicatedRows = "";
      for (let i = 0; i < 30; i++) {
          duplicatedRows += tableRows; // Duplicate rows for infinite scroll
      }
      tableBody.innerHTML = duplicatedRows;

      // Get the last scroll position from localStorage
      const lastScrollPositionEmail = localStorage.getItem("scrollPositionEmail");
      if (lastScrollPositionEmail) {
          scrollPositionEmail = parseInt(lastScrollPositionEmail, 10); // Set scroll position to the last saved value
      }

      // Calculate row count for seamless scrolling
      const rowCountEmail = Math.max(data.length, 5) * 30; // Total rows including duplicates

      // Activate auto-scrolling if data has more than 5 rows
      if (data.length > 5) {
          startAutoScrollEmail(rowCountEmail);
      }
  } catch (error) {
      console.error("Error loading data: ", error);
  }
}

function startAutoScrollEmail(rowCountEmail) {
  const tableBodyEmail = document.getElementById("table-body-email");

  // Start auto-scrolling
  if (!scrollIntervalEmail) {
    scrollIntervalEmail = setInterval(() => {
      scrollPositionEmail -= 1; // Move up 1px
      tableBodyEmail.style.transform = `translateY(${scrollPositionEmail}px)`;

      // Save the scroll position to localStorage on each change
      localStorage.setItem("scrollPositionEmail", scrollPositionEmail);

      // If scroll position exceeds the total length of data, reset it
      if (Math.abs(scrollPositionEmail) >= rowCountEmail * rowHeightEmail) {
        scrollPositionEmail = 0; // Reset scroll to the top after the data is scrolled through
      }
    }, speedEmail);
  }
}




function getStatusClass(calls) {
  // Status mapping based on calls
  if (calls < 10) {
      return "status-istirahat";
  } else if (calls >= 10 && calls < 20) {
      return "status-acd";
  } else if (calls >= 20) {
      return "status-available";
  }

  // Default case (this can be kept for other cases if needed)
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

  // If no custom rules match, fall back to this mapping
  return statusMap[status] || "status-other";
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

let scrollInterval = null;
let scrollPosition = 0;
const rowHeight = 40; // Tinggi satu baris (sesuaikan dengan CSS)
const speed = 50; // Kecepatan scroll dalam ms

async function ListAgent() {
  const apiUrl =
    "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetDataAgentPerPormancePusat";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const tableBody = document.getElementById("table-body");

    let tableRows = "";

    data.forEach((agent) => {
      let row = `
        <tr>
          <td style="min-width: 80px; max-width: 80px;">${agent.agentName || "-"}</td>
          <td>
            <span class="badge ${getStatusClass(Number(agent.calls))}">
              ${agent.calls || "-"}
            </span>
          </td>
          <td>${formatDurationNew(agent.art) || "0"}</td>
          <td>${formatDurationNew(agent.aht) || "0"}</td>
        </tr>
      `;
      tableRows += row;
    });

    // Tambahkan baris kosong jika kurang dari 5 baris
    const missingRows = 5 - data.length;
    if (missingRows > 0) {
      for (let i = 0; i < missingRows; i++) {
        tableRows += `
          <tr class="empty-row">
            <td style="min-width: 70px; max-width: 70px;">-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        `;
      }
    }

    // Gandakan data untuk looping tanpa batas
    let duplicatedRows = "";
    for (let i = 0; i < 30; i++) {
      duplicatedRows += tableRows; // Duplikasi tiga kali untuk scroll seamless
    }
    tableBody.innerHTML = duplicatedRows;

    // Ambil posisi scroll terakhir dari localStorage
    const lastScrollPosition = localStorage.getItem("scrollPosition");
    if (lastScrollPosition) {
      scrollPosition = parseInt(lastScrollPosition, 10); // Set posisi scroll ke nilai terakhir
    }

    // Hitung jumlah baris yang ditampilkan
    const rowCount = Math.max(data.length, 5) * 30; // Total baris (termasuk duplikat)

    // Aktifkan auto scrolling hanya jika data lebih dari 5
    if (data.length > 5) {
      startAutoScroll(rowCount);
    } else {
      clearInterval(scrollInterval); // Pastikan scrolling dihentikan jika data kurang dari atau sama dengan 5
	  tableBody.scrollTop = 0; // Set posisi scroll ke awal
    }

  } catch (error) {
    console.error("Error loading data: ", error);
  }
}

function startAutoScroll(rowCount) {
  const tableBody = document.getElementById("table-body");

  // Mulai auto scrolling
  if (!scrollInterval) {
    scrollInterval = setInterval(() => {
      scrollPosition -= 1; // Geser ke atas 1px
      tableBody.style.transform = `translateY(${scrollPosition}px)`;

      // Simpan posisi scroll ke localStorage setiap perubahan
      localStorage.setItem("scrollPosition", scrollPosition);

      // Periksa jika posisi scroll sudah melewati data pertama yang ditampilkan,
      // dan kemudian periksa apakah data sudah sepenuhnya selesai
      if (Math.abs(scrollPosition) >= rowCount * rowHeight) {
        // Looping terus tanpa reset posisi
        scrollPosition = 0; // Setelah data selesai, kembalikan scroll ke posisi awal
      }
    }, speed);
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
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNya + " " + time;

  // Good
  // Morn/After/Even and Have a Nice Day // Good
  // Morn/After/Even and Have a Nice Day
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
