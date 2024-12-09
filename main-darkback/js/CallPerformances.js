function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var myVarX;

function myFunction() {
	myVarX = setInterval(GetTimeAutomatic, 1000);
	myVary = setInterval(GetDataAutomatic, 10000);
	last5month();
    LineChart();

   
   //chartPie();
	
}
function GetTimeAutomatic(){
	getDateTime();
	getGreeting();
	
}
function GetDataAutomatic(){
     
   getData();
	barchart();
	
}




function getGreeting() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();

        // Determine the greeting based on the time range
        if (hours < 10 || (hours === 10 && minutes === 0)) {
            $('#Greeting').html("Good Morning");
        } else if (hours < 14 || (hours === 14 && minutes === 0)) {
			$('#Greeting').html("Good Afternoon")
           
        } else {
			$('#Greeting').html("Good Evening")
            
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
  var time = hours + ":" + minutes + " WIB"
  var today = new Date();
  var dateNya = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNya + ' ' + time;
  
  // Good
															// Morn/After/Even and Have a Nice Day // Good
															// Morn/After/Even and Have a Nice Day
  //var divTimenya = $('#timeNya');
  var divDateNya = $('#dateNya');

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
  
 
     
  
  
  divDateNya.empty();
  //divDateNya.append( hari[current_date.getDay()] +" | "+day_value + " " +  months[month_value]  + " " + year_value +" | " + time );
  divDateNya.append( hari[current_date.getDay()] +" | "+day_value + " " +  months[month_value]  + " " + year_value +" | " + time );
  //divDateNya.append( 'September' + " " + '27' + ", " + '2024' );
  
  
     
}

async function LineChart() {
    var lastweek = [];
    var currentWeek = [];
    
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWeeklylHistory", {
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

        json.forEach((item, index) => {
            if (index >= 0 && index <= 6) {
                lastweek.push(item["answer"]);
            } else {
                currentWeek.push(item["answer"]);
            }
        });

        const options = {
            chart: {
                height: 370,
                type: 'line' // Jenis chart tetap "line"
            },
            series: [
                {
                    name: 'Last week',
                    data: lastweek // Data minggu lalu
                },
                {
                    name: 'Current week',
                    data: currentWeek // Data minggu ini
                }
            ],
            xaxis: {
                categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Kategori sumbu X
                labels: {
                    style: {
                        colors: '#FFFFFF', // Warna teks sumbu X putih
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#FFFFFF', // Warna teks sumbu Y putih
                        fontSize: '12px'
                    }
                }
            },
            colors: ['#007A00', '#164FEB'], // Warna garis
            title: {
                text: '',
                style: {
                    color: '#FFFFFF' // Warna teks judul putih
                }
            },
            dataLabels: {
                enabled: true, // Tampilkan label data
                style: {
                    colors: ['#000'] // Warna label data putih
                }
            },
            stroke: {
                curve: 'smooth' // Gaya garis halus
            },
            tooltip: {
                shared: true, // Tooltip ditampilkan bersamaan
                intersect: false,
                theme: 'dark' // Tema tooltip gelap
            },
            legend: {
                labels: {
                    colors: ['#FFFFFF'], // Warna teks legend putih
                    useSeriesColors: false
                }
            }
        };

        document.querySelector("#line-chart").innerHTML = ''; // Reset elemen chart sebelum render
        var chart = new ApexCharts(document.querySelector("#line-chart"), options); // Buat chart baru
        chart.render(); // Render chart
        
    } catch (error) {
        console.error("An error occurred:", error); // Tampilkan pesan error jika ada
    }
}

async function barchart(){
  // Retrieve data from local storage under the key 'user'
  var datajson=[];
  var categories=[];
   try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetDailyCallHistory", {
            method: "GET",
            headers: {
                'Accept': 'text/plain' // Setting the accept header
            }
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
		
		 const chartData = [
			  { name: 'Answered Calls', data: [] },
			  { name: 'Abandoned Calls', data: [] },
			  { name: 'Resolved Calls', data: [] }
			];

        const data = await response.text(); // Using text() since accept is text/plain
		 console.log(data);
		 var json = JSON.parse(data);
		
		 
		

			json.forEach(day => {
				categories.push(day.hari);
			  chartData[0].data.push(day.answer);     // Add 'answer' values to "Answered Calls"
			  chartData[1].data.push(day.abandon);    // Add 'abandon' values to "Abandoned Calls"
			  chartData[2].data.push(day.resolved);   // Add 'resolved' values to "Resolved Calls"
			});
			console.log(categories);
			console.log(chartData);
		 
      var options = {
			// series: [{
				// name: 'received calls',
				// data: [44, 55, 57, 56, 61, 58, 63, 60, 66]  // data for received calls
			// }, {
				// name: 'answered calls',
				// data: [76, 85, 101, 98, 87, 105, 91, 114, 94]  // data for answered calls
			// }, {
				// name: 'abandoned calls',
				// data: [35, 41, 36, 26, 45, 48, 52, 53, 41]  // data for abandoned calls
			// }],
			series:chartData,
			chart: {
				type: 'bar',
				height: 330,
				toolbar: {
					show: false
				}
			},
			plotoptions: {
				bar: {
					horizontal: false,
					columnwidth: '55%',
					endingshape: 'rounded'
				}
			},
			colors: ['#19884e', '#2596be', '#e64f54'],  // green, blue, red for the bars
			datalabels: {
				enabled: false
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent']
			},
			xaxis: {
				categories: categories,
				labels: {
					style: {
						colors: '#ffffff',  // white text for x-axis labels
						fontsize: '14px'  // increased font size for x-axis labels
					}
				},
				axisborder: {
					show: true,
					color: '#ffffff'  // white x-axis border
				},
				axisticks: {
					show: true,
					color: '#ffffff'  // white x-axis ticks
				}
			},
			yaxis: {
				title: {
					text: 'number of calls',
					style: {
						color: '#ffffff',  // white y-axis title
						fontsize: '14px'  // increased font size for y-axis title
					}
				},
				labels: {
					style: {
						colors: '#ffffff',  // white text for y-axis labels
						fontsize: '14px'  // increased font size for y-axis labels
					}
				},
				axisborder: {
					show: true,
					color: '#ffffff'  // white y-axis border
				},
				axisticks: {
					show: true,
					color: '#ffffff'  // white y-axis ticks
				}
			},
			fill: {
				opacity: 1
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val + " calls"
					}
				}
			},
			legend: {
				labels: {
					colors: '#ffffff',  // white text for legend items (received, answered, abandoned)
					useseriescolors: false
				}
			},
			grid: {
				bordercolor: '#ffffff'  // white grid lines
			}
		};

        // Create and render the chart
		document.querySelector("#bar-chart-apex").innerHTML = '';
        var chart = new ApexCharts(document.querySelector("#bar-chart-apex"), options);
        chart.render();
  
							
		  
					   
						
  
       

    } catch (error) {
        console.error("An error occurred:", error);
    }
  
  
  
  
}
function chartPie(avail,acd,acw,aux){
  // Retrieve data from local storage under the key 'user'
  var storedDataAUX = aux;
  var storedDataACDIN = acd;
  var storedDataREADY = avail;
  var storedDataQUE = acw;
  var options={
    chart: {
        height: 350,
        type: "donut"
    },
   
    series: [avail,acd,acw,aux],
    labels: ["AVAIL", "ACD", "ACW","AUX"],
    colors: ["#3cb371","#ffa800","#C7EB16","#ff0000"],
    legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: !1,
        fontSize: "12px",
        offsetX: 0
    }
  };
  document.querySelector("#chart-radial-bar").innerHTML = '';
  var chart = new ApexCharts(document.querySelector("#chart-radial-bar"), options);
  chart.render();
  
  
}

async function last5month() {
   try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetmontlylHistory", {
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
		
		 
		 
			json.forEach((item, index) => {
			  if (index  ==0) 
				   $('#fiveMonthTotal5').html(item["answer"])
			    if (index  ==1) 
				   $('#fiveMonthTotal4').html(item["answer"])
			    if (index  ==2) 
				   $('#fiveMonthTotal3').html(item["answer"])
			    if (index  ==3) 
				   $('#fiveMonthTotal2').html(item["answer"])
			    if (index  ==2) 
				   $('#fiveMonthTotal1').html(item["answer"])
			   
			});
				  
			   
			  
							
		 
		 
		
		
							
		  
					   
						
  
       

    } catch (error) {
        console.error("An error occurred:", error);
    }
}
async function last5month() {
   try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetmontlylHistory", {
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
		
		 
		 
			json.forEach((item, index) => {
			  if (index  ==0) 
				   $('#fiveMonthTotal5').html(item["answer"])
			    if (index  ==1) 
				   $('#fiveMonthTotal4').html(item["answer"])
			    if (index  ==2) 
				   $('#fiveMonthTotal3').html(item["answer"])
			    if (index  ==3) 
				   $('#fiveMonthTotal2').html(item["answer"])
			    if (index  ==2) 
				   $('#fiveMonthTotal1').html(item["answer"])
			   
			});
				  
			   
			  
							
		 
		 
		
		
							
		  
					   
						
  
       

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

 

function getData() {
    $.getJSON("PHP/DataDaily.php", function(data) {
        console.log(data);


       const splitSkills = data.Head["Split Skill"];
const informasi = data.Head.Informasi;
const pengaduan = data.Head.Pengaduan;


				if (Array.isArray(splitSkills) && Array.isArray(informasi) && Array.isArray(pengaduan)) {
					if (splitSkills.length === informasi.length && splitSkills.length === pengaduan.length) {
						// Combine skills, informasi, and pengaduan into an array of objects
						const combinedData = splitSkills.map((skill, index) => ({
							skill: skill,
							value: informasi[index],
							pengaduan: pengaduan[index]
						}));
						// Initialize variables for data extraction
							let agentAvail = 0;
							let auxinCall = 0;
							let acdCall = 0;
							let callwait = 0;
							let abandoned = 0;
							let AvgACDTime = 0;
							let ACDTime = 0;
							let ACWTime = 0;

							// Process combined data
							combinedData.forEach(item => {
								switch (item.skill) {
									case "Aban Calls":
										$('#abandoned').html(Number(item.value)+Number(item.pengaduan));
										abandoned = Number(item.value)+Number(item.pengaduan);
										break;
									case "ACD Calls":
										$('#answered').html(Number(item.value)+Number(item.pengaduan));
										break;
									case "ACD Time":
										ACDTime1 = addTimeDurations(item.value,item.pengaduan);
										ACDTime =ACDTime1.replace(" ",":");
										break;
									case "ACW Time":
										ACWTime1 = addTimeDurations(item.value,item.pengaduan);
										ACWTime =ACWTime1.replace(" ",":");
										break;
									// case "CALLSOFFERED":
										// $('#received').html(Number(abandoned) + Number($('#answered').html()));
										// break;
									case "Calls Waiting":
										$('#waiting').html(Number(item.value)+Number(item.pengaduan));
										//callwait = item.value;
										break;
									case "INQUEUE":
										callwait = Number(item.value)+Number(item.pengaduan);
										break;
										
									case "Agents on ACD Calls":
										acdCall = Number(item.value)+Number(item.pengaduan);
										break;s
									case "Agents in AUX":
										auxinCall = Number(item.value)+Number(item.pengaduan);
										break;
									 case "Agents Staffed":
										agentAvail = Number(item.value)+Number(item.pengaduan);
										 break;
									case "Avg ACD Time":
										var dtime = addTimeDurations(item.value,item.pengaduan);
										$('#avgTTime').html(dtime.replace(" ",":"));

										break;
									// case "Avg Speed Ans":
									// var dtime = addTimeDurations(item.value,item.pengaduan);
										// $('#longTTime').html(dtime.replace(" ",":"));
										// // $('#longTTime').html(Number(item.value)+Number(item.pengaduan));
																				// // $('#longWTime').html(dtime.replace(" ",":"));

										// break;
									// case "Avg ACW Time":
										// $('#avgWTime').html(Number(item.value)+Number(item.pengaduan));
										// break;
									
									case "Oldest Call Waiting":
										var dtime = addTimeDurations(item.value,item.pengaduan);
										$('#longWTime').html(dtime.replace(" ",":"));
										
										$('#longTTime').html(dtime.replace(" ",":"));
										break;
									default:
										// Handle any other cases if necessary
								}
								
								
								$('#received').html(Number(abandoned) + Number($('#answered').html()));
								$('#avgTTime').html(ACDTime);
								$('#avgWTime').html(ACWTime);
										// break;
									// case "Avg ACW Time":
										// $('#avgWTime').html(Number(item.value)+Number(item.pengaduan));
										// break;
							});

						//console.log(combinedData); // Output the combined data
						
						 getDataStatus(Number(agentAvail), Number(auxinCall) , Number(callwait),Number(acdCall));
						 
						//barchart(Number($('#received').html()), Number($('#answered').html()), Number($('#abandoned').html()));
					}
				} 

        

        // Call chart functions with the extracted values
		
		
        
    });
}
async function getDataStatus(avail,aux,acw,acd) {
    // Data statis langsung di dalam kode
    const statusData = [avail,aux,acw,acd];  // Data status: Available, AUX, ACW, ACD

    // Membuat chart dengan data statis
    var options = {
        series: statusData,  // Data points untuk chart
        chart: {
            type: 'donut',
            width: 500,  // Ukuran chart
            height: 300  // Tinggi chart
        },
        colors: ['#009946', '#e64f54', '#dea039', '#00a0e8'],  // Warna untuk status
        stroke: {
            show: true,  // Menampilkan stroke
            width: 0,    // Mengatur stroke menjadi transparan
            colors: ['transparent']
        },
        labels: ['Available', 'AUX', 'ACW', 'ACD'],  // Label chart
        legend: {
            position: 'bottom',  // Posisi legend
            horizontalAlign: 'center',  // Pusatkan legend
            itemMargin: {
                horizontal: 5,  // Margin antara item di legend
                vertical: 0
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center' // Pusatkan legend
                }
            }
        }]
    };

    // Render chart dengan data yang didefinisikan secara statis
    var chart = new ApexCharts(document.querySelector("#chart-agent-status"), options);
    chart.render();
}

// Memanggil fungsi untuk merender chart
// document.addEventListener('DOMContentLoaded', function() {
    // getDataStatus();
// });

function addTimeDurations(time1, time2) {
    // Split the input strings into hours and minutes
    const [hours1, minutes1] = time1.split(' ').map(Number);
    const [hours2, minutes2] = time2.split(' ').map(Number);

    // Calculate total minutes
    let totalMinutes = (hours1 + hours2) * 60 + (minutes1 + minutes2);

    // Convert back to hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Return the result in "HH MM" format
    return `${String(hours).padStart(2, '0')} ${String(minutes).padStart(2, '0')}`;
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


				
				 
