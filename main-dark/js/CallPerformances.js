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
	myVarX = setInterval(GetDataAutomatic, 10000);

   
   //chartPie();
	
}
function GetDataAutomatic(){
   getDateTime();
   getGreeting();
   getData();
   last5month();
   LineChart();
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
  var divTimenya = $('#timeNya');
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
  
 
     
  
  divTimenya.empty();
  divTimenya.append(time);
  divDateNya.empty();
  //divDateNya.append( hari[current_date.getDay()] +" | "+day_value + " " +  months[month_value]  + " " + year_value +" | " + time );
  divDateNya.append( hari[current_date.getDay()] +" | "+day_value + " " +  months[month_value]  + " " + year_value +" | " + time );
  //divDateNya.append( 'September' + " " + '27' + ", " + '2024' );
  
  
     
}

function LineChart(){
	 var lastweek=[];
	 var currentWeek=[];
	
	var jqxhr = $.getJSON("PHP/CallPerformances_daily.php", function(data) {
				 
				 
				
				 
				 
				  console.log(data.DataDetail);
				 $.each(data.DataDetail, function(index, metric) {
					 
						if (index >= 0 && index <= 6) {
							lastweek.push(metric["ACD Calls"]);
						} else {
							currentWeek.push(metric["ACD Calls"]);
						}
							 
					// $('#totals-table tbody').append(`<tr><td>${metric}</td><td>${data.Totals[index]}</td></tr>`);
				});
				 
               var options = {
								chart: {
									height: 350,
									type: 'line'
								},
								series: [
									{
										name: 'Last week',
										data: lastweek // Sample data for Product A
									},
									{
										name: 'Current week',
										data: currentWeek // Sample data for Product B
									}
								],
								xaxis: {
									categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] // Days of the week
								},
							   colors: ['#007A00', '#164FEB'], 
								title: {
									text: ''
								},
								dataLabels: {
									enabled: true 
								},
								stroke: {
									curve: 'smooth' 
								},
								tooltip: {
									shared: true,
									intersect: false
								}
							};

        // Create and render the chart
		document.querySelector("#line-chart").innerHTML = '';
        var chart = new ApexCharts(document.querySelector("#line-chart"), options);
        chart.render();

    });
	
						
}

function barchart(Recieve,answer,abandon){
  // Retrieve data from local storage under the key 'user'
  
  var datajson =[{"name": "Recieve","data": [Recieve]},{"name": "answer","data": [answer]},{"name": "abandon","data": [abandon]}]
  
       var Recieve = 10;  // Example value
        var answer = 15;   // Example value
        var abandon = 7;   // Example value

       var options = {
          series: datajson,
          chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ['Total Data'],
        },
		 colors: ['#007A00', '#164FEB', '#FF0000'] 
        };

        // Create and render the chart
		document.querySelector("#bar-chart1").innerHTML = '';
        var chart = new ApexCharts(document.querySelector("#bar-chart1"), options);
        chart.render();
  
  
  
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
  document.querySelector("#chart-donut1").innerHTML = '';
  var chart = new ApexCharts(document.querySelector("#chart-donut1"), options);
  chart.render();
  
  
}

function last5month() {
    $.getJSON("PHP/CallPerformance_5month.php", function(data) {
        console.log(data.Head);
 var dates = ["01 05 2024", "01 06 2024", "01 07 2024", "01 08 2024", "01 09 2024"];

            // Output the data
            var output = '';
            // $.each(dates, function(index, date) {
               // // if (data.Head[date]) {
                    // // Split the string by spaces to get individual metrics
                    // var metrics = data.Head.split(' ');
                    // // Assuming the "Ans Calls" is the last value in the string
                    // var ansCalls = metrics[metrics.length - 1];
                    // output += '<strong>' + date + ' - Ans Calls:</strong> ' + ansCalls + '<br>';
               // // }
            // });

            // Append the output to the HTML
           // $('#data-output').html(output);
       
	  
      const elementIds = [
    '#fiveMonthTotal5',
    '#fiveMonthTotal4',
    '#fiveMonthTotal3',
    '#fiveMonthTotal2',
    '#fiveMonthTotal1'
];

data.DataDetail.forEach((item, index) => {
    if (index < elementIds.length) {
        $(elementIds[index]).html(item.Ans);
    }
});

        
        
    });
}

 // function last5month() {
	// var ccData = [];
	
	// var jqxhr = $.getJSON("PHP/CallPerformance_5month.php", function(data) {
				 
				  // console.log(data.DataDetail);
				 // // $.each(data.DataDetail, function(index, metric) {
					 
						// // if (index >= 0 && index <= 6) {
							// // lastweek.push(metric["ACD Calls"]);
						// // } else {
							// // currentWeek.push(metric["ACD Calls"]);
						// // }
							 
					// // // $('#totals-table tbody').append(`<tr><td>${metric}</td><td>${data.Totals[index]}</td></tr>`);
				// // });
				 
               // // var options = {
								// // chart: {
									// // height: 350,
									// // type: 'line'
								// // },
								// // series: [
									// // {
										// // name: 'Last week',
										// // data: lastweek // Sample data for Product A
									// // },
									// // {
										// // name: 'Current week',
										// // data: currentWeek // Sample data for Product B
									// // }
								// // ],
								// // xaxis: {
									// // categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] // Days of the week
								// // },
							   // // colors: ['#007A00', '#164FEB'], 
								// // title: {
									// // text: ''
								// // },
								// // dataLabels: {
									// // enabled: true 
								// // },
								// // stroke: {
									// // curve: 'smooth' 
								// // },
								// // tooltip: {
									// // shared: true,
									// // intersect: false
								// // }
							// // };

        // // Create and render the chart
		// // document.querySelector("#line-chart").innerHTML = '';
        // // var chart = new ApexCharts(document.querySelector("#line-chart"), options);
        // // chart.render();

    // });

     
			
				 
// }

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
										ACDTime = addTimeDurations(item.value,item.pengaduan);
										break;
									case "ACW Time":
										ACWTime = addTimeDurations(item.value,item.pengaduan);
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
										$('#avgTTime').html(Number(item.value)+Number(item.pengaduan));
										break;
									// case "Avg Speed Ans":
										// $('#longTTime').html(Number(item.value)+Number(item.pengaduan));
										// break;
									// case "Avg ACW Time":
										// $('#avgWTime').html(Number(item.value)+Number(item.pengaduan));
										// break;
									
									case "Oldest Call Waiting":
										var dtime = addTimeDurations(item.value,item.pengaduan);
										$('#longWTime').html(dtime);
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
						
						 chartPie(Number(agentAvail), Number(auxinCall), Number(acdCall), Number(callwait));
						barchart(Number($('#received').html()), Number($('#answered').html()), Number($('#abandoned').html()));
					}
				} 

        

        // Call chart functions with the extracted values
		
		
        
    });
}
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


				
				 
