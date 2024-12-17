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
    // scrollAgent();
    // scrollMultichat();
    // scrollEmail();
    // scrollSosmed();
    ListAgent();
    ListMultichat();
    getDataEmail();
    getListSosmed();
    getDateTime();
  }
  
  let scrollIntervalSosmed = null;
  let scrollPositionSosmed = 0;
  const rowHeightSosmed = 40; // Tinggi satu baris (sesuaikan dengan CSS)
  const speedSosmed = 50; // Kecepatan scroll dalam ms
  
  async function getListSosmed() {
      const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataActivitiesSosmed";
  
      try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          const tableBody = document.getElementById("sosmed-body");
  
          let tableRows = "";
  
          data.forEach((items) => {
              tableRows += `
              <tr>
                  <td style="min-width: 150px; max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${items["name"] || "-"}
                  </td>
                  <td>
                      <span class="${items["status"] === "Ready" ? "status-available" : "status-istirahat"}">
                          ${items["status"] || "-"}
                      </span>
                  </td>
                  <td>${items["nowHandle"] || "-"}</td>
                  <td>-</td>
                  <td>${items["longers"] || "-"}</td>
              </tr>`;
          });
  
          // Tambahkan baris kosong jika kurang dari 5
          const missingRows = 5 - data.length;
          if (missingRows > 0) {
              for (let i = 0; i < missingRows; i++) {
                  tableRows += `
                  <tr class="empty-row">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                  </tr>`;
              }
          }
  
          // Gandakan data untuk scrolling seamless
          let duplicatedRows = "";
          for (let i = 0; i < 3; i++) {
              duplicatedRows += tableRows; // Duplikasi tiga kali
          }
          tableBody.innerHTML = duplicatedRows;
  
          // Hitung jumlah baris total
          const rowCount = Math.max(data.length, 5) * 3; // Total baris (termasuk duplikat)
  
          // Aktifkan auto scrolling hanya jika data lebih dari 5
          if (data.length > 5) {
              startAutoScrollSosmed(rowCount);
          } else {
              clearInterval(scrollIntervalSosmed); // Pastikan scrolling dihentikan jika data kurang dari atau sama dengan 5
          }
      } catch (error) {
          console.error("Error loading data: ", error);
      }
  }
  
  function startAutoScrollSosmed(rowCount) {
      const tableBody = document.getElementById("sosmed-body");
  
      // Hentikan scrolling jika row kurang dari atau sama dengan 5
      if (rowCount <= 5) {
          clearInterval(scrollIntervalSosmed);
          scrollIntervalSosmed = null;
          tableBody.style.transform = "translateY(0px)";
          return;
      }
  
      // Mulai auto scrolling
      if (!scrollIntervalSosmed) {
          scrollIntervalSosmed = setInterval(() => {
              scrollPositionSosmed -= 1; // Geser ke atas 1px
              tableBody.style.transform = `translateY(${scrollPositionSosmed}px)`;
  
              // Reset posisi scroll jika sudah melewati semua data
              if (Math.abs(scrollPositionSosmed) >= rowCount * rowHeightSosmed) {
                  scrollPositionSosmed = 0; // Kembalikan scroll ke posisi awal
              }
          }, speedSosmed);
      }
  }
    
  
  let scrollIntervalMultichat = null;
  let scrollPositionMultichat = 0;
  const rowHeightMultichat = 40; // Tinggi satu baris (sesuaikan dengan CSS)
  const speedMultichat = 50; // Kecepatan scroll dalam ms
  
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
          const tableBody = document.getElementById("multichat-body");
  
          let tableRows = "";
  
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
  
              tableRows += `
              <tr>
                  <td style="min-width: 150px; max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${truncatedAgentName}</td>
                  <td>
                      <span class="${items.status === "Ready" ? "status-available" : "status-istirahat"}">${items.status || "-"}</span>
                  </td>
                  <td>${items.nowHandle || "-"}</td>
                  <td>${gambarHTML || "-"}</td>
                  <td>${items.longest || "-"}</td>
              </tr>`;
          });
  
          // Tambahkan baris kosong jika data kurang dari 5 baris
          const missingRows = 5 - data.length;
          if (missingRows > 0) {
              for (let i = 0; i < missingRows; i++) {
                  tableRows += `
                  <tr class="empty-row">
                      <td style="min-width: 150px; max-width: 150px;">-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                  </tr>`;
              }
          }
  
          // Gandakan data untuk scrolling seamless
          let duplicatedRows = "";
          for (let i = 0; i < 3; i++) {
              duplicatedRows += tableRows; // Duplikasi tiga kali
          }
          tableBody.innerHTML = duplicatedRows;
  
          // Hitung jumlah baris total
          const rowCount = Math.max(data.length, 5) * 3; // Total baris (termasuk duplikat)
  
          // Aktifkan auto scrolling hanya jika data lebih dari 5
          if (data.length > 5) {
              startAutoScrollMultichat(rowCount);
          } else {
              clearInterval(scrollIntervalMultichat); // Pastikan scrolling dihentikan jika data kurang dari atau sama dengan 5
          }
      } catch (error) {
          console.error("Error loading data: ", error);
      }
  }
  
  function startAutoScrollMultichat(rowCount) {
      const tableBody = document.getElementById("multichat-body");
  
      // Hentikan scrolling jika row kurang dari atau sama dengan 5
      if (rowCount <= 5) {
          clearInterval(scrollIntervalMultichat);
          scrollIntervalMultichat = null;
          tableBody.style.transform = "translateY(0px)";
          return;
      }
  
      // Mulai auto scrolling
      if (!scrollIntervalMultichat) {
          scrollIntervalMultichat = setInterval(() => {
              scrollPositionMultichat -= 1; // Geser ke atas 1px
              tableBody.style.transform = `translateY(${scrollPositionMultichat}px)`;
  
              // Reset posisi scroll jika sudah melewati semua data
              if (Math.abs(scrollPositionMultichat) >= rowCount * rowHeightMultichat) {
                  scrollPositionMultichat = 0; // Kembalikan scroll ke posisi awal
              }
          }, speedMultichat);
      }
  }
  
  
let scrollIntervalEmail = null;
let scrollPositionEmail = 0;
const rowHeightEmail = 40; // Adjust this based on your table row height
const speedEmail = 50; // Scroll speed

async function getDataEmail() {
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailActivites";
    try {
      const response = await fetch(apiUrl);
      console.log("Response status:", response.status); // Log status HTTP
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched data:", data); // Log data dari API
  
      const tableBody = document.getElementById("table-body-email");
  
      let tableRows = "";
  
      data.forEach((item) => {
        console.log("Processing item:", item); // Log setiap item data
        const statusBadge =
          item.status === "Ready"
            ? '<span class="status-available">' + item.status + '</span>'
            : '<span class="status-istirahat">' + item.status + '</span>';
  
        const longestBadge =
          parseInt(item.longers) > 60
            ? '<span class="status-istirahat">' + item.longers + '</span>'
            : item.longers;
  
        tableRows += `
          <tr>
            <td>${item.name || "-"}</td>
            <td>${item.levelUser || "-"}</td>
            <td>${statusBadge}</td>
            <td>${item.nowHandle || "-"}</td>
            <td>${longestBadge}</td>
          </tr>
        `;
      });
  
      console.log("Table rows generated:", tableRows); // Log hasil generate rows
  
      const missingRows = 5 - data.length;
      if (missingRows > 0) {
        for (let i = 0; i < missingRows; i++) {
          tableRows += `
            <tr class="empty-row">
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          `;
        }
      }
  
      let duplicatedRows = "";
      for (let i = 0; i < 3; i++) {
        duplicatedRows += tableRows;
      }
      tableBody.innerHTML = duplicatedRows;
  
      if (data.length > 5) {
        startAutoScrollEmail();
      }
    } catch (error) {
      console.error("Error loading data:", error); // Log error jika ada
    }
  }
  

function startAutoScrollEmail() {
  const tableBodyEmail = document.getElementById("table-body-email");
  const totalRows = tableBodyEmail.querySelectorAll("tr").length;

  // Stop scrolling if row count is less than or equal to 5
  if (totalRows <= 5) {
    clearInterval(scrollIntervalEmail);
    scrollIntervalEmail = null;
    tableBodyEmail.style.transform = "translateY(0px)";
    return;
  }

  // Start auto-scrolling
  if (!scrollIntervalEmail) {
    scrollIntervalEmail = setInterval(() => {
      scrollPositionEmail -= 1; // Move up 1px
      tableBodyEmail.style.transform = `translateY(${scrollPositionEmail}px)`;

      // If scroll position exceeds the data's total length, reset it
      if (Math.abs(scrollPositionEmail) >= totalRows * rowHeightEmail) {
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
      
    let scrollInterval = null;
    let scrollPosition = 0;
    const rowHeight = 40; // Tinggi satu baris (sesuaikan dengan CSS)
    const speed = 50; // Kecepatan scroll dalam ms
    
    async function ListAgent() {
        const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataAgentPusat";
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
    
            // Tambahkan baris kosong jika kurang dari 5 baris
            const missingRows = 5 - data.length;
            if (missingRows > 0) {
                for (let i = 0; i < missingRows; i++) {
                    tableRows += `
                        <tr class="empty-row">
                            <td style="min-width: 150px; max-width: 150px;">-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    `;
                }
            }
    
            // Gandakan data untuk seamless scroll
            let duplicatedRows = "";
            for (let i = 0; i < 3; i++) {
                duplicatedRows += tableRows; // Duplikasi tiga kali
            }
            tableBody.innerHTML = duplicatedRows;
    
            // Ambil posisi scroll terakhir dari localStorage
            const lastScrollPosition = localStorage.getItem("scrollPosition");
            if (lastScrollPosition) {
                scrollPosition = parseInt(lastScrollPosition, 10);
            }
    
            // Hitung jumlah baris yang ditampilkan
            const rowCount = Math.max(data.length, 5) * 3; // Total baris (termasuk duplikat)
    
            // Aktifkan auto scrolling hanya jika data lebih dari 5
            if (data.length > 5) {
                startAutoScroll(rowCount);
            } else {
                clearInterval(scrollInterval); // Pastikan scrolling dihentikan jika data kurang dari atau sama dengan 5
            }
    
        } catch (error) {
            console.error("Error loading data: ", error);
        }
    }
    
    function startAutoScroll(rowCount) {
        const tableBody = document.getElementById("table-body");
    
        // Hentikan scrolling jika row kurang dari atau sama dengan 5
        if (rowCount <= 5) {
            clearInterval(scrollInterval);
            scrollInterval = null;
            tableBody.style.transform = "translateY(0px)";
            return;
        }
    
        // Mulai auto scrolling
        if (!scrollInterval) {
            scrollInterval = setInterval(() => {
                scrollPosition -= 1; // Geser ke atas 1px
                tableBody.style.transform = `translateY(${scrollPosition}px)`;
    
                // Simpan posisi scroll ke localStorage setiap perubahan
                localStorage.setItem("scrollPosition", scrollPosition);
    
                // Reset posisi scroll jika sudah melewati semua data
                if (Math.abs(scrollPosition) >= rowCount * rowHeight) {
                    scrollPosition = 0; // Kembalikan scroll ke posisi awal
                }
            }, speed);
        }
    }
    
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
  