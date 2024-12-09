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
  // getGreeting();

  //ListAgent();
  // ListAgentSoetta();
  // ListAgentTanjungPriok();
  getDataEmail();
  getDataDk();
  lineChart();
}

async function lineChart(){
	
	  var ctx = document.getElementById('socialMediaTrend').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          datasets: [{
            label: 'Facebook',
            borderColor: '#21a1ff',
            data: [10, 20, 15, 30, 25, 40, 35, 50, 45, 60]
          }, {
            label: 'Instagram',
            borderColor: '#ff4d4d',
            data: [5, 15, 10, 20, 15, 30, 25, 40, 35, 50]
          }, {
            label: 'X',
            borderColor: '#ffb84d',
            data: [2, 12, 8, 18, 14, 28, 22, 36, 30, 44]
          }, {
            label: 'Whatsapp',
            borderColor: '#21ff4d',
            data: [8, 18, 12, 22, 18, 32, 28, 42, 38, 52]
          }]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
	
}
async function getDataEmail() {
  try {
    const response = await fetch(
      "http://10.216.206.10/apiDataBravoWb/api/DigitalPerformance/GetDataDigitalEmail",
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
    console.log(data);

    let json = JSON.parse(data);

    let emailInbox = 0;
    let emailHandling = 0;
    let emailQueueing = 0;
    let emailReviewing = 0;
    let emailRejected = 0;
    let emailSend = 0;

    let totalInboxTime = 100;

    // Iterasi setiap item dalam data
    json.forEach((item) => {
      if (item.jenis === "inbox") {
        emailInbox = item.jumlah;
        $("#emailInbox").html(emailInbox);
      }
      if (item.jenis === "handling") {
        emailHandling = item.jumlah;
        $("#emailHandling").html(emailHandling);
      }
      if (item.jenis === "QueueEmail") {
        emailQueueing = item.jumlah;
        $("#emailQueueing").html(emailQueueing);
      }
      if (item.jenis === "AnsweredEmail") {
        emailReviewing = item.jumlah;
        $("#emailReviewing").html(emailReviewing);
      }
      if (item.jenis === "Reject") {
        emailRejected = item.jumlah;
        $("#emailRejected").html(emailRejected);
      }
      if (item.jenis === "Send") {
        emailSend = item.jumlah;
        $("#emailSend").html(emailSend);
      }
    });

    if (emailInbox > 0 && emailReviewing > 0) {
      var avrEmailResponseTime = (emailReviewing / emailInbox) * totalInboxTime;
      $("#emailResponseTime").html(formatTime(avrEmailResponseTime));
    }

    if (emailInbox > 0 && emailHandling > 0) {
      var avrEmailHandlingTime = (emailHandling / emailInbox) * totalInboxTime;
      $("#emailHandlingTime").html(formatTime(avrEmailHandlingTime));
    }

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getDataDk() {
  try {
    const response = await fetch(
      "http://10.216.206.10/apiDataBravoWb/api/DataFromDK/TotalDataDKPusat",
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
    console.log(data);

    let json = JSON.parse(data);

    let emailInbox = 0;
    let emailHandling = 0;
    let emailQueueing = 0;
    let emailReviewing = 0;
    let emailRejected = 0;
    let emailSend = 0;

    let totalInboxTime = 100;

			json.forEach((item, index) => {
				
			 	   $('#incomingLiveChat').html(item["totaLInChat"])
			 	   $('#handlingLiveChat').html(item["handlingLiveChat"])
			 	   $('#answerLiveChat').html(item["totalAns"])
			 	   $('#queueingLiveChat').html(item["totalQueue"])
			 	   $('#abandonedLiveChat').html(item["totalAbn"])
			 	   $('#waSosMed').html(item["totalWa"])
			 	   $('#fbSosMed').html(item["totalFb"])
			 	   $('#igSosMed').html(item["totalIg"])
			 	   $('#xSosMed').html('0')
			   
			});

        var avrLcHandlingTime = (parseInt($('#answerLiveChat').html()) / parseInt($('#incomingLiveChat').html())) * totalInboxTime;
        $("#waitingTimeLiveChat").html(formatTime(avrLcHandlingTime));
        
        var avrLcConversation = (parseInt($('#handlingLiveChat').html()) / parseInt($('#incomingLiveChat').html())) * totalInboxTime;
        $("#averageLiveChat").html(formatTime(avrLcConversation));

  } catch (error) {
    console.error("An error occurred:", error);
  }
}


function formatTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = Math.floor(minutes % 60);

  let formattedHours = hours < 10 ? '0' + hours : hours;
  let formattedMinutes = mins < 10 ? '0' + mins : mins;

  return `${formattedHours}:${formattedMinutes}`;
}


// async function getDataEmail(){

// try {
// const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DigitalPerformance/GetDataDigitalEmail", {
// method: "GET",
// headers: {
// 'Accept': 'text/plain' // Setting the accept header
// }
// });

// // Check if the response is okay
// if (!response.ok) {
// throw new Error(`HTTP error! Status: ${response.status}`);
// }

// const data = await response.text(); // Using text() since accept is text/plain
// console.log(data);

// var json = JSON.parse(data);

// var table = '<table class="table table-dark table-striped">';
// table += '<tr>' +
// '<th>Nama Agent</th>' +
// '<th>Status</th>' +
// '<th>Now Handle</th>' +
// '<th>Emails</th>' +
// '</tr>';

// var table2 = '<table class="table table-dark table-striped">';
// table2 += '<tr>' +
// '<th>Nama Agent</th>' +
// '<th>Status</th>' +
// '<th>Now Handle</th>' +
// '<th>Emails</th>' +
// '</tr>';

// //sconst agents = JSON.parse(data);
// json.forEach(items => {

// if(items["sideId"] == "Soekarno Hatta"){

// table += '<tr>';
// table += '<td>' + items["name"] + '</td>';
// table += '<td>' + items["loginTime"] + '</td>';
// table += '<td>' + items["handleTime"] + '</td>';
// table += '<td>' + items["status"] + '</td>';
// }

// if(items["sideId"] == "Pasar Baru"){

// table2 += '<tr>';
// table2 += '<td>' + items["name"] + '</td>';
// table2 += '<td>' + items["loginTime"] + '</td>';
// table2 += '<td>' + items["handleTime"] + '</td>';
// table2 += '<td>' + items["status"] + '</td>';
// }

// });

// table += '</table>';

// table2 += '</table>';
// $('#listEailSoetta').html(table);
// $('#ListEmailPasarBaru').html(table);

// } catch (error) {
// console.error("An error occurred:", error);
// }

// }

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
  //divDateNya.append('September' + " " + '27' + ", " + '2024');
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
