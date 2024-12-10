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
  myVarx = setInterval(RefreshTime, 1000);
  myVarY = setInterval(AutoCall, 8000);
   lineChart();

  //chartPie();
}
function RefreshTime() {
	 getDateTime();

}
function AutoCall() {
 
  // getGreeting();

  //ListAgent();
  // ListAgentSoetta();
  // ListAgentTanjungPriok();
  getDataEmail();
  getDataDk();
 
}

async function lineChart(){
	
	
	
	 var Fb = [];
    var Ig = [];
    var x = [];
    var Wa = [];
    var bulan = [];
    
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DataFromDK/TotalDataDKPusatPerMonth", {
            method: "GET",
            headers: {
                'Accept': 'text/plain'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        console.log(data);
        
        var json = JSON.parse(data);

        json.forEach(item => {
            bulan.push(item.bulan);
           
                Fb.push(item.totalFb);
                Ig.push(item.totalIg);
                Wa.push(item.totalWa);
                x.push(item.totaLx);
        });

       
	  var ctx = document.getElementById('socialMediaTrend').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: bulan,
          datasets: [{
            label: 'Facebook',
            borderColor: '#21a1ff',
            data: Fb
          }, {
            label: 'Instagram',
            borderColor: '#ff4d4d',
            data: Ig
          }, {
            label: 'X',
            borderColor: '#ffb84d',
            data: x
          }, {
            label: 'Whatsapp',
            borderColor: '#21ff4d',
            data: Wa
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
	  } catch (error) {
        console.error("An error occurred:", error);
    } 
	
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
	  
	  if (item.jenis === "avg_Response_Time") {
         $("#emailResponseTime").html(formatTime(item.jumlah));
       
      }
	  if (item.jenis === "aht") {
         $("#emailHandlingTime").html(formatTime(item.jumlah));
       
      }
	  
    });

    

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
			 	   $('#handlingLiveChat').html(item["totalHandling"])
			 	   $('#answerLiveChat').html(item["totalAns"])
			 	   $('#queueingLiveChat').html(item["totalQueue"])
			 	   $('#abandonedLiveChat').html(item["totalAbn"])
			 	   $('#waSosMed').html(item["totalWa"])
			 	   $('#fbSosMed').html(item["totalFb"])
			 	   $('#igSosMed').html(item["totalIg"])
			 	   $('#xSosMed').html('0')
			 	   $('#otherLc').html(item["totalOther"])
				   $("#waitingTimeLiveChat").html(item["avgChatTime"]);
				   $("#averageLiveChat").html(item["avgConverChatTime"]);
			   
			});
			
	    
      

  } catch (error) {
    console.error("An error occurred:", error);
  }
}


function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600); // Get the hours
  let minutes = Math.floor((seconds % 3600) / 60); // Get the minutes
  let remainingSeconds = seconds % 60;    // Get the remaining seconds

  // Format the hours, minutes, and seconds with leading zeroes if necessary
  let formattedHours = hours < 10 ? '0' + hours : hours;
  let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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