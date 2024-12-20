function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var myVarX;
var myVarY;
function myFunction() {
	
	 myVarY = setInterval(AutoCall, 80000);
	
   
  
   //chartPie();
	
}
function AutoCall(){
    
   getDateTime();
   getData();
   getDataAvaya();
   barchart();
   ChartServiceVolumeChannel();
   LineChart();
   LineChart2();
}

function getDataAvaya() {
    $.getJSON("PHP/RealTime.php", function(data) {
        console.log(data);

        const splitSkills = data.Head["Split Skill"];
        const informasi = data.Head.Informasi;
        const pengaduan = data.Head.Pengaduan;
        const Priok = data.Head["CC Priok"];
        const PsBaru = data.Head["CC Ps Baru"];
        const Soetta = data.Head["CC Soetta"];

        if (Array.isArray(splitSkills) && Array.isArray(informasi) && Array.isArray(pengaduan) && Array.isArray(Priok) && Array.isArray(PsBaru) && Array.isArray(Soetta)) {
            if (splitSkills.length === informasi.length && splitSkills.length === pengaduan.length) {
                // Combine skills, informasi, and pengaduan into an array of objects
                const combinedData = splitSkills.map((skill, index) => ({
                    skill: skill,
                    value: informasi[index],
                    pengaduan: pengaduan[index],
                    PsBaru: PsBaru[index],
                    Soetta: Soetta[index],
                    Priok: Priok[index]
                }));

                // Process combined data
                combinedData.forEach(item => {
                    switch (item.skill) {
                        case " Ans Calls":
                            const ansPusatValue = Number(item.value) + Number(item.pengaduan);
                            const ansTpValue = Number(item.Priok);
                            const ansSoettaValue = Number(item.Soetta);
                            const ansPbValue = Number(item.PsBaru);

                            // Update values
                            $('#ansPusat').html(ansPusatValue);
                            $('#ansTp').html(ansTpValue);
                            $('#ansSoetta').html(ansSoettaValue);
                            $('#ansPb').html(ansPbValue);

                            // Set colors based on values directly using if-else
                            // Pusat
                            if (ansPusatValue === 100) {
                                $('#ansPusat').addClass('color-biru');
                            } else if (ansPusatValue >= 71) {
                                $('#ansPusat').addClass('color-hijau');
                            } else if (ansPusatValue >= 51) {
                                $('#ansPusat').addClass('color-kuning');
                            } else if (ansPusatValue > 0) {
                                $('#ansPusat').addClass('color-merah');
                            } else {
                                $('#ansPusat').removeClass('color-merah color-kuning color-hijau color-biru');
                            }

                            // Tanjung Priok
                            if (ansTpValue === 100) {
                                $('#ansTp').addClass('color-biru');
                            } else if (ansTpValue >= 71) {
                                $('#ansTp').addClass('color-hijau');
                            } else if (ansTpValue >= 51) {
                                $('#ansTp').addClass('color-kuning');
                            } else if (ansTpValue > 0) {
                                $('#ansTp').addClass('color-merah');
                            } else {
                                $('#ansTp').removeClass('color-merah color-kuning color-hijau color-biru');
                            }

                            // Soekarno-Hatta
                            if (ansSoettaValue === 100) {
                                $('#ansSoetta').addClass('color-biru');
                            } else if (ansSoettaValue >= 71) {
                                $('#ansSoetta').addClass('color-hijau');
                            } else if (ansSoettaValue >= 51) {
                                $('#ansSoetta').addClass('color-kuning');
                            } else if (ansSoettaValue > 0) {
                                $('#ansSoetta').addClass('color-merah');
                            } else {
                                $('#ansSoetta').removeClass('color-merah color-kuning color-hijau color-biru');
                            }

                            // Pasar Baru
                            if (ansPbValue === 100) {
                                $('#ansPb').addClass('color-biru');
                            } else if (ansPbValue >= 71) {
                                $('#ansPb').addClass('color-hijau');
                            } else if (ansPbValue >= 51) {
                                $('#ansPb').addClass('color-kuning');
                            } else if (ansPbValue > 0) {
                                $('#ansPb').addClass('color-merah');
                            } else {
                                $('#ansPb').removeClass('color-merah color-kuning color-hijau color-biru');
                            }

                            break;

                        default:
                            // Handle any other cases if necessary
                    }
                });
            }
        }
    });
}

async function LineChart2() {
    var callData = [];
    var EmailData = [];
    var LcData = [];
    var SosmedData = [];
    var days = [];
    
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/ContactCenterReport/TotalVolumeChannelPerweek", {
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
            days.push(item.hari);
            if (item.name === "Call")
                callData.push(item.jumlah);
            if (item.name === "Email")
                EmailData.push(item.jumlah);
            if (item.name === "LiveChat")
                LcData.push(item.jumlah);
            if (item.name === "SosialMedia")
                SosmedData.push(item.jumlah);
        });

        const options = {
            chart: {
                type: 'line',
                height: 320,
                width: '100%',
                toolbar: {
                    show: false
                },
                offsetY: -30
            },
            series: [
                {
                    name: 'Call',
                    data: callData
                },
                {
                    name: 'Email',
                    data: EmailData
                },
				 {
                    name: 'Live Chat',
                    data: LcData
                },
				{
                    name: 'Sosial Media',
                    data: SosmedData
                }
            ],
            xaxis: {
                categories: days,
                labels: {
                    style: {
                        colors: '#FFFFFF', // Teks sumbu X berwarna putih
                        fontSize: '12px'
                    },
                    rotate: 0 // Label tidak miring
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#FFFFFF', // Teks sumbu Y berwarna putih
                        fontSize: '12px'
                    }
                }
            },
            stroke: {
                curve: 'smooth'
            },
            markers: {
                size: 5
            },
            tooltip: {
                shared: true,
                intersect: false,
                theme: 'dark' // Tooltip dengan tema gelap
            },
            colors: ['#e65055', '#f08f2e', '#009945', '#00a6e1'],
            legend: {
                show: false, // Hide the legend generated by JavaScript
                labels: {
                    colors: ['#FFFFFF'], // Teks pada legend berwarna putih
                    useSeriesColors: false
                }
            }
        };

        document.querySelector("#line-chart2").innerHTML = '';
        var chart = new ApexCharts(document.querySelector("#line-chart2"), options);
        chart.render();
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// async function LineChart(){
//     var lastweek=[];
//     var currentWeek=[];
   
//    var jqxhr = $.getJSON("PHP/CallPerformances_daily.php", function(data) {               
//                  console.log(data.DataDetail);
//                 $.each(data.DataDetail, function(index, metric) {
                    
//                        if (index >= 0 && index <= 6) {
//                            lastweek.push(metric["ACD Calls"]);
//                        } else {
//                            currentWeek.push(metric["ACD Calls"]);
//                        }
                            
//                    // $('#totals-table tbody').append(`<tr><td>${metric}</td><td>${data.Totals[index]}</td></tr>`);
//                });
                
//                var options = {
//                 chart: {
//                     height: 350,
//                     type: 'line',
//                     toolbar: {
//                         show: false
//                     },
//                     offsetY: -30  // Adjust the vertical offset for the entire chart
//                 },
//                 series: [
//                     {
//                         name: 'Last week',
//                         data: lastweek
//                     },
//                     {
//                         name: 'Current week',
//                         data: currentWeek
//                     }
//                 ],
//                 xaxis: {
//                     categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//                     labels: {
//                         style: {
//                             colors: '#FFFFFF'
//                         }
//                     }
//                 },
//                 colors: ['#007A00', '#164FEB'],
//                 legend: {
//                     position: 'bottom', // Memindahkan legend ke bawah
//                     horizontalAlign: 'center',
//                     labels: {
//                         colors: '#FFFFFF' // Mengubah warna teks legend menjadi putih
//                     }
//                 },
//                 dataLabels: {
//                     enabled: true
//                 },
//                 stroke: {
//                     curve: 'smooth'
//                 },
//                 tooltip: {
//                     shared: true,
//                     intersect: false
//                 },
//                 title: {
//                     text: '',  // Keep text empty if unused
//                     align: 'center',
//                     margin: 0  // Reduce top margin if a title is not needed
//                 },
//                 subtitle: {
//                     text: '',
//                     align: 'center',
//                     margin: 0
//                 }
//             };
            

//        // Create and render the chart
//        document.querySelector("#line-chart").innerHTML = '';
//        var chart = new ApexCharts(document.querySelector("#line-chart"), options);
//        chart.render();

//    });
                         
// }

async function LineChart() {
    var Pusat = [];
    var PasarBaru = [];
    var Soetta = [];
    var TanjungPriuk = [];
    var days = [];
    
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/ContactCenterReport/TotalVolumeSitePerweek", {
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
            days.push(item.hari);
            if(item.name === "Pusat")
                Pusat.push(item.jumlah);
            if(item.name === "Tanjung Priok")
                TanjungPriuk.push(item.jumlah);
            if(item.name === "Soekarno Hatta")
                Soetta.push(item.jumlah);
            if(item.name === "Pasar Baru")
                PasarBaru.push(item.jumlah);
        });

        const options = {
            chart: {
                type: 'line',
                height: 320,
                width: '100%',
                toolbar: {
                    show: false
                },
                offsetY: -30
            },
            series: [
                { name: 'Pusat', data: Pusat },
                { name: 'Tj.Priuk', data: TanjungPriuk },
                { name: 'Soetta', data: Soetta },
                { name: 'Pasar Baru', data: PasarBaru }
            ],
            xaxis: {
                categories: days,
                labels: {
                    style: {
                        colors: '#FFFFFF',
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#FFFFFF',
                        fontSize: '12px'
                    }
                }
            },
            stroke: {
                curve: 'smooth'
            },
            markers: {
                size: 5
            },
            tooltip: {
                theme: 'dark'
            },
            colors: ['#e65055', '#f08f2e', '#00a6e1', '#009945'],
            legend: {
                show: false, // Hide the legend generated by JavaScript
                labels: {
                    colors: '#FFFFFF',
                    useSeriesColors: false
                }
            },
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            width: '100%',
                            height: 300
                        },
                    },
                },
            ],
        };        
        document.querySelector("#line-chart").innerHTML = '';
        var chart = new ApexCharts(document.querySelector("#line-chart"), options);
        chart.render();

    } catch (error) {
        console.error("An error occurred:", error);
    }
}


function getDateTime() {
  var today = new Date();
  let hours = today.getHours(); // get hours
  let minutes = today.getMinutes(); // get minutes
  let seconds = today.getSeconds(); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  var time = hours + ":" + minutes + ":" + seconds;
  var today = new Date();
  var dateNya = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNya + ' ' + time;
  var divTimenya = $('#timeNya');
  var divDateNya = $('#dateNya');

  var months = new Array(12);
  months[0] = "January";
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

  var current_date = new Date();
  current_date.setDate(current_date.getDate() + 0);
  month_value = current_date.getMonth();
  day_value = current_date.getDate();
  year_value = current_date.getFullYear();
  divTimenya.empty();
  divTimenya.append(time);
  divDateNya.empty();
  divDateNya.append(months[month_value] + " " + day_value + ", " + year_value);
  //divDateNya.append('September' + " " + '27' + ", " + '2024');
}



async  function getData() {
     try {
		 
		 
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/ContactCenterReport/GetTotalServicesAlllSite", {
            method: "GET",
            headers: {
                'Accept': 'text/plain' // Setting the accept header
            }
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text(); // Using text() since accept is text/plain
		 console.log(data);
		
		
		
		var json = JSON.parse(data);
          var i;
          console.log(json);
		  var pusat=0;
		  var tanjungPriuk=0;
		  var TotalSoeta=0;
		  var TotalPb=0;
          for (i = 0; i < json.length; i++) {
				
                if (json[i].jenis == "Pusat"){
					pusat=json[i].jumlah;
					  $('#TotalPusat').html(json[i].jumlah);
				}
					
				  if (json[i].jenis == "Tanjung Priok"){
					  $('#TotalTp').html(json[i].jumlah);
					  tanjungPriuk=json[i].jumlah;
					  
				  }
					  
				   if (json[i].jenis == "Soekarno Hatta"){
					   $('#TotalSoeta').html(json[i].jumlah);
					   TotalSoeta=json[i].jumlah;
				   }
					  
				   if (json[i].jenis == "Pasar Baru"){
					   $('#TotalPb').html(json[i].jumlah);
					   TotalPb=json[i].jumlah;
					   
				   }
					  
				
		 }

         //ChartServiceVolumeSite(number($('#TotalPusat').html()),number($('#TotalTp').html()),number($('#TotalSoeta').html()), number($('#TotalPb').html()))
         ChartServiceVolumeSite(Number(pusat),Number(tanjungPriuk),Number(TotalSoeta),Number(TotalPb))
	 

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function ChartServiceVolumeSite(pusat, Tp, Soeta, Pb) {
    var options = {
      chart: {
        type: 'pie',
        height: '90%',
        dropShadow: {
          enabled: false,
        },
        padding: {
          top: 0,
          bottom: 0,
        },
      },
      series: [pusat, Tp, Soeta, Pb],
      labels: ['Pusat', 'Tj.Priok', 'Soetta', 'Pos Pasbar'],
      colors: ['#e65055', '#f08f2e', '#00a6e1', '#009945'],
      legend: {
        show: false, // Nonaktifkan legenda bawaan
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offsetY: -5,
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: '100%',
            },
          },
        },
      ],
    };
  
    document.querySelector("#chart1").innerHTML = '';
    var chart = new ApexCharts(document.querySelector("#chart1"), options);
    chart.render();
  }
  
  
async function ChartServiceVolumeChannel() {
    const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/ContactCenterReport/TotalVolumeChannel", {
        method: "GET",
        headers: {
            'Accept': 'text/plain' // Setting the accept header
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text(); // Using text() since accept is text/plain
    console.log(data);

    var json = JSON.parse(data);
    var totCall = 0;
    var totEmail = 0;
    var totLc = 0;
    var totSm = 0;
    
    for (let i = 0; i < json.length; i++) {
        if (json[i].jenis == "Call") totCall = json[i].jumlah;
        if (json[i].jenis == "Email") totEmail = json[i].jumlah;
        if (json[i].jenis == "Live Chat") totLc = json[i].jumlah;
        if (json[i].jenis == "Social Media") totSm = json[i].jumlah;
    }

    var options = {
        chart: {
            height: '90%',
            type: 'pie',
        },
        series: [totCall, totEmail, totLc, totSm],
        labels: ['Call', 'Email', 'LiveChat', 'Sosial Media'],
        colors: ['#e65055', '#f08f2e', '#009945', '#00a6e1'],
        legend: {
            show: false, // Nonaktifkan legenda bawaan
          },
        dataLabels: {
            style: {
                colors: ['#ffffff'] // Mengubah warna teks pada data menjadi putih
            }
        }
    };

    document.querySelector("#chart2").innerHTML = '';
    var chart = new ApexCharts(document.querySelector("#chart2"), options);
    chart.render();
}

async function barchart() {
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataWbByList?type=ListTop10", {
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
        var categories = [];
        var _data = [];
        var json = JSON.parse(data);

        for (let i = 0; i < json.length; i++) {
            categories.push(json[i].jenis);
            _data.push(json[i].jumlah);
        }

        const options = {
            chart: {
                type: 'bar',
                height: 500,
                background: 'transparent', // Membuat background chart transparan
                toolbar: {
					show: false
				}
            },
            theme: {
                mode: 'dark'
            },
            series: [{
                name: '',
                data: _data
            }],
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                labels: {
                    colors: ['#ffffff'] // Warna teks legend menjadi putih
                }
            },
            xaxis: {
                categories: categories,
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#ffffff' // Warna teks x-axis menjadi putih
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        color: '#ffffff' // Warna teks y-axis menjadi putih
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: '15%',
                    endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    colors: ['#ffffff'] // Warna teks pada data label menjadi putih
                }
            },
            stroke: {
                show: true,
                width: 2
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                shared: true,
                intersect: false
            }
        };

        document.querySelector("#barchart1").innerHTML = '';
        const chart = new ApexCharts(document.querySelector("#barchart1"), options);
        chart.render();

    } catch (error) {
        console.error("An error occurred:", error);
    }
}


    function convertSeconds(seconds) {
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= (24 * 3600);
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
				
				 
