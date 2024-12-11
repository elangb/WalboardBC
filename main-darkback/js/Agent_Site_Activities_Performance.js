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
  getDateTime();
  getGreeting();

  ListAgentPasarBaru();
  ListAgentSoetta();
  ListAgentTanjungPriok();
  getDataEmail();
  listMultiChatPriuk();
  listMultiChatPasarBaru();
  listMultiChatSoetta();
}
async function getDataEmail() {
  try {
    const response = await fetch(
      "http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailAllSide",
      {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    const emails = JSON.parse(data) || []; // Data email dari server
    const minimumRows = 3; // Jumlah minimal baris di tabel
    const tableRowsSoetta = [];
    const tableRowsPasarBaru = [];

    // Memisahkan data berdasarkan sideId dan membuat baris tabel
    emails.forEach((items) => {
      let row = "<tr>";
      row += "<td>" + (items["name"] || "-") + "</td>";
      row += "<td>" + (items["status"] || "-") + "</td>";
      row += "<td>" + (items["handleTime"] || "-") + "</td>";
      row += "<td>" + (items["loginTime"] || "-") + "</td>";
      row += "</tr>";

      if (items["sideId"] === "Soekarno Hatta") {
        tableRowsSoetta.push(row);
      } else if (items["sideId"] === "Pasar Baru") {
        tableRowsPasarBaru.push(row);
      }
    });

    // Tambahkan baris kosong jika kurang dari minimumRows
    while (tableRowsSoetta.length < minimumRows) {
      tableRowsSoetta.push(
        '<tr class="empty-row">' +
          "<td>-</td><td>-</td><td>-</td><td>-</td>" +
          "</tr>"
      );
    }

    while (tableRowsPasarBaru.length < minimumRows) {
      tableRowsPasarBaru.push(
        '<tr class="empty-row">' +
          "<td>-</td><td>-</td><td>-</td><td>-</td>" +
          "</tr>"
      );
    }

    // Fungsi untuk memperbarui tabel
    const updateTable = (tableRows, selector) => {
      let table = '<table class="table table-dark table-striped">';
      table +=
        "<thead><tr>" +
        "<th>Nama Agent</th>" +
        "<th>Status</th>" +
        "<th>Now Handle</th>" +
        "<th>Emails</th>" +
        "</tr></thead><tbody>";
      table += tableRows.join("");
      table += "</tbody></table>";

      // Tampilkan tabel di elemen yang sesuai
      $(selector).html(table);
    };

    // Update tabel pertama kali
    updateTable(tableRowsSoetta, "#listEmailSoetta");
    updateTable(tableRowsPasarBaru, "#ListEmailPasarBaru");

    // Interval untuk rolling data (jika diperlukan)
    if (tableRowsSoetta.length > minimumRows) {
      let startIndexSoetta = 0;
      setInterval(() => {
        startIndexSoetta = (startIndexSoetta + 1) % tableRowsSoetta.length;
        const displayedRows = tableRowsSoetta
          .slice(startIndexSoetta, startIndexSoetta + minimumRows)
          .concat(
            tableRowsSoetta.slice(
              0,
              Math.max(
                0,
                minimumRows - (tableRowsSoetta.length - startIndexSoetta)
              )
            )
          );
        updateTable(displayedRows, "#listEmailSoetta");
      }, 2000); // Rolling setiap 2 detik
    }

    if (tableRowsPasarBaru.length > minimumRows) {
      let startIndexPasarBaru = 0;
      setInterval(() => {
        startIndexPasarBaru =
          (startIndexPasarBaru + 1) % tableRowsPasarBaru.length;
        const displayedRows = tableRowsPasarBaru
          .slice(startIndexPasarBaru, startIndexPasarBaru + minimumRows)
          .concat(
            tableRowsPasarBaru.slice(
              0,
              Math.max(
                0,
                minimumRows - (tableRowsPasarBaru.length - startIndexPasarBaru)
              )
            )
          );
        updateTable(displayedRows, "#ListEmailPasarBaru");
      }, 2000); // Rolling setiap 2 detik
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Menampilkan pesan error kepada user
    $("#listEmailSoetta").html(
      '<div class="alert alert-danger">Failed to load data for Soekarno Hatta. Please try again later.</div>'
    );
    $("#ListEmailPasarBaru").html(
      '<div class="alert alert-danger">Failed to load data for Pasar Baru. Please try again later.</div>'
    );
  }
}

function ListAgentTanjungPriok() {
  $.getJSON(
    "PHP/Agent_Site_Activities_Performance_TanjungPriuk.php",
    function (data) {
      const agents = data || []; // Data agent dari server
      const minimumRows = 5; // Jumlah minimal baris di tabel
      const tableRows = [];

      // Membuat baris data dari hasil fetch
      agents.forEach((items) => {
        let row = "<tr>";
        row += "<td>" + (items["Agent Name"] || "-") + "</td>"; // Nama Agent
        row +=
          '<td><span class="badge badge-green">' +
          (items["Extn"] || "-") +
          "</span></td>"; // Extension

        // Status formatting
        if (items["State"] === "AVAIL")
          row +=
            '<td><span class="badge badge-green">' +
            items["State"] +
            "</span></td>";
        else if (items["State"] === "ACW")
          row +=
            '<td><span class="badge badge-orange">' +
            items["State"] +
            "</span></td>";
        else if (items["State"] === "AUX")
          row +=
            '<td><span class="badge badge-blue">' +
            items["State"] +
            "</span></td>";
        else
          row +=
            '<td><span class="badge badge-pink">' +
            (items["State"] || "-") +
            "</span></td>";

        // Time formatting
        const timeValue = items["Time"] || "0";
        const duration = formatDuration(timeValue); // Optional: Implement duration formatting
        row += "<td>" + duration + "</td>";
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
          "<th>Nama Agent</th>" +
          "<th>Extension</th>" +
          "<th>Status</th>" +
          "<th>Duration</th>" +
          "</tr></thead><tbody>";
        table += displayedRows.join("");
        table += "</tbody></table>";

        // Tampilkan tabel
        $("#ListAgentTanjungPriok").html(table);

        // Update indeks awal untuk rolling
        startIndex = (startIndex + 1) % tableRows.length;
      };

      // Update tabel pertama kali
      updateTable();

      // Interval untuk rolling data
      if (tableRows.length > minimumRows) {
        setInterval(updateTable, 2000); // Rolling setiap 2 detik
      }
    }
  );
}

function ListAgentSoetta() {
  $.getJSON(
    "PHP/Agent_Site_Activities_Performance_soetta.php",
    function (data) {
      const agents = data || []; // Data agent dari server
      const minimumRows = 3; // Jumlah minimal baris di tabel
      const tableRows = [];

      // Membuat baris data dari hasil fetch
      agents.forEach((items) => {
        let row = "<tr>";
        row += "<td>" + (items["Agent Name"] || "-") + "</td>"; // Nama Agent
        row +=
          '<td><span class="badge badge-green">' +
          (items["Extn"] || "-") +
          "</span></td>"; // Extension

        // Status formatting
        if (items["State"] === "AVAIL")
          row +=
            '<td><span class="badge badge-green">' +
            items["State"] +
            "</span></td>";
        else if (items["State"] === "ACW")
          row +=
            '<td><span class="badge badge-orange">' +
            items["State"] +
            "</span></td>";
        else if (items["State"] === "AUX")
          row +=
            '<td><span class="badge badge-blue">' +
            items["State"] +
            "</span></td>";
        else
          row +=
            '<td><span class="badge badge-pink">' +
            (items["State"] || "-") +
            "</span></td>";

        // Time formatting
        const timeValue = items["Time"] || "0";
        const duration = formatDuration(timeValue); // Fungsi untuk memformat durasi
        row += "<td>" + duration + "</td>";
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
          "<th>Nama Agent</th>" +
          "<th>Extension</th>" +
          "<th>Status</th>" +
          "<th>Duration</th>" +
          "</tr></thead><tbody>";
        table += displayedRows.join("");
        table += "</tbody></table>";

        // Tampilkan tabel
        $("#ListAgentSoetta").html(table);

        // Update indeks awal untuk rolling
        startIndex = (startIndex + 1) % tableRows.length;
      };

      // Update tabel pertama kali
      updateTable();

      // Interval untuk rolling data
      if (tableRows.length > minimumRows) {
        setInterval(updateTable, 2000); // Rolling setiap 2 detik
      }
    }
  ).fail(function () {
    // Error handling
    $("#ListAgentSoetta").html(
      '<div class="alert alert-danger">Failed to load data. Please try again later.</div>'
    );
  });
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

function ListAgentPasarBaru() {
  $.getJSON("PHP/Agent_Site_Activities_Performance.php", function (data) {
    const agents = data || []; // Data agent dari server
    const minimumRows = 3; // Jumlah minimal baris di tabel
    const tableRows = [];

    // Membuat baris data dari hasil fetch
    agents.forEach((items) => {
      let row = "<tr>";
      row += "<td>" + (items["Agent Name"] || "-") + "</td>"; // Nama Agent
      row +=
        '<td><span class="badge badge-green">' +
        (items["Extn"] || "-") +
        "</span></td>"; // Extension

      // Status formatting
      if (items["State"] === "AVAIL") {
        row +=
          '<td><span class="badge badge-green">' +
          items["State"] +
          "</span></td>";
      } else {
        row +=
          '<td><span class="badge badge-pink">' +
          (items["State"] || "-") +
          "</span></td>";
      }

      // Time formatting
      const timeValue = items["Time"] || "0";
      const duration = formatDuration(timeValue); // Fungsi untuk memformat durasi
      row += "<td>" + duration + "</td>";

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
        "<th>Nama Agent</th>" +
        "<th>Ext</th>" +
        "<th>Status</th>" +
        "<th>Calls</th>" +
        "</tr></thead><tbody>";
      table += displayedRows.join("");
      table += "</tbody></table>";

      // Tampilkan tabel
      $("#ListAgentPasarBaru").html(table);

      // Update indeks awal untuk rolling
      startIndex = (startIndex + 1) % tableRows.length;
    };

    // Update tabel pertama kali
    updateTable();

    // Interval untuk rolling data
    if (tableRows.length > minimumRows) {
      setInterval(updateTable, 2000); // Rolling setiap 2 detik
    }
  }).fail(function () {
    // Error handling
    $("#ListAgentPasarBaru").html(
      '<div class="alert alert-danger">Failed to load data. Please try again later.</div>'
    );
  });
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

async function listMultiChatPriuk() {
  try {
    const response = await fetch(
      "http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivityPriuk",
      {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    const agents = JSON.parse(data) || []; // Data agent dari server
    const minimumRows = 5; // Jumlah minimal baris di tabel
    const tableRows = [];

    // Membuat baris data dari hasil fetch
    agents.forEach((items) => {
      let row = "<tr>";
      row += "<td>" + (items["agent"] || "-") + "</td>"; // Nama Agent

      // Status formatting
      if (items["status"] === "Ready")
        row +=
          '<td><span class="badge badge-green">' +
          items["status"] +
          "</span></td>";
      else
        row +=
          '<td><span class="badge badge-pink">' +
          (items["status"] || "-") +
          "</span></td>";

      // Now Handle
      row += "<td>" + (items["nowHandle"] || "-") + "</td>";

      // Chats count
      const chats = items["chat"] || "0";
      row += "<td>" + chats + "</td>";
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
        "<th>Nama Agent</th>" +
        "<th>Status</th>" +
        "<th>Now Handle</th>" +
        "<th>Chats</th>" +
        "</tr></thead><tbody>";
      table += displayedRows.join("");
      table += "</tbody></table>";

      // Tampilkan tabel
      $("#multichatTanjungPriuk").html(table);

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
    // Menampilkan pesan error kepada user
    $("#multichatTanjungPriuk").html(
      '<div class="alert alert-danger">Failed to load data. Please try again later.</div>'
    );
  }
}

async function listMultiChatSoetta() {
  try {
    const response = await fetch(
      "http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivitySoetta",
      {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    const agents = JSON.parse(data) || []; // Data agent dari server
    const minimumRows = 2; // Jumlah minimal baris di tabel
    const tableRows = [];

    // Membuat baris data dari hasil fetch
    agents.forEach((items) => {
      let row = "<tr>";
      row += "<td>" + (items["agent"] || "-") + "</td>"; // Nama Agent

      // Status formatting
      if (items["status"] === "Ready")
        row +=
          '<td><span class="badge badge-green">' +
          items["status"] +
          "</span></td>";
      else
        row +=
          '<td><span class="badge badge-pink">' +
          (items["status"] || "-") +
          "</span></td>";

      // Now Handle
      row += "<td>" + (items["nowHandle"] || "-") + "</td>";

      // Chats count
      const chats = items["chat"] || "0";
      row += "<td>" + chats + "</td>";
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
        "<th>Nama Agent</th>" +
        "<th>Status</th>" +
        "<th>Now Handle</th>" +
        "<th>Chats</th>" +
        "</tr></thead><tbody>";
      table += displayedRows.join("");
      table += "</tbody></table>";

      // Tampilkan tabel
      $("#multichatSoetta").html(table);

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
    // Menampilkan pesan error kepada user
    $("#multichatSoetta").html(
      '<div class="alert alert-danger">Failed to load data. Please try again later.</div>'
    );
  }
}

async function listMultiChatPasarBaru() {
  try {
    const response = await fetch(
      "http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivityPasarBaru",
      {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    const agents = JSON.parse(data) || []; // Data agent dari server
    const minimumRows = 2; // Jumlah minimal baris di tabel
    const tableRows = [];

    // Membuat baris data dari hasil fetch
    agents.forEach((items) => {
      let row = "<tr>";
      row += "<td>" + (items["agent"] || "-") + "</td>"; // Nama Agent

      // Status formatting
      if (items["status"] === "Ready")
        row +=
          '<td><span class="badge badge-green">' +
          items["status"] +
          "</span></td>";
      else
        row +=
          '<td><span class="badge badge-pink">' +
          (items["status"] || "-") +
          "</span></td>";

      // Now Handle
      row += "<td>" + (items["nowHandle"] || "-") + "</td>";

      // Chats count
      const chats = items["chat"] || "0";
      row += "<td>" + chats + "</td>";
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
        "<th>Nama Agent</th>" +
        "<th>Status</th>" +
        "<th>Now Handle</th>" +
        "<th>Chats</th>" +
        "</tr></thead><tbody>";
      table += displayedRows.join("");
      table += "</tbody></table>";

      // Tampilkan tabel
      $("#multichatPasarBaru").html(table);

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
    // Menampilkan pesan error kepada user
    $("#multichatPasarBaru").html(
      '<div class="alert alert-danger">Failed to load data. Please try again later.</div>'
    );
  }
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
