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
  // getGreeting();
  scrollAgent();
  scrollEmail();

  ListAgent();
  // ListAgentSoetta();
  // ListAgentTanjungPriok();
  getDataEmail();
  getListMultichat();
  getListSosmed();
}
async function getListSosmed() {
  try {
    const response = await fetch(
      "http://10.216.206.10/apiDataBravoWb/api/Wallboad/PerformanceSosmed",
      {
        method: "GET",
        headers: {
          Accept: "text/plain", // Setting the accept header
        },
      }
    );

    // Periksa apakah respons berhasil
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text(); // Menggunakan text() karena header Accept adalah text/plain
    const json = JSON.parse(data);

    const minimumRows = 5; // Jumlah minimal baris di tabel
    const tableRows = [];

    // Membuat baris data dari hasil fetch
    json.forEach((items) => {
      let row = "<tr>";
      row +=
        '<td style="min-width: 200px; max-width: 200px;">' +
        (items["name"] || "-") +
        "</td>"; // Nama Agent

      // Chats dengan badge
      const chats = parseInt(items["answer"]) || 0;
      if (chats > 20) {
        row += '<td><span class="badge badge-green">' + chats + "</span></td>";
      } else if (chats > 10) {
        row += '<td><span class="badge badge-orange">' + chats + "</span></td>";
      } else {
        row += '<td><span class="badge badge-pink">' + chats + "</span></td>";
      }

      // Avg Response Time
      row += "<td>" + (items["frt"] || "-") + "</td>";

      // Avg Conversation Time
      row += "<td>" + (items["aht"] || "-") + "</td>";
      row += "</tr>";
      tableRows.push(row);
    });

    // Tambahkan baris kosong jika kurang dari minimumRows
    while (tableRows.length < minimumRows) {
      tableRows.push(
        '<tr class="empty-row">' +
          "<td>-</td><td>-</td><td>-</td><td>-</td>" +
          "</tr>"
      );
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
      table +=
        "<thead><tr>" +
        '<th style="min-width: 200px; max-width: 200px;">Nama Agent</th>' +
        "<th>Chats</th>" +
        "<th>Avg. Resp. Time</th>" +
        "<th>Avg. Conv. Time</th>" +
        "</tr></thead><tbody>";
      table += displayedRows.join("");
      table += "</tbody></table>";

      // Tampilkan tabel
      $("#ListSosmed").html(table);

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
    const response = await fetch(
      "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataPerformanceMultiChat",
      {
        method: "GET",
        headers: {
          Accept: "text/plain", // Setting the accept header
        },
      }
    );

    // Periksa apakah respons berhasil
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text(); // Menggunakan text() karena header Accept adalah text/plain
    const json = JSON.parse(data);

    const minimumRows = 5; // Jumlah minimal baris di tabel
    const tableRows = [];

    // Membuat baris data dari hasil fetch
    json.forEach((items) => {
      let row = "<tr>";
      row +=
        '<td style="min-width: 200px; max-width: 200px;">' +
        (items["name"] || "-") +
        "</td>"; // Nama Agent

      // Chats dengan badge
      const chats = parseInt(items["answer"]) || 0;
      if (chats > 20) {
        row += '<td><span class="badge badge-green">' + chats + "</span></td>";
      } else if (chats > 10) {
        row += '<td><span class="badge badge-orange">' + chats + "</span></td>";
      } else {
        row += '<td><span class="badge badge-pink">' + chats + "</span></td>";
      }

      // Avg Response Time
      row += "<td>" + (items["frt"] || "-") + "</td>";

      // Avg Conversation Time
      row += "<td>" + (items["aht"] || "-") + "</td>";
      row += "</tr>";
      tableRows.push(row);
    });

    // Tambahkan baris kosong jika kurang dari minimumRows
    while (tableRows.length < minimumRows) {
      tableRows.push(
        '<tr class="empty-row">' +
          "<td>-</td><td>-</td><td>-</td><td>-</td>" +
          "</tr>"
      );
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
      table +=
        "<thead><tr>" +
        '<th style="min-width: 200px; max-width: 200px;">Nama Agent</th>' +
        "<th>Chats</th>" +
        "<th>Avg. Resp. Time</th>" +
        "<th>Avg. Conv. Time</th>" +
        "</tr></thead><tbody>";
      table += displayedRows.join("");
      table += "</tbody></table>";

      // Tampilkan tabel
      $("#ListMultichat").html(table);

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
    const apiUrl = "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailPerpormance";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const divEmail1 = document.getElementById("emailDiv1");
        const divEmail2 = document.getElementById("emailDiv2");

        let tableRows = "<tbody>";

        data.forEach((item) => {
            const emails = parseInt(item.answer) || 0;
            const emailBadge = emails > 20
                ? '<span class="badge badge-green">' + emails + '</span>'
                : emails > 10
                    ? '<span class="badge badge-orange">' + emails + '</span>'
                    : '<span class="badge badge-pink">' + emails + '</span>';

            // Batasi panjang nama agen menjadi 15 karakter
            const truncatedName = item.name
                ? (item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name)
                : "-";

            tableRows += `
                <tr>
                    <td style="min-width: 200px; max-width: 200px;" title="${item.name || '-'}">${truncatedName}</td>
                    <td>${emailBadge}</td>
                    <td>${item.frt || "-"}</td>
                    <td>${item.aht || "-"}</td>
                </tr>
            `;
        });

        const missingRows = 5 - data.length;
        if (missingRows > 0) {
            for (let i = 0; i < missingRows; i++) {
                tableRows += `
                    <tr>
                        <td style="min-width: 200px; max-width: 200px;">-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
            }
        }

        tableRows += "</tbody>";

        divEmail1.querySelector("table").innerHTML = tableRows;
        divEmail2.querySelector("table").innerHTML = tableRows;

        const rowCount = Math.max(data.length, 5);
        scrollEmail(rowCount);
    } catch (error) {
        console.error("Error loading data: ", error);
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

let scrollIntervalEmail = null;
let mEmail = 0;
let nEmail = 750; // Sesuaikan dengan tinggi div
const speedEmail = 50; // Kecepatan scroll

function scrollEmail(rowCount) {
    const divEmail1 = document.getElementById("divEmail1");
    const divEmail2 = document.getElementById("divEmail2");

    if (rowCount <= 5) {
        clearInterval(scrollIntervalEmail);
        scrollIntervalEmail = null;
        divEmail1.style.top = "0px";
        divEmail2.style.top = "750px";
        return;
    }

    if (!scrollIntervalEmail) {
        scrollIntervalEmail = setInterval(() => {
            if (divEmail1 && divEmail2) {
                divEmail1.style.top = mEmail + "px";
                divEmail2.style.top = nEmail + "px";
                mEmail--;
                nEmail--;

                if (mEmail <= -750) {
                    mEmail = 750;
                }

                if (nEmail <= -750) {
                    nEmail = 750;
                }
            }
        }, speedEmail);
    }
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

async function ListAgent() {
  const apiUrl =
    "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetDataAgentPerPormancePusat";
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
                    <td style="min-width: 80px; max-width: 80px;">${
                      agent.agentName || "-"
                    }</td>
                   
                    <td>
                        <span class="badge ${getStatusClass(
                          Number(agent.calls)
                        )}">${agent.calls || "-"}</span>
                    </td>
                    <td>${formatDurationNew(agent.art) || "0"}</td>
                    <td>${formatDurationNew(agent.aht) || "0"}</td>
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
                        <td style="min-width: 70px; max-width: 70px;">-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                `;
      }
    }

    tableRows += "</tbody>";

    // Set the same content for div1 and div2 for seamless scroll
    div1.querySelector("table").innerHTML = tableRows;
    div2.querySelector("table").innerHTML = tableRows;

    // Hitung jumlah row dan aktifkan/disable scrolling berdasarkan jumlah row
    const rowCount = Math.max(data.length, 5); // Minimal 5 row
    scrollAgent(rowCount);
  } catch (error) {
    console.error("Error loading data: ", error);
  }
}

let scrollIntervalAgent = null;
let mAgent = 0;
let nAgent = 750; // Sesuaikan dengan tinggi div
const speedAgent = 50; // Kecepatan scroll
function scrollAgent(rowCount) {
  const div1 = document.getElementById("div1");
  const div2 = document.getElementById("div2");

  // Hentikan scroll jika row kurang dari atau sama dengan 5
  if (rowCount <= 5) {
    clearInterval(scrollIntervalAgent);
    scrollIntervalAgent = null;
    div1.style.top = "0px";
    div2.style.top = "750px";
    return;
  }

  if (!scrollIntervalAgent) {
    scrollIntervalAgent = setInterval(() => {
      if (div1 && div2) {
        div1.style.top = mAgent + "px";
        div2.style.top = nAgent + "px";
        mAgent--;
        nAgent--;

        if (mAgent <= -750) {
          mAgent = 750;
        }

        if (nAgent <= -750) {
          nAgent = 750;
        }
      }
    }, speedAgent);
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
