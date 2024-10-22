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
   
   ListAgentPasarBaru();
    ListAgentSoetta();
	 ListAgentTanjungPriok();
	 getDataEmail();
  
}
async function getDataEmail(){

    try {
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/GetWbDataEmailAllSide", {
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
		
		 var table = '<table class="table table-dark table-striped">';
				  table += '<tr>' +                                               
									'<th>Nama Agent</th>' +
									'<th>Status</th>' +
									'<th>Now Handle</th>' +
									'<th>Emails</th>' +							
									'</tr>';
									
									
		var table2 = '<table class="table table-dark table-striped">';
				  table2 += '<tr>' +                                               
									'<th>Nama Agent</th>' +
									'<th>Status</th>' +
									'<th>Now Handle</th>' +
									'<th>Emails</th>' +							
									'</tr>';
									
									
							//sconst agents = JSON.parse(data);	
							 json.forEach(items => {
								 
								 if(items["sideId"] == "Soekarno Hatta"){
								 
									table += '<tr>';
									table += '<td>' + items["name"] + '</td>';
									table += '<td>' + items["loginTime"] + '</td>';
									table += '<td>' + items["handleTime"] + '</td>';
									table += '<td>' + items["status"] + '</td>';
								 }
								 
								 if(items["sideId"] == "Pasar Baru"){
								 
									table2 += '<tr>';
									table2 += '<td>' + items["name"] + '</td>';
									table2 += '<td>' + items["loginTime"] + '</td>';
									table2 += '<td>' + items["handleTime"] + '</td>';
									table2 += '<td>' + items["status"] + '</td>';
								 }
								
								
							});

							

							table += '</table>';
							
							table2 += '</table>';
							$('#listEailSoetta').html(table);
							$('#ListEmailPasarBaru').html(table);
		  
		 
					   
						
  
       

    } catch (error) {
        console.error("An error occurred:", error);
    }
  
    

}
function ListAgentTanjungPriok(){
	 var lastweek=[];
	 var currentWeek=[];
	
	var jqxhr = $.getJSON("PHP/Agent_Site_Activities_Performance_TanjungPriuk.php", function(data) {
				 
				  console.log(data);
				  var table = '<table class="table table-dark table-striped">';
				  table += '<tr>' +                                               
									'<th>Nama Agent</th>' +
									'<th>Ext</th>' +
									'<th>Status</th>' +
									'<th>Calls</th>' +							
									'</tr>';
									
									
							//sconst agents = JSON.parse(data);	
							 data.forEach(items => {
								 
								 table += '<tr>';
								table += '<td>' + items["Agent Name"] + '</td>';
								table += '<td><span class="badge badge-green">' + items["Extn"] + '</span></td>';
								if (items["State"] == 'AVAIL')
									table += '<td><span class="badge badge-green">' + items["State"] + '</span></td>';
								else
									table += '<td><span class="badge badge-pink">' + items["State"] + '</span></td>';

								table += '<td><span class="badge badge-green">' + items["Time"] + '</span></td>';
								
								
							});

							

							table += '</table>';
							$('#ListAgentTanjungPriok').html(table);
							
							
				 
             

    });
	
						
}
function ListAgentSoetta(){
	 var lastweek=[];
	 var currentWeek=[];
	
	var jqxhr = $.getJSON("PHP/Agent_Site_Activities_Performance_soetta.php", function(data) {
				 
				  console.log(data);
				  var table = '<table class="table table-dark table-striped">';
				  table += '<tr>' +                                               
									'<th>Nama Agent</th>' +
									'<th>Ext</th>' +
									'<th>Status</th>' +
									'<th>Calls</th>' +							
									'</tr>';
									
									
							//sconst agents = JSON.parse(data);	
							 data.forEach(items => {
								 
								 table += '<tr>';
								table += '<td>' + items["Agent Name"] + '</td>';
								table += '<td><span class="badge badge-green">' + items["Extn"] + '</span></td>';
								if (items["State"] == 'AVAIL')
									table += '<td><span class="badge badge-green">' + items["State"] + '</span></td>';
								else
									table += '<td><span class="badge badge-pink">' + items["State"] + '</span></td>';

								table += '<td><span class="badge badge-green">' + items["Time"] + '</span></td>';
								
							});

							

							table += '</table>';
							$('#ListAgentSoetta').html(table);
							
							
				 
             

    });
	
						
}

function ListAgentPasarBaru(){
	 var lastweek=[];
	 var currentWeek=[];
	
	var jqxhr = $.getJSON("PHP/Agent_Site_Activities_Performance.php", function(data) {
				 
				  console.log(data);
				  var table = '<table class="table table-dark table-striped">';
				  table += '<tr>' +                                               
									'<th>Nama Agent</th>' +
									'<th>Ext</th>' +
									'<th>Status</th>' +
									'<th>Calls</th>' +							
									'</tr>';
									
									
							//sconst agents = JSON.parse(data);	
							 data.forEach(items => {
								 
								 table += '<tr>';
								table += '<td>' + items["Agent Name"] + '</td>';
								table += '<td><span class="badge badge-green">' + items["Extn"] + '</span></td>';
								if (items["State"] == 'AVAIL')
									table += '<td><span class="badge badge-green">' + items["State"] + '</span></td>';
								else
									table += '<td><span class="badge badge-pink">' + items["State"] + '</span></td>';

								table += '<td><span class="badge badge-green">' + items["Time"] + '</span></td>';
								
							});

							

							table += '</table>';
							$('#ListAgentPasarBaru').html(table);
							
							
				 
             

    });
	
						
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
  //var dateNya = 'September' + " " + '27' + ", " + '2024';
 // divDateNya.append('September' + " " + '27' + ", " + '2024');
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


    function convertSeconds(seconds) {
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= (24 * 3600);
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return `${hours}:${minutes}:${seconds}`;
    }


				
				 
