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
  scrollAgent();
  scrollAgentSoeta();
  scrollAgenPasbar();
  scrollMultichatTanjungPriuk();
  scrollMultichat();
  scrollMultichatPasarBaru();
  ListAgentPasarBaru();
  ListAgentSoetta();
  ListAgentTanjungPriok();
  getDataEmail();
  listMultiChatTanjungPriuk();
  listMultiChatPasarBaru();
  listMultiChatSoetta();
}

function getStatusClass(status) {
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
  return statusMap[status] || "status-other";
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
    const minimumRows = 2; // Jumlah minimal baris di tabel
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

let scrollIntervalAgent = null;
let mAgent = 0;
let nAgent = 550; // Sesuaikan dengan tinggi div
const speedAgent = 50; // Kecepatan scroll

function scrollAgent(rowCount) {
  const div1 = document.getElementById("div1");
  const div2 = document.getElementById("div2");

  // Hentikan scroll jika row kurang dari atau sama dengan 5
  if (rowCount <= 5) {
    clearInterval(scrollIntervalAgent);
    scrollIntervalAgent = null;
    div1.style.top = "0px";
    div2.style.top = "550px";
    return;
  }

  if (!scrollIntervalAgent) {
    scrollIntervalAgent = setInterval(() => {
      if (div1 && div2) {
        div1.style.top = mAgent + "px";
        div2.style.top = nAgent + "px";
        mAgent--;
        nAgent--;

        if (mAgent <= -550) {
          mAgent = 550;
        }

        if (nAgent <= -550) {
          nAgent = 550;
        }
      }
    }, speedAgent);
  }
}

function scrollAgenPasbar(rowCount) {
  const div1 = document.getElementById("divPasbar1");
  const div2 = document.getElementById("divPasbar2");

  // Hentikan scroll jika row kurang dari atau sama dengan 5
  if (rowCount <= 5) {
    clearInterval(scrollIntervalAgent);
    scrollIntervalAgent = null;
    div1.style.top = "0px";
    div2.style.top = "550px";
    return;
  }

  if (!scrollIntervalAgent) {
    scrollIntervalAgent = setInterval(() => {
      if (div1 && div2) {
        div1.style.top = mAgent + "px";
        div2.style.top = nAgent + "px";
        mAgent--;
        nAgent--;

        if (mAgent <= -550) {
          mAgent = 550;
        }

        if (nAgent <= -550) {
          nAgent = 550;
        }
      }
    }, speedAgent);
  }
}

function scrollAgentSoeta(rowCount) {
  const div1 = document.getElementById("divSoeta1");
  const div2 = document.getElementById("divSoeta2");

  // Hentikan scroll jika row kurang dari atau sama dengan 5
  if (rowCount <= 4) {
    clearInterval(scrollIntervalAgent);
    scrollIntervalAgent = null;
    div1.style.top = "0px";
    div2.style.top = "550px";
    return;
  }

  if (!scrollIntervalAgent) {
    scrollIntervalAgent = setInterval(() => {
      if (div1 && div2) {
        div1.style.top = mAgent + "px";
        div2.style.top = nAgent + "px";
        mAgent--;
        nAgent--;

        if (mAgent <= -550) {
          mAgent = 550;
        }

        if (nAgent <= -550) {
          nAgent = 550;
        }
      }
    }, speedAgent);
  }
}

async function ListAgentTanjungPriok() {
  const apiUrl =
    "http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataAgentPriuk";
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
                    <td style="min-width: 150px; max-width: 150px;">${
                      agent.agentName || "-"
                    }</td>
                    <td>${agent.extn || "-"}</td>
                    <td>
                        <span class="badge ${getStatusClass(agent.state)}">${
        agent.state || "-"
      }</span>
                    </td>
                    <td>${agent.calls || "0"}</td>
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
    div1.querySelector("table").innerHTML = tableRows;
    div2.querySelector("table").innerHTML = tableRows;

    // Hitung jumlah row dan aktifkan/disable scrolling berdasarkan jumlah row
    const rowCount = Math.max(data.length, 5); // Minimal 5 row
    scrollAgent(rowCount);
  } catch (error) {
    console.error("Error loading data: ", error);
  }
}

async function ListAgentSoetta() {
  const apiUrl =
    "http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataAgentSoetta";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const div1 = document.getElementById("divSoeta1");
    const div2 = document.getElementById("divSoeta2");

    let tableRows = "<tbody>";

    data.forEach((agent, index) => {
      let row = `
                <tr>
                    <td style="min-width: 150px; max-width: 150px;">${
                      agent.agentName || "-"
                    }</td>
                    <td>${agent.extn || "-"}</td>
                    <td>
                        <span class="badge ${getStatusClass(agent.state)}">${
        agent.state || "-"
      }</span>
                    </td>
                    <td>${agent.calls || "0"}</td>
                </tr>
            `;
      tableRows += row;
    });

    // Tambahkan baris kosong jika jumlah row kurang dari 5
    const missingRows = 4 - data.length;
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
    divSoeta1.querySelector("table").innerHTML = tableRows;
    divSoeta2.querySelector("table").innerHTML = tableRows;

    // Hitung jumlah row dan aktifkan/disable scrolling berdasarkan jumlah row
    const rowCount = Math.max(data.length, 4); // Minimal 5 row
    scrollAgentSoeta(rowCount);
  } catch (error) {
    console.error("Error loading data: ", error);
  }
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

async function ListAgentPasarBaru() {
  const apiUrl =
    "http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataAgentPasarBaru";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const div1 = document.getElementById("divPasbar1");
    const div2 = document.getElementById("divPasbar2");

    let tableRows = "<tbody>";

    data.forEach((agent, index) => {
      let row = `
                <tr>
                    <td style="min-width: 150px; max-width: 150px;">${
                      agent.agentName || "-"
                    }</td>
                    <td>${agent.extn || "-"}</td>
                    <td>
                        <span class="badge ${getStatusClass(agent.state)}">${
        agent.state || "-"
      }</span>
                    </td>
                    <td>${agent.calls || "0"}</td>
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
    divPasbar1.querySelector("table").innerHTML = tableRows;
    divPasbar2.querySelector("table").innerHTML = tableRows;

    // Hitung jumlah row dan aktifkan/disable scrolling berdasarkan jumlah row
    const rowCount = Math.max(data.length, 5); // Minimal 5 row
    scrollAgenPasbar(rowCount);
  } catch (error) {
    console.error("Error loading data: ", error);
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

let mMultichatTanjungPriuk = 650; // Initial scroll position for divMultichatTanjungPriuk1
let nMultichatTanjungPriuk = 650; // Initial scroll position for divMultichatTanjungPriuk2
let speedMultichatTanjungPriuk = 30; // Scroll speed (adjust as needed)
let scrollIntervalMultichatTanjungPriuk = null;

function scrollMultichatTanjungPriuk(rowCount) {
    const div1 = document.getElementById("divMultichatTanjungPriuk1");
    const div2 = document.getElementById("divMultichatTanjungPriuk2");

    // Stop scrolling if rows <= 5
    if (rowCount <= 5) {
        clearInterval(scrollIntervalMultichatTanjungPriuk);
        scrollIntervalMultichatTanjungPriuk = null;
        div1.style.top = "0px";
        div2.style.top = "650px";
        return;
    }

    if (!scrollIntervalMultichatTanjungPriuk) {
        scrollIntervalMultichatTanjungPriuk = setInterval(() => {
            if (div1 && div2) {
                div1.style.top = mMultichatTanjungPriuk + "px";
                div2.style.top = nMultichatTanjungPriuk + "px";
                mMultichatTanjungPriuk--;
                nMultichatTanjungPriuk--;

                // Reset scroll position if it reaches the end
                if (mMultichatTanjungPriuk <= -650) {
                    mMultichatTanjungPriuk = 650;
                }

                if (nMultichatTanjungPriuk <= -650) {
                    nMultichatTanjungPriuk = 650;
                }
            }
        }, speedMultichatTanjungPriuk);
    }
}

async function listMultiChatTanjungPriuk() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivityPriuk", {
            method: "GET",
            headers: {
                Accept: "text/plain",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        const agents = JSON.parse(data) || [];
        const div1 = document.getElementById("divMultichatTanjungPriuk1");
        const div2 = document.getElementById("divMultichatTanjungPriuk2");
        let tableRows = "<tbody>";

        // Loop through agents and generate table rows
        agents.forEach((item) => {
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

        // Fill missing rows if less than 5
        const missingRows = 5 - agents.length;
        for (let i = 0; i < missingRows; i++) {
            tableRows += `
                <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `;
        }

        tableRows += "</tbody>";

        // Inject content into both divs for seamless scrolling
        div1.querySelector("table").innerHTML = tableRows;
        div2.querySelector("table").innerHTML = tableRows;

        const rowCount = Math.max(agents.length, 5);
        scrollMultichatTanjungPriuk(rowCount);

    } catch (error) {
        console.error("Error loading data: ", error);
    }
}


let mMultichatSoeta = 550; // Initial scroll position for divMultichatSoeta1
let nMultichatSoeta = 550; // Initial scroll position for divMultichatSoeta2
let speedMultichatSoeta = 30; // Scroll speed (adjust as needed)
let scrollIntervalMultichat = null;

function scrollMultichat(rowCount) {
  const div1 = document.getElementById("divMultichatSoeta1");
  const div2 = document.getElementById("divMultichatSoeta2");

  // Stop scrolling if rows <= 5
  if (rowCount <= 2) {
      clearInterval(scrollIntervalMultichat);
      scrollIntervalMultichat = null;
      div1.style.top = "0px";
      div2.style.top = "550px";
      return;
  }

  if (!scrollIntervalMultichat) {
      scrollIntervalMultichat = setInterval(() => {
          if (div1 && div2) {
              div1.style.top = mMultichatSoeta + "px";  // Use mMultichatSoeta
              div2.style.top = nMultichatSoeta + "px";  // Use nMultichatSoeta
              mMultichatSoeta--;
              nMultichatSoeta--;

              // Reset scroll position if it reaches the end
              if (mMultichatSoeta <= -550) {
                  mMultichatSoeta = 550;
              }

              if (nMultichatSoeta <= -550) {
                  nMultichatSoeta = 550;
              }
          }
      }, speedMultichatSoeta);
  }
}

async function listMultiChatSoetta() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivitySoetta", {
            method: "GET",
            headers: {
                Accept: "text/plain",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        const agents = JSON.parse(data) || [];
        const div1 = document.getElementById("divMultichatSoeta1");
        const div2 = document.getElementById("divMultichatSoeta2");
        let tableRows = "<tbody>";

        // Loop through agents and generate table rows
        agents.forEach((item) => {
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

        // Fill missing rows if less than 5
        const missingRows = 2 - agents.length;
        for (let i = 0; i < missingRows; i++) {
            tableRows += `
                <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `;
        }

        tableRows += "</tbody>";

        // Inject content into both divs for seamless scrolling
        div1.querySelector("table").innerHTML = tableRows;
        div2.querySelector("table").innerHTML = tableRows;

        const rowCount = Math.max(agents.length, 2);
        scrollMultichat(rowCount);

    } catch (error) {
        console.error("Error loading data: ", error);
    }
}

let mMultichatPasarBaru = 550; // Initial scroll position for divMultichatPasarBaru1
let nMultichatPasarBaru = 550; // Initial scroll position for divMultichatPasarBaru2
let speedMultichatPasarBaru = 30; // Scroll speed (adjust as needed)
let scrollIntervalMultichatPasarBaru = null;

function scrollMultichatPasarBaru(rowCount) {
  const div1 = document.getElementById("divMultichatPasarBaru1");
  const div2 = document.getElementById("divMultichatPasarBaru2");

  // Stop scrolling if rows <= 5
  if (rowCount <= 3) {
      clearInterval(scrollIntervalMultichatPasarBaru);
      scrollIntervalMultichatPasarBaru = null;
      div1.style.top = "0px";
      div2.style.top = "550px";
      return;
  }

  if (!scrollIntervalMultichatPasarBaru) {
      scrollIntervalMultichatPasarBaru = setInterval(() => {
          if (div1 && div2) {
              div1.style.top = mMultichatPasarBaru + "px";
              div2.style.top = nMultichatPasarBaru + "px";
              mMultichatPasarBaru--;
              nMultichatPasarBaru--;

              // Reset scroll position if it reaches the end
              if (mMultichatPasarBaru <= -550) {
                  mMultichatPasarBaru = 550;
              }

              if (nMultichatPasarBaru <= -550) {
                  nMultichatPasarBaru = 550;
              }
          }
      }, speedMultichatPasarBaru);
  }
}

async function listMultiChatPasarBaru() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DataFromDK/DataAgentActivityPasarBaru", {
            method: "GET",
            headers: {
                Accept: "text/plain",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        const agents = JSON.parse(data) || [];
        const div1 = document.getElementById("divMultichatPasarBaru1");
        const div2 = document.getElementById("divMultichatPasarBaru2");
        let tableRows = "<tbody>";

        // Loop through agents and generate table rows
        agents.forEach((item) => {
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

        // Fill missing rows if less than 5
        const missingRows = 3 - agents.length;
        for (let i = 0; i < missingRows; i++) {
            tableRows += `
                <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `;
        }

        tableRows += "</tbody>";

        // Inject content into both divs for seamless scrolling
        div1.querySelector("table").innerHTML = tableRows;
        div2.querySelector("table").innerHTML = tableRows;

        const rowCount = Math.max(agents.length, 3);
        scrollMultichatPasarBaru(rowCount);

    } catch (error) {
        console.error("Error loading data: ", error);
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
