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
	
	 myVarY = setInterval(AutoCall, 8000);
	
   
  
   //chartPie();
	
}
function AutoCall(){
	getDateTime();
	getDataCall();
   getData();
   barchart();
   AreaChart();
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
  //var dateNya = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var dateNya = '2024' + '-' + 'September' + '-' + '27';
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
 // divDateNya.append('September' + " " + '27' + ", " + '2024');
}
async function AreaChart(){
    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataWbByList?type=Daily", {
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
        var categories = [];
        var _data = [];
        var json = JSON.parse(data);
        var i;
        console.log(json);
        for (i = 0; i < json.length; i++) {
            categories.push(json[i].jenis);
            _data.push(json[i].jumlah)
        }
        
        console.log(categories);
        console.log(_data);
        
        var options = {
            series: [{
                name: "Data Series",
                data: _data
            }],
            chart: {
                type: 'area',
                height: 320,
                zoom: {
                    enabled: false
                },
                toolbar: {
					show: false
				}
            },
            dataLabels: {
                enabled: true, // Enable data labels
                formatter: function(value) {
                    return value; // Customize the value display if needed
                },
                style: {
                    colors: ['#000'], 
                    fontSize: '12px' 
                }
            },
            stroke: {
                curve: 'smooth', 
                colors: ['#40E0D0'], 
                width: 3 
            },
            title: {
                text: '',
                align: 'left'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            labels: categories,
            yaxis: {
                opposite: true,
                title: {
                    text: ''
                }
            },
            xaxis: {
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        colors: ['#999'] 
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ccc' 
                },
                axisTicks: {
                    show: true,
                    color: '#ccc' 
                }
            },
            grid: {
                show: true, 
                borderColor: '#e0e0e0', 
                strokeDashArray: 0, 
                xaxis: {
                    lines: {
                        show: true 
                    }
                },
                yaxis: {
                    lines: {
                        show: true 
                    }
                }
            },
            legend: {
                horizontalAlign: 'left',
                labels: {
                    colors: ['#000'] 
                }
            },
            tooltip: {
                shared: true,
                intersect: false 
            },
            fill: {
                colors: ['#40E0D0'], 
                opacity: 0.5 
            }
        };
        
        document.querySelector("#areachart1").innerHTML = '';
        const chart = new ApexCharts(document.querySelector("#areachart1"), options);
        chart.render();

    } catch (error) {
        console.error("An error occurred:", error);
    }
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
                height: 410,
                toolbar: {
					show: false
				}
            },
            series: [{
                name: 'Jumlah',
                data: _data
            }],
            xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: '#ffffff'
          }
        }
      },
      yaxis: {
        labels: {
			style: {
            colors: '#ffffff'
          }
        }
      },
      grid: {
        borderColor: '#ffffff' 
      },
      tooltip: {
        theme: 'dark',  
        style: {
          color: '#ffffff'
        }
      },
            title: {
                text: 'Top 10 Activity',
                align: 'center',
                style: {
                    color: '#ffffff' 
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                }
            },
            fill: {
                colors: ['#40E0D0'] 
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['#40E0D0']
            },
            tooltip: {
                shared: true,
                intersect: false
            },
        };

        document.querySelector("#barchart1").innerHTML = '';
        const chart = new ApexCharts(document.querySelector("#barchart1"), options);
        chart.render();

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function chartCharging(categories, chargingData) {
    // Ensure that undefined values in chargingData are replaced with 0
    chargingData = chargingData.map(data => data === undefined || data === null ? 0 : data);

    var options = {
        chart: {
            type: 'bar',
            height: 310,
            horizontal: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                endingShape: 'rounded',
                borderRadius: 4,
                barHeight: '80%', // Adjust this value for bar height
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#FF4560', '#FEB019', '#00E396', '#008FFB'], // Define bar colors
        series: [
            { data: [chargingData[0]] },
            { data: [chargingData[1]] },
            { data: [chargingData[2]] },
            { data: [chargingData[3]] }
        ],
        grid: {
            show: false
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: [' ', ' ', ' ', ' '], // Empty spaces to create gap between bars
            labels: {
                style: {
                    padding: 20 // Add padding to separate labels more clearly
                }
            },
            tickPlacement: 'between',
            tickAmount: 4 // Adjust to change how ticks are spaced
        },
        legend: {
            show: false
        }
    };

    // Render the chart
    document.querySelector("#charging-chart").innerHTML = '';
    const chart = new ApexCharts(document.querySelector("#charging-chart"), options);
    chart.render();

    // Update the HTML elements with the charging data and ensure no 'undefined%' is shown
    document.querySelector("#callPercent").textContent = (chargingData[0] || 0) + "%";
    document.querySelector("#emailPercent").textContent = (chargingData[1] || 0) + "%";
    document.querySelector("#chatPercent").textContent = (chargingData[2] || 0) + "%";
    document.querySelector("#sosmedPercent").textContent = (chargingData[3] || 0) + "%";
}
	
function getDataCall() {
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
							let abandoned = 0;
							let answer = 0;
							

							// Process combined data
							combinedData.forEach(item => {
								switch (item.skill) {
									case "Aban Calls":
										abandoned = Number(item.value)+Number(item.pengaduan);
										break;
									case "ACD Calls":
										answer = Number(item.value)+Number(item.pengaduan);
										break;
									
									default:
										// Handle any other cases if necessary
								}
								
								
										
							});
							$('#call').html(Number(abandoned) + Number(answer));

						//console.log(combinedData); // Output the combined data
					}
				} 

        

        // Call chart functions with the extracted values
        // chartPie(Number(agentAvail), Number(auxinCall), Number(acdCall), Number(callwait));
        // barchart(Number($('#received').html()), Number($('#answered').html()), Number($('#abandoned').html()));
    });
}

async  function getData() {
     try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataWbByCount?type=CountData", {
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
		
		
		var categories = [];
		var chargingData =[]; 
		var json = JSON.parse(data);
          var i;
          console.log(json);
		  var TotalTicket =0;
          for (i = 0; i < json.length; i++) {
				  // if (json[i].jenis == "Call")
					  // $('#call').html(json[i].jumlah);
				  if (json[i].jenis == "Multichat")
					  $('#multichat').html(json[i].jumlah);
				   if (json[i].jenis == "Email")
					  $('#email').html(json[i].jumlah);
				   if (json[i].jenis == "Socmed")
					  $('#socmed1').html(json[i].jumlah);
				  if (json[i].jenis == "Total Monthly Services")
					  $('#TotalMSer').html(json[i].jumlah);
				  // if (json[i].jenis == "Total Services")
					  // $('#TotalSer').html(json[i].jumlah);
				  if (json[i].jenis == "Total Case")
					  $('#TotalCase').html(json[i].jumlah);
				  if (json[i].jenis == "Pending Case")
						    $('#PendingCase').html(json[i].jumlah);
				   if (json[i].jenis == "Case Resolved")
					  $('#CaseResolved').html(json[i].jumlah);
				
				  if (json[i].jenis == "Total")
					  TotalTicket= json[i].jumlah;
					  
				  
				  
				  
				}
				// if (json[i].jenis == "VolumeCallPercent" || json[i].jenis == "VolumeEmailPercent" || json[i].jenis == "VolumeMultichat" || json[i].jenis == "VolumeSocMedPercent" )
				  // {
					  
					  // if (json[i].jenis == "VolumeCallPercent"){
						  
						// var TotalScVolume = 
						// parseFloat($('#call').val()) + 
						// parseFloat($('#multichat').val()) + 
						// parseFloat($('#email').val()) + 
						// parseFloat($('#socmed1').val());
						  // categories.push("Call");
						  
						 // var Total =(parseFloat($('#call').val())/TotalScVolume)*100
						  // $('#callPercent').html(Total +' %');
					  // }
							
					// if (json[i].jenis == "VolumeEmailPercent"){
						// categories.push("Email");
						// $('#emailPercent').html(json[i].jumlah +' %');
						
					// }
						
					// if (json[i].jenis == "VolumeMultichat"){
						// $('#chatPercent').html(json[i].jumlah +' %');
						// categories.push("Multichat");
					// }
							
					 // if (json[i].jenis == "VolumeSocMedPercent"){
						 // categories.push("Social Media");
						 // $('#sosmedPercent').html(json[i].jumlah +' %');
						 
					 // }
							
						
				  // chargingData.push(json[i].jumlah);
					  
				  // }
				   var TotalScVolume = 
						 parseFloat($('#call').html()) + 
						 parseFloat($('#multichat').html()) + 
						 parseFloat($('#email').html()) + 
						 parseFloat($('#socmed1').html());
						 
						 var totalCall = (parseFloat($('#call').html())/TotalScVolume)*100
						 categories.push("Call");
						  $('#callPercent').html(totalCall.toFixed(2) +' %');
						  chargingData.push(totalCall.toFixed(2));
						  
						  var totalEmail = (parseFloat($('#email').html())/TotalScVolume)*100
						 categories.push("Email");
						  $('#emailPercent').html(totalEmail.toFixed(2) +' %');
						  chargingData.push(totalEmail.toFixed(2));
						  
						    var totalMultiChat = (parseFloat($('#multichat').html())/TotalScVolume)*100
						 categories.push("Multichat");
						  $('#chatPercent').html(totalMultiChat.toFixed(2) +' %');
						  chargingData.push(totalMultiChat.toFixed(2));
						  $('#TotalSer').html(TotalScVolume);
						  
						  
						 // jumlah seluruh ticket - total case) / jumlah seluruh incoming * 100%
						 
						 
						 var Fcr = ((TotalTicket - parseInt($('#TotalCase').html())) / TotalScVolume) * 100;
						$('#FirstCall').html(Fcr.toFixed(2) + '%');
						  
		  
		  chartCharging(categories,chargingData);
		  
       

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


				
				 
