function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var myVarY;

function myFunction() {
  myVarY = setInterval(AutoCall, 10000);
}

// ===================== MAPPING STATUS =====================

function mapStatusAux(status) {
  if (!status) return { text: "-", class: "status-other" };

  const s = status.toLowerCase();

  if (s.includes("ready") || s.includes("available"))
    return { text: status, class: "status-available" };
  if (s.includes("acd")) return { text: status, class: "status-acd" };
  if (s.includes("acw")) return { text: status, class: "status-acw" };
  if (s.includes("istirahat")) return { text: status, class: "status-istirahat" };
  if (s.includes("toilet")) return { text: status, class: "status-toilet" };
  if (s.includes("makan")) return { text: status, class: "status-makan" };
  if (s.includes("ring")) return { text: status, class: "status-ringing" };

  return { text: status, class: "status-other" };
}

// ===================== RENDER TABLE =====================

const marqueeState = {};

function injectTable(data, id) {
  const tbody = document.getElementById(id);
  if (!tbody) return;

  let html = "";

  data.forEach((d) => {
    html += `
      <tr>
        <td>${d.nama}</td>
        <td>${d.kodeJadwal}</td>
        <td>${d.sesi}</td>
        <td>${d.lastLogin}</td>
        <td>${d.login}</td>
        <td><span class="${d.auxClass}">${d.auxText}</span></td>
        <td>${d.site}</td>
      </tr>
    `;
  });

  // fill "-"
  if (data.length < 5) {
    const sisa = 5 - data.length;

    for (let i = 0; i < sisa; i++) {
      html += `
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      `;
    }
  }

  tbody.dataset.original = html;

  if (!tbody.dataset.initialized) {
    tbody.innerHTML = html;
    tbody.dataset.initialized = "true";
  } else {
    updateTableSmooth(tbody, html);
  }

  if (data.length > 5) {
    smoothMarquee(id);
  } else {
    stopMarquee(id);
  }
}

function updateTableSmooth(tbody, newHtml) {
  // simpan posisi scroll lama
  const id = tbody.id;
  const state = marqueeState[id];

  // simpan posisi pixel saat ini
  let currentPos = state ? state.position : 0;

  // update isi TANPA reset transform
  tbody.dataset.original = newHtml;

  if (tbody.dataset.cloned) {
    tbody.innerHTML = newHtml + newHtml;
  } else {
    tbody.innerHTML = newHtml;
  }

  if (state) {
    tbody.style.transform = `translateY(-${currentPos}px)`;
  }

  const half = tbody.scrollHeight / 2;

  if (state && state.position >= half) {
    state.position = 0;
  }
}

// ===================== SMOOTH MARQUEE =====================

function smoothMarquee(tbodyId, speed = 0.4) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  const container = tbody.closest(".scrollable-table");
  if (!container) return;

  if (!marqueeState[tbodyId]) {
    marqueeState[tbodyId] = {
      position: 0,
      running: false,
    };
  }

  const state = marqueeState[tbodyId];

  if (state.running) return;
  state.running = true;

  if (!tbody.dataset.cloned || tbody.dataset.forceReclone === "true") {
    const original = tbody.dataset.original || tbody.innerHTML;
    tbody.innerHTML = original + original;
    tbody.dataset.cloned = "true";
  }

  let isPaused = false;

  function animate() {
    if (!isPaused) {
      state.position += speed;

      tbody.style.transform = `translateY(-${state.position}px)`;

      const half = tbody.scrollHeight / 2;
      if (state.position >= half) {
        state.position = 0;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  if (!state.position) {
    state.position = 0;
  }
  container.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  container.addEventListener("mouseleave", () => {
    isPaused = false;
  });
}

// ===================== RESET MARQUEE =====================

function resetMarquee(tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  // hanya jalankan marquee kalau belum jalan
  smoothMarquee(tbodyId);
}

function stopMarquee(tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  tbody.style.transform = "translateY(0)";

  if (tbody.dataset.original) {
    tbody.innerHTML = tbody.dataset.original;
  }

  tbody.dataset.cloned = "";

  if (marqueeState[tbodyId]) {
    marqueeState[tbodyId].running = false;
    marqueeState[tbodyId].position = 0;
  }
}

// ===================== API CALL =====================
function AutoCall() {
  const username = $("#hd_sessionLogin").val() || "Admin";

  $.ajax({
    type: "POST",
    url: "/wallboardbc/main-darkback/AutoCallProxy.asmx/GetAutoCall",
    data: JSON.stringify({ username: username }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",

    // beforeSend: function () {
    //   $("#table-body").html("<tr><td colspan='4'>-</td></tr>");
    // },

    success: function (response) {
      try {
        let raw = response.d;

        if (raw.startsWith("{")) {
          raw = JSON.parse(raw).d;
        }

        if (!raw || !raw.trim().startsWith("[")) {
          console.error("Invalid response:", raw);
          return;
        }

        const data = JSON.parse(raw);

        // ===================== MAPPING =====================
        const mapped = data.map((item) => {
          let aux;

          if (item.StatusLogin && item.StatusLogin.toLowerCase() === "logout") {
            aux = { text: "Offline", class: "status-other" };
          } else {
            aux = mapStatusAux(item.StatusAUX);
          }
        
          return {
            nama: item.AgentName,
            kodeJadwal: item.KodeJadwal,
            sesi: item.Sesi,
          
            lastLogin:
              String(item.LastLoginTime.Hours).padStart(2, "0") + ":" +
              String(item.LastLoginTime.Minutes).padStart(2, "0") + ":" +
              String(item.LastLoginTime.Seconds).padStart(2, "0"),
          
            // statusKetepatan: item.StatusKetepatan,
          
            login: item.StatusLogin,
            auxText: aux.text,
            auxClass: aux.class,
            site: item.Site,
            channel: item.Channel,
          };
        });

        // ===================== FILTER =====================
        const callData = mapped.filter(
          (x) => x.channel && x.channel.toLowerCase() === "call",
        );

        const multichatData = mapped.filter(
          (x) => x.channel && x.channel.toLowerCase() === "multichat",
        );

        const emailData = mapped.filter(
          (x) => x.channel && x.channel.toLowerCase() === "email",
        );

        const sosmedData = mapped.filter(
          (x) => x.channel && x.channel.toLowerCase().includes("social"),
        );

        // ===================== RENDER =====================
        injectTable(callData, "table-body");
        injectTable(multichatData, "multichat-body");
        injectTable(emailData, "table-body-email");
        injectTable(sosmedData, "sosmed-body");
      } catch (err) {
        console.error("Parsing error:", err);
      }
    },

    error: function (xhr) {
      console.error("AJAX Error:", xhr.responseText);
      $("#table-body").html("<tr><td colspan='4'>Request Error</td></tr>");
    },
  });
}

// ===================== DATE TIME =====================

function updateDateTime() {
  const now = new Date();

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const day = days[now.getDay()];

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
  const month = months[now.getMonth()];

  const date = now.getDate();
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  document.querySelector(".date-time-text").textContent =
    `${day} | ${date} ${month} ${year} | ${hours}:${minutes}:${seconds}`;
}

setInterval(updateDateTime, 1000);

// ===================== INIT =====================

document.addEventListener("DOMContentLoaded", function () {
  AutoCall(); // load pertama
  myFunction(); // refresh tiap 10 detik
  updateDateTime();
});
