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
   getGreeting();
   getData();
   last5month();
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
  divDateNya.append( hari[current_date.getDay()] +" | "+day_value + " " +  months[month_value]  + " " + year_value +" | " + time );
  
  
     
}

function LineChart(lastweek,currentWeek){
	document.querySelector("#line-chart").innerHTML = '';
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
			
        var chart = new ApexCharts(document.querySelector("#line-chart"), options);
        chart.render();
}

function barchart(Recieve,answer,abandon){
  // Retrieve data from local storage under the key 'user'
  document.querySelector("#bar-chart1").innerHTML = '';
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
        var chart = new ApexCharts(document.querySelector("#bar-chart1"), options);
        chart.render();
  
  
  
}
function chartPie(avail,acd,acw,aux){
  // Retrieve data from local storage under the key 'user'
  document.querySelector("#chart-donut1").innerHTML = '';
  var storedDataAUX = aux;
  var storedDataACDIN = acd;
  var storedDataREADY = avail;
  var storedDataQUE = acw;
  var options={
    chart: {
        height: 350,
        type: "pie"
    },
   
    series: [avail,acd,acw,aux],
    labels: ["AVAIL", "ACD", "ACW","AUX"],
    colors: ["#007A00","#164FEB","#C7EB16","#ff0000"],
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
  var chart = new ApexCharts(document.querySelector("#chart-donut1"), options);
  chart.render();
  
  
}
function last5month() {
	var ccData = [];

     
			var jqxhr = $.getJSON("PHP/DataDaily.php", function(data) {
				 
				  console.log(data);
              
				
					$.each(data.Head, function(key, value) {
						// Check if the key contains "CC Priok"
						
							ccData = value; // Store relevant data in an object
						//}
					});

                
					
					var dataArray = Object.keys(ccData).map(key => key.split(' '));

					// Example of how to handle the extracted data
					if (ccData.length > 0) {
						
						
						$('#fiveMonthCall').html(ccData[10]); 
						$('#fiveMonthAnswer').html(ccData[11]); 
						$('#fiveMonthwait').html(ccData[12]);
						$('#fiveMonthabandon').html(ccData[13]); 
						
						var Total = (Number(ccData[10])) +
							  (Number(ccData[11])) +
							  (Number(ccData[12])) +
							  (Number(ccData[13]));
						$('#fiveMonthTotal').html(Total); 

					}
                 });
				 
}

function getData() {
	var ccData = [];

     
			var jqxhr = $.getJSON("PHP/DataDaily.php", function(data) {
				 
				  console.log(data);
              
				
					$.each(data.Head, function(key, value) {
						// Check if the key contains "CC Priok"
						if (key.length > 10) {
							ccData =key; // Store relevant data in an object
						}
					});

                   ccData = ccData.split(' ');

   

					// Example of how to handle the extracted data
					if (ccData.length > 0) {
						$('#received').html(ccData[5]); 
						$('#abandoned').html(ccData[3]); 
						//$('#answered').html(ccData[3]);
						//$('#waiting').html(ccData[9]); 
						
						chartPie(Number(ccData[14]),Number(ccData[5]),3,Number(ccData[13]));
						barchart(Number(ccData[5]),6,Number(ccData[3]));
						var lastweek =[10,10,10,10,10,10,10];
						var curweek =[20,30,3,10,13,13,8]
						LineChart(lastweek,curweek);
						
						 var totalSeconds = 208886363636;

            // Calculate hours and minutes
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
			
			 			$('#avgTTime').html(convertSeconds(ccData[7].split(' ')[1]));
						$('#avgWTime').html(convertSeconds(ccData[6].split(' ')[1]));
						
						$('#longTTime').html(convertSeconds(ccData[7].split(' ')[1]));
						$('#longWTime').html(convertSeconds(ccData[6].split(' ')[1]));
						

					}
                 });
				 
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


				
				 
