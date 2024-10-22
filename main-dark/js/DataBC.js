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
		var categories=[];
		var _data=[];
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
    height: 350,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: true, // Enable data labels
    formatter: function(value) {
      return value; // Customize the value display if needed
    },
    style: {
      colors: ['#000'], // Color of the data labels
      fontSize: '12px' // Font size of the data labels
    }
  },
  stroke: {
    curve: 'smooth' // Change to 'straight' if needed
  },
  title: {
    text: 'Your Chart Title',
    align: 'left'
  },
  subtitle: {
    text: 'Your Chart Subtitle',
    align: 'left'
  },
  labels: categories,
  yaxis: {
    opposite: true,
    title: {
      text: 'Y-Axis Title'
    }
  },
  xaxis: {
    title: {
      text: 'X-Axis Title'
    },
    labels: {
      style: {
        colors: ['#999'] // Change color of x-axis labels if needed
      }
    },
    axisBorder: {
      show: true,
      color: '#ccc' // Color of the x-axis border
    },
    axisTicks: {
      show: true,
      color: '#ccc' // Color of the ticks on the x-axis
    }
  },
  grid: {
    show: true, // Show grid lines
    borderColor: '#e0e0e0', // Color of grid lines
    strokeDashArray: 0, // Solid lines
    xaxis: {
      lines: {
        show: true // Show vertical lines
      }
    },
    yaxis: {
      lines: {
        show: true // Optionally show horizontal lines
      }
    }
  },
  legend: {
    horizontalAlign: 'left',
    labels: {
      colors: ['#000'] // Set legend text color to black
    }
  },
  tooltip: {
    shared: true,
    intersect: false // Tooltip will show for all points on the x-axis
  }
};
				   document.querySelector("#areachart1").innerHTML = '';
				const chart = new ApexCharts(document.querySelector("#areachart1"), options);
				chart.render();
		  
						
						
  


    } catch (error) {
        console.error("An error occurred:", error);
    }
	
	
	
	

      
}

async function barchart(){
  
  try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Voip/GetDataWbByList?type=ListTop10", {
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
		var categories=[];
		var _data=[];
		var json = JSON.parse(data);
          var i;
          console.log(json);
          for (i = 0; i < json.length; i++) {
			  categories.push(json[i].jenis);
			  _data.push(json[i].jumlah)
			
			  
		  }
		  
		  console.log(categories);
		  console.log(_data);
		  
						const options = {
						chart: {
							type: 'bar',
							height: 350
						},
						series: [{
							name: 'Series 1',
							data: _data
						}],
						xaxis: {
							categories: categories
						},
						title: {
							text: 'Top 10 Activity',
							align: 'center'
						},
						plotOptions: {
							bar: {
								horizontal: true,
								columnWidth: '55%',
								endingShape: 'rounded'
							}
						},
						dataLabels: {
							enabled: true
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
async function chartCharging(categories,chargingData){
	

  
     var options = {
        chart: {
            type: 'bar',
            height: 350,
            horizontal: true
        },
        plotOptions: {
            bar: {
                horizontal: true,
                endingShape: 'rounded',
                borderRadius: 4,
                barHeight: '100%', // Adjust this value for bar height
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#FF4560', '#FEB019', '#008FFB', '#775DD0', '#00E396'], 
        series: [
            { name: 'Call', data: [chargingData[0]] },
            { name: 'Email', data: [chargingData[1]] },
            { name: 'Multichat', data: [chargingData[2]] },
            { name: 'Social Media', data: [chargingData[3]] },
        ],
        grid: {
            show: false // Hide grid lines
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: ['', '', '', ''], // Ensure you have the same number of categories as series
            labels: {
                style: {
                    padding: 10 // Add padding to category labels if needed
                }
            },
            tickPlacement: 'between' // Optional: This can also affect spacing
        },
        title: {
            text: ''
        }
    };
	
document.querySelector("#charging-chart").innerHTML = '';
    const chart = new ApexCharts(document.querySelector("#charging-chart"), options);
    chart.render();
  
  
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
          for (i = 0; i < json.length; i++) {
				  // if (json[i].jenis == "Call")
					  // $('#call').html(json[i].jumlah);
				  if (json[i].jenis == "Multichat")
					  $('#multichat').html(json[i].jumlah);
				   if (json[i].jenis == "Email")
					  $('#email').html(json[i].jumlah);
				   if (json[i].jenis == "Socmed")
					  $('#sosmed').html(json[i].jumlah);
				  if (json[i].jenis == "Total Monthly Services")
					  $('#TotalMSer').html(json[i].jumlah);
				  if (json[i].jenis == "Total Services")
					  $('#TotalSer').html(json[i].jumlah);
				  if (json[i].jenis == "Total Case")
					  $('#TotalCase').html(json[i].jumlah);
				  if (json[i].jenis == "Pending Case")
						    $('#PendingCase').html(json[i].jumlah);
				   if (json[i].jenis == "Case Resolved")
					  $('#CaseResolved').html(json[i].jumlah);
				  if (json[i].jenis == "Volume FCR")
					  $('#FirstCall').html(json[i].jumlah +'%');
					  
				  
				  
				  if (json[i].jenis == "VolumeCallPercent" || json[i].jenis == "VolumeEmailPercent" || json[i].jenis == "VolumeMultichat" || json[i].jenis == "VolumeSocMedPercent" )
				  {
					  
					  if (json[i].jenis == "VolumeCallPercent"){
						  categories.push("Call");
						  $('#callPercent').html(json[i].jumlah +' %');
					  }
							
					if (json[i].jenis == "VolumeEmailPercent"){
						categories.push("Email");
						$('#emailPercent').html(json[i].jumlah +' %');
						
					}
						
					if (json[i].jenis == "VolumeMultichat"){
						$('#chatPercent').html(json[i].jumlah +' %');
						categories.push("Multichat");
					}
							
					 if (json[i].jenis == "VolumeSocMedPercent"){
						 categories.push("Social Media");
						 $('#sosmedPercent').html(json[i].jumlah +' %');
						 
					 }
							
						
				  chargingData.push(json[i].jumlah);
					  
				  }
		 }
		  
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


				
				 
