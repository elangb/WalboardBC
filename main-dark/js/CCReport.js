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


				if (Array.isArray(splitSkills) && Array.isArray(informasi) && Array.isArray(pengaduan)&& Array.isArray(Priok)&& Array.isArray(PsBaru) && Array.isArray(Soetta)) {
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
						// Initialize variables for data extraction
							
							// Process combined data
							combinedData.forEach(item => {
								switch (item.skill) {
									case " Ans Calls":
										$('#ansPusat').html(Number(item.value)+Number(item.pengaduan));
										$('#ansTp').html(Number(item.Priok));
										$('#ansSoetta').html(Number(item.Soetta));
										$('#ansPb').html(Number(item.PsBaru));
										
										break;
									
									default:
										// Handle any other cases if necessary
								}
								
										
							});

						
					}
				} 

        

        // Call chart functions with the extracted values
		
		
        
    });
}

async function LineChart2(){
    var callData=[];
    var EmailCall=[];
    var LcData=[];
    var SosmedData=[];
	
	
     try {
		 
		 
        const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/ContactCenterReport/TotalVolumeChannelPerweek", {
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
         var namaHari=[];
          const groupedData = {};

					json.forEach(item => {
					  const { name, hari, jumlah } = item;

					  // Inisialisasi jika hari belum ada
					  if (!groupedData[hari]) {
						groupedData[hari] = {
						  Call: [],
						  Email: []
						};
					  }

					  // Menambahkan jumlah ke dalam array sesuai dengan jenis
					  groupedData[hari][name].push(jumlah);
					});


					   const days = Object.keys(data);
				const callData = days.map(day => data[day].Call); // Mengambil data Call
				const emailData = days.map(day => data[day].Email); // Mengambil data Email

				const options = {
					chart: {
						type: 'line',
						height: 350
					},
					series: [
						{
							name: 'Call',
							data: callData
						},
						{
							name: 'Email',
							data: emailData
						}
					],
					xaxis: {
						categories: days // Menyusun kategori pada sumbu X
					},
					title: {
						text: 'Jumlah Call dan Email per Hari',
						align: 'left'
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
					}
				};

    
       // Create and render the chart
       document.querySelector("#line-chart2").innerHTML = '';
       var chart = new ApexCharts(document.querySelector("#line-chart2"), options);
       chart.render();
	 

	 

    } catch (error) {
        console.error("An error occurred:", error);
    }
   
   
                       
}

async function LineChart(){
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
					
				  if (json[i].jenis == "Tanjung Priuk"){
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

async function ChartServiceVolumeSite(pusat,Tp,Soeta,Pb){
			var options = {
					  chart: {
						  width: 380,
						type: 'pie', 
					  },
					  series: [pusat,Tp,Soeta,Pb],
					  labels: ['Pusat', 'Tj.Priok', 'Soetta', 'Pos Pasbar'],
					  colors: ['#f64e60', '#ffa800', '#6993ff', '#1bc5bd'],
					  legend: {
						position: 'bottom',          
						horizontalAlign: 'center',   
						floating: false,             
						fontSize: '14px',            
						itemMargin: {                
						  horizontal: 5,
						  vertical: 10
						}
					  },
					};


		document.querySelector("#chart1").innerHTML = '';
      var chart = new ApexCharts(document.querySelector("#chart1"), options);
      chart.render();
}

async function ChartServiceVolumeChannel(){
    const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/ContactCenterReport/TotalVolumeChannel", {
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
      var totCall=0;
      var totEmail=0;
      var totLc=0;
      var totSm=0;
      for (i = 0; i < json.length; i++) {
            
            if (json[i].jenis == "Call")
                  totCall = json[i].jumlah;
              if (json[i].jenis == "Email")
                totEmail = json[i].jumlah;
               if (json[i].jenis == "Live Chat")
                totLc = json[i].jumlah;
               if (json[i].jenis == "Social Media")
                totSm = json[i].jumlah;
            
     }
    
				  var options = {
			  chart: {
				  width: 380,
				type: 'pie', 
			  },
			  series: [totCall,totEmail,totLc,totSm],
			  labels: ['Call', 'Email', 'LiveChat', 'Sosial Media'],
			  colors: ['#f64e60', '#ffa800', '#6993ff', '#1bc5bd'],
			  legend: {
				position: 'bottom',          
				horizontalAlign: 'center',   
				floating: false,             
				fontSize: '14px',            
				itemMargin: {                
				  horizontal: 5,
				  vertical: 10
				}
			  },
			};

 document.querySelector("#chart2").innerHTML = '';
      var chart = new ApexCharts(document.querySelector("#chart2"), options);
      chart.render();
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
                              height: 400
                          },
                          series: [{
                              name: '',
                              data: _data
                          }],
						   legend: {
							position: 'bottom', // Set legend position to bottom
							horizontalAlign: 'left', // Center the legend horizontally
						  },
                          xaxis: {
                              categories: categories,
							   labels: {
							style: {
								fontSize: '5px', // Adjust the font size
								fontWeight: 'bold', // Font weight
								color: '#fff' // Font color
							},
							}
							  
                          },
                          title: {
                              text: 'Top 10 Activity',
                              align: 'center'
                          },
                          plotOptions: {
                              bar: {
                                  horizontal: true,
                                  columnWidth: '15%',
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
    function convertSeconds(seconds) {
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= (24 * 3600);
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return `${hours}:${minutes}:${seconds}`;
    }


				
				 
