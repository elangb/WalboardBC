function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  var myVarX;
  
  function myFunction() {
    myVarX = setInterval(GetDataAutomatic, 10000);
  
    //chartPie();
  }
  function GetDataAutomatic() {
    getDateTime();
    getGreeting();
    getData();
    TotalDkPriuk();
    TotalDkSoetta();
     TotalDkPasarBaru();
     TotalEmail();
    
  }
  
  function getGreeting() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
  
    // Determine the greeting based on the time range
    if (hours < 10 || (hours === 10 && minutes === 0)) {
      $("#Greeting").html("Good Morning");
    } else if (hours < 14 || (hours === 14 && minutes === 0)) {
      $("#Greeting").html("Good Afternoon");
    } else {
      $("#Greeting").html("Good Evening");
    }
  }
  
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
  }
  
  // function LineChart() {
  //   var lastweek = [];
  //   var currentWeek = [];
  
  //   var jqxhr = $.getJSON("PHP/CallPerformances_daily.php", function (data) {
  //     console.log(data.DataDetail);
  //     $.each(data.DataDetail, function (index, metric) {
  //       if (index >= 0 && index <= 6) {
  //         lastweek.push(metric["ACD Calls"]);
  //       } else {
  //         currentWeek.push(metric["ACD Calls"]);
  //       }
  
  //       // $('#totals-table tbody').append(`<tr><td>${metric}</td><td>${data.Totals[index]}</td></tr>`);
  //     });
  
  //     var options = {
  //       chart: {
  //         height: 350,
  //         type: "line",
  //       },
  //       series: [
  //         {
  //           name: "Last week",
  //           data: lastweek, // Sample data for Product A
  //         },
  //         {
  //           name: "Current week",
  //           data: currentWeek, // Sample data for Product B
  //         },
  //       ],
  //       xaxis: {
  //         categories: [
  //           "Monday",
  //           "Tuesday",
  //           "Wednesday",
  //           "Thursday",
  //           "Friday",
  //           "Saturday",
  //           "Sunday",
  //         ], // Days of the week
  //       },
  //       colors: ["#007A00", "#164FEB"],
  //       title: {
  //         text: "",
  //       },
  //       dataLabels: {
  //         enabled: true,
  //       },
  //       stroke: {
  //         curve: "smooth",
  //       },
  //       tooltip: {
  //         shared: true,
  //         intersect: false,
  //       },
  //     };
  
  //     // Create and render the chart
  //     document.querySelector("#line-chart").innerHTML = "";
  //     var chart = new ApexCharts(document.querySelector("#line-chart"), options);
  //     chart.render();
  //   });
  // }
  
  function barchart1(answer) {
     var options = {
                  series: [{
                      name: 'Answer Call',
                      data: [answer]  // Persentase Answer Call (75% dari total panggilan masuk)
                  }],
                  chart: {
                      type: 'bar',
                      height: 150,
                  },
                  plotOptions: {
                      bar: {
                          horizontal: true,  // Orientasi bar menjadi horizontal (menyamping)
                          dataLabels: {
                              position: 'top'  // Menampilkan label persentase di atas bar
                          }
                      }
                  },
                  dataLabels: {
                      enabled: true,
                      formatter: function (val) {
                          return val + "%";  // Format data label untuk menampilkan persentase
                      },
                      offsetX: 0,
                      style: {
                          fontSize: '12px',
                          colors: ['#fff']  // Warna teks label putih
                      }
                  },
                  stroke: {
                      width: 1,
                      colors: ['#fff']  // Warna garis putih
                  },
                  title: {
                      text: '% Answer Calls',  // Judul chart
                      align: 'center',
                      style: {
                          color: '#fff'  // Warna teks judul putih
                      }
                  },
                  xaxis: {
                      categories: ['Answer Call'],  // Label tunggal untuk Answer Call
                      max: 100,  // Maksimal nilai x-axis adalah 100 (persentase)
                      labels: {
                          style: {
                              colors: ['#fff'],  // Warna label sumbu x putih
                              fontSize: '12px'
                          }
                      }
                  },
                  yaxis: {
                      labels: {
                          style: {
                              colors: ['#fff'],  // Warna label sumbu y putih
                              fontSize: '12px'
                          }
                      }
                  },
                  tooltip: {
                      y: {
                          formatter: function (val) {
                              return val + "%";  // Format tooltip untuk persentase
                          },
                          style: {
                              fontSize: '12px',
                              color: '#fff'  // Warna teks dalam tooltip putih
                          }
                      }
                  },
                  fill: {
                      opacity: 1
                  },
                  legend: {
                      show: false  // Sembunyikan legenda karena hanya ada satu bar
                  },
                  grid: {
                      show: true,
                      xaxis: {
                          lines: {
                              show: true  // Menampilkan grid pada x-axis
                          }
                      }
                  }
              };
    document.querySelector("#chart").innerHTML = '';
              var chart = new ApexCharts(document.querySelector("#chart"), options);
              chart.render();
  }
  function barchart2(answer) {
     var options = {
                  series: [{
                      name: 'Answer Call',
                      data: [answer]  // Persentase Answer Call (75% dari total panggilan masuk)
                  }],
                  chart: {
                      type: 'bar',
                      height: 150,
                  },
                  plotOptions: {
                      bar: {
                          horizontal: true,  // Orientasi bar menjadi horizontal (menyamping)
                          dataLabels: {
                              position: 'top'  // Menampilkan label persentase di atas bar
                          }
                      }
                  },
                  dataLabels: {
                      enabled: true,
                      formatter: function (val) {
                          return val + "%";  // Format data label untuk menampilkan persentase
                      },
                      offsetX: 0,
                      style: {
                          fontSize: '12px',
                          colors: ['#fff']  // Warna teks label putih
                      }
                  },
                  stroke: {
                      width: 1,
                      colors: ['#fff']  // Warna garis putih
                  },
                  title: {
                      text: '% Answer Calls',  // Judul chart
                      align: 'center',
                      style: {
                          color: '#fff'  // Warna teks judul putih
                      }
                  },
                  xaxis: {
                      categories: ['Answer Call'],  // Label tunggal untuk Answer Call
                      max: 100,  // Maksimal nilai x-axis adalah 100 (persentase)
                      labels: {
                          style: {
                              colors: ['#fff'],  // Warna label sumbu x putih
                              fontSize: '12px'
                          }
                      }
                  },
                  yaxis: {
                      labels: {
                          style: {
                              colors: ['#fff'],  // Warna label sumbu y putih
                              fontSize: '12px'
                          }
                      }
                  },
                  tooltip: {
                      y: {
                          formatter: function (val) {
                              return val + "%";  // Format tooltip untuk persentase
                          },
                          style: {
                              fontSize: '12px',
                              color: '#fff'  // Warna teks dalam tooltip putih
                          }
                      }
                  },
                  fill: {
                      opacity: 1
                  },
                  legend: {
                      show: false  // Sembunyikan legenda karena hanya ada satu bar
                  },
                  grid: {
                      show: true,
                      xaxis: {
                          lines: {
                              show: true  // Menampilkan grid pada x-axis
                          }
                      }
                  }
              };
   document.querySelector("#chart2").innerHTML = '';
              var chart = new ApexCharts(document.querySelector("#chart2"), options);
              chart.render();
  }
  function barchart3(answer) {
     var options = {
                  series: [{
                      name: 'Answer Call',
                      data: [answer]  // Persentase Answer Call (75% dari total panggilan masuk)
                  }],
                  chart: {
                      type: 'bar',
                      height: 150,
                  },
                  plotOptions: {
                      bar: {
                          horizontal: true,  // Orientasi bar menjadi horizontal (menyamping)
                          dataLabels: {
                              position: 'top'  // Menampilkan label persentase di atas bar
                          }
                      }
                  },
                  dataLabels: {
                      enabled: true,
                      formatter: function (val) {
                          return val + "%";  // Format data label untuk menampilkan persentase
                      },
                      offsetX: 0,
                      style: {
                          fontSize: '12px',
                          colors: ['#fff']  // Warna teks label putih
                      }
                  },
                  stroke: {
                      width: 1,
                      colors: ['#fff']  // Warna garis putih
                  },
                  title: {
                      text: '% Answer Calls',  // Judul chart
                      align: 'center',
                      style: {
                          color: '#fff'  // Warna teks judul putih
                      }
                  },
                  xaxis: {
                      categories: ['Answer Call'],  // Label tunggal untuk Answer Call
                      max: 100,  // Maksimal nilai x-axis adalah 100 (persentase)
                      labels: {
                          style: {
                              colors: ['#fff'],  // Warna label sumbu x putih
                              fontSize: '12px'
                          }
                      }
                  },
                  yaxis: {
                      labels: {
                          style: {
                              colors: ['#fff'],  // Warna label sumbu y putih
                              fontSize: '12px'
                          }
                      }
                  },
                  tooltip: {
                      y: {
                          formatter: function (val) {
                              return val + "%";  // Format tooltip untuk persentase
                          },
                          style: {
                              fontSize: '12px',
                              color: '#fff'  // Warna teks dalam tooltip putih
                          }
                      }
                  },
                  fill: {
                      opacity: 1
                  },
                  legend: {
                      show: false  // Sembunyikan legenda karena hanya ada satu bar
                  },
                  grid: {
                      show: true,
                      xaxis: {
                          lines: {
                              show: true  // Menampilkan grid pada x-axis
                          }
                      }
                  }
              };
    document.querySelector("#chart3").innerHTML = '';
              var chart = new ApexCharts(document.querySelector("#chart3"), options);
              chart.render();
  }
  function chartPie(avail, acd, acw, aux) {
    // Retrieve data from local storage under the key 'user'
    var storedDataAUX = aux;
    var storedDataACDIN = acd;
    var storedDataREADY = avail;
    var storedDataQUE = acw;
    var options = {
      chart: {
        height: 350,
        type: "donut",
      },
  
      series: [avail, acd, acw, aux],
      labels: ["AVAIL", "ACD", "ACW", "AUX"],
      colors: ["#3cb371", "#ffa800", "#C7EB16", "#ff0000"],
      legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: !1,
        fontSize: "12px",
        offsetX: 0,
      },
    };
    document.querySelector("#chart-donut1").innerHTML = "";
    var chart = new ApexCharts(document.querySelector("#chart-donut1"), options);
    chart.render();
  }
  
  // function last5month() {
  //   $.getJSON("PHP/CallPerformance_5month.php", function (data) {
  //     console.log(data.DataDetail);
  
  //     const elementIds = [
  //       "#fiveMonthTotal5",
  //       "#fiveMonthTotal4",
  //       "#fiveMonthTotal3",
  //       "#fiveMonthTotal2",
  //       "#fiveMonthTotal1",
  //     ];
  
  //     data.DataDetail.forEach((item, index) => {
  //       if (index < elementIds.length) {
  //         $(elementIds[index]).html(item.Ans);
  //       }
  //     });
  //   });
  // }
  
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
    $.getJSON("PHP/Site_Performance.php")
      .done(function (data) {
        console.log(data);
        // Memastikan data diterima dengan benar
        
        const ccPriokData = data.Head["CC Priok"];
        
          const skillState = ccPriokData[0]; // "NORMAL"
          const Aht = ccPriokData[1];  // "00"
          const Acw = ccPriokData[2];  // "00"
          const abandonedCalls = ccPriokData[3];  // "0"
          const acdCalls = ccPriokData[4];  // "0"
          const WaitCalls = ccPriokData[5];  // "0"
          const percentansCalls = ccPriokData[6];  // "0"
          
          
               $("#ansPriok").html(acdCalls);
               $("#abnPriok").html(abandonedCalls);
               $("#waitPriok").html(WaitCalls);
                $("#rcvPriok").html(parseInt(acdCalls)+parseInt(abandonedCalls));
                $("#avgTalkTimePriok").html(Aht);
                $("#avgWaitTimePriok").html(Acw);
                
                barchart1(percentansCalls);
          const ccPriokPasarBaru = data.Head["CC Ps Baru"];
        
          const skillState2 = ccPriokPasarBaru[0]; // "NORMAL"
          const Ahtpb = ccPriokPasarBaru[1];  // "00"
          const Acwpb = ccPriokPasarBaru[2];  // "00"
          const abandonedPb = ccPriokPasarBaru[3];  // "0"
          const acdCallsPb = ccPriokPasarBaru[4];  // "0"
          const WaitCallsPb = ccPriokPasarBaru[5];  // "0"
          const percentansCallsPb = ccPriokPasarBaru[6];  // "0"
          
               $("#ansCallsPb").html(acdCallsPb);
               $("#abnCallsPb").html(abandonedPb);
               $("#callWaitPb").html(WaitCallsPb);
                $("#rcvCallsPb").html(parseInt(acdCallsPb)+parseInt(abandonedPb));
              $("#averageTalkTimePb").html(Ahtpb);
                $("#avgWaitTimePb").html(Acwpb);	
              barchart2(percentansCallsPb);			  
  
  
  
  
      const ccSoetta = data.Head["CC Soetta"];
        
          const skillState3 = ccSoetta[0]; // "NORMAL"
          const Ahts = ccSoetta[1];  // "00"
          const Acwps = ccSoetta[2];  // "00"
          const abandoneds = ccSoetta[3];  // "0"
          const acdCallss = ccSoetta[4];  // "0"
          const WaitCallss = ccSoetta[5];  // "0"	
          const percentansCallsss = ccSoetta[6];  // "0"	
          
  
  
               $("#ansCallsSoetta").text(acdCallss);
               $("#abnCallsSoetta").text(abandoneds);
               $("#waitCallsSoetta").text(WaitCallss);	
               $("#rcvCallsSoetta").html(parseInt(acdCallss)+parseInt(abandoneds));
               
               $("#avgTalkTimeSoetta").html(Acwps);
                $("#avgWaitTimeSoetta").html(WaitCallss);	
                
                barchart3(percentansCallsss);			  
  // $("#rcvCallsSoetta").text(callOffered[index]);			 
          
          
        // if (data && data.Head) {
          // // const splitSkills = data.Head["CC Priok"];
          // // const acdCalls = data.Head["ACD Calls"];
          // // const ansCalls = data.Head["Ans Calls"];
          // // const abanCalls = data.Head["Aban Calls"];
          // // const callsWaiting = data.Head["Calls Waiting"];
          // // const avgACDTime = data.Head["Avg ACD Time"];
          // // const avgWaitTime = data.Head["Avg Speed Ans"];
          // // const callOffered = data.Head["CALLSOFFERED"];
  
          // // Mengisi data ke dalam elemen HTML berdasarkan kategori
          // splitSkills.forEach((skill, index) => {
            // if (skill === "CC Priok") {
              // $("#rcvPriok").text(callOffered[index]);
              // $("#ansPriok").text(ansCalls[index]);
              // $("#abnPriok").text(abanCalls[index]);
              // $("#waitPriok").text(callsWaiting[index]);
  
              // // Konversi dan set Average Talk Time
              // const talkTimeSeconds = parseAvgACDTimeToSeconds(avgACDTime[index]);
              // $("#avgTalkTimePriok").text(formatTime(talkTimeSeconds));
  
              // // Konversi dan set Average Wait Time
              // const waitTimeMinutes = parseAvgSpeedAnsToMinutes(
                // avgWaitTime[index]
              // );
              // $("#avgWaitTimePriok").text(formatTimeToMM(waitTimeMinutes));
            // } else if (skill === "CC Soetta") {
              // $("#rcvCallsSoetta").text(callOffered[index]);
              // $("#ansCallsSoetta").text(ansCalls[index]);
              // $("#abnCallsSoetta").text(abanCalls[index]);
              // $("#waitCallsSoetta").text(callsWaiting[index]);
  
              // // Konversi dan set Average Talk Time
              // const talkTimeSeconds = parseAvgACDTimeToSeconds(avgACDTime[index]);
              // $("#avgTalkTimeSoetta").text(formatTime(talkTimeSeconds));
  
              // // Konversi dan set Average Wait Time
              // const waitTimeMinutes = parseAvgSpeedAnsToMinutes(
                // avgWaitTime[index]
              // );
              // $("#avgWaitTimeSoetta").text(formatTimeToMM(waitTimeMinutes));
            // } else if (skill === "CC Ps Baru") {
              // $("#rcvCallsPb").text(callOffered[index]);
              // $("#ansCallsPb").text(ansCalls[index]);
              // $("#abnCallsPb").text(abanCalls[index]);
              // $("#callWaitPb").text(callsWaiting[index]);
  
              // // Konversi dan set Average Talk Time
              // const talkTimeSeconds = parseAvgACDTimeToSeconds(avgACDTime[index]);
              // $("#averageTalkTimePb").text(formatTime(talkTimeSeconds));
  
              // // Konversi dan set Average Wait Time
              // const waitTimeMinutes = parseAvgSpeedAnsToMinutes(
                // avgWaitTime[index]
              // );
              // $("#averageWaitTimePb").text(formatTimeToMM(waitTimeMinutes));
            // }
          // });
        // } else {
          // console.error("Data tidak diterima dengan benar.");
        // }
      })
      .fail(function () {
        console.error("Gagal mengambil data dari API.");
      });
  }
  
  
  async function TotalDkPriuk() {
     try {
          const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DataFromDK/TotalDataDKTanjungPriuk", {
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
                //if (index  ==0) 
                     $('#incomingLiveChatPriok').html(item["totaLInChat"])
                  //if (index  ==1) 
                     $('#abandonedLiveChatPriok').html(item["totalAbn"])
                  //if (index  ==2) 
                     $('#queueingLiveChatPriok').html(item["totalQueue"])
                  
                 
              });
                    
                 
                
                              
           
           
          
          
                              
            
                         
                          
    
         
  
      } catch (error) {
          console.error("An error occurred:", error);
      }
  }
  async function TotalDkSoetta() {
     try {
          const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DataFromDK/TotalDataDKSoetta", {
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
               // if (index  ==0) 
                     $('#incomingChatSoetta').html(item["totaLInChat"])
                 // if (index  ==2) 
                     $('#queueingLiveChatSoetta').html(item["totalQueue"])
                  
                 
              });
                    
                 
                
                              
           
           
          
          
                              
            
                         
                          
    
         
  
      } catch (error) {
          console.error("An error occurred:", error);
      }
  }
  async function TotalDkPasarBaru() {
     try {
          const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/DataFromDK/TotalDataDKPasarBaru", {
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
                //if (index  ==0) 
                     $('#incomingChatPb').html(item["totaLInChat"])
                 
                  //if (index  ==2) 
                     $('#queueingChatPb').html(item["totalQueue"])
                  
                 
              });
                    
                 
                
                              
           
           
          
          
                              
            
                         
                          
    
         
  
      } catch (error) {
          console.error("An error occurred:", error);
      }
  }
  async function TotalEmail() {
     try {
          const response = await fetch("http://10.216.206.10/apiDataBravoWb/api/Wallboad/TotalEmail", {
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
                if (item["jenis"]  =="QueueEmailSoeta") 
                     $('#queueingEmailSoetta').html(item["total"])
                 if (item["jenis"]  =="QueueEmailPasarBaru") 
                     $('#incomingEmailPb').html(item["total"])
                 
                  if (item["jenis"]  =="EmailLastWaitingSoetta") 
                     $('#queueingEmailPb').html(item["total"]) 
                 if (item["jenis"]  =="EmailLastWaitingPasarBaru") 
                     $('#incomingEmailPb').html(item["total"])
                 
                  //if (index  ==2) 
                   
                 
              });
                    
                 
                
                              
           
           
          
          
                              
            
                         
                          
    
         
  
      } catch (error) {
          console.error("An error occurred:", error);
      }
  }
  // Fungsi untuk mengonversi Avg ACD Time (hh mm) menjadi total detik
  function parseAvgACDTimeToSeconds(timeString) {
    const timeParts = timeString.trim().split(" ");
    if (timeParts.length === 2) {
      const hours = parseInt(timeParts[0], 10) || 0; // Mengambil jam
      const minutes = parseInt(timeParts[1], 10); // Mengambil menit
      return hours * 3600 + minutes * 60; // Total dalam detik
    }
    return 0; // Return 0 jika format tidak sesuai
  }
  
  // Fungsi untuk mengonversi Avg Speed Ans (menit) menjadi total menit
  function parseAvgSpeedAnsToMinutes(timeString) {
    return parseInt(timeString.trim(), 10) || 0; // Mengambil nilai menit sebagai integer
  }
  
  // Fungsi untuk mengonversi total menit menjadi format mm:ss
  function formatTimeToMM(totalMinutes) {
    return `00:${totalMinutes.toString().padStart(2, "0")}`; // Format 00:mm
  }
  
  // Fungsi untuk mengonversi total detik menjadi format hh:mm
  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`; // Format hh:mm
  }
  
  // function getData() {
  //   $.getJSON("PHP/Site_Performance.php")
  //     .done(function (data) {
  //       // Memastikan data diterima dengan benar
  //       if (data && data.Head) {
  //         const splitSkills = data.Head["Splits Skills"];
  //         const acdCalls = data.Head["ACD Calls"];
  //         const ansCalls = data.Head["Ans Calls"];
  //         const abanCalls = data.Head["Aban Calls"];
  //         const callsWaiting = data.Head["Calls Waiting"];
  //         const avgACDTime = data.Head["Avg ACD Time"];
  //         const avgWaitTime = data.Head["Avg Speed Ans"];
  //         const callOffered = data.Head["CALLSOFFERED"];
  
  //         // Mengisi data ke dalam elemen HTML yang sesuai
  //         $("#rcvPriok").text(callOffered[0]); // Mengisi Rcv. Calls
  //         $("#ansPriok").text(ansCalls[0]); // Mengisi Ans. Calls
  //         $("#abnPriok").text(abanCalls[0]); // Mengisi Abn. Calls
  //         $("#waitPriok").text(callsWaiting[0]); // Mengisi Calls Wait
  
  //         // Anda bisa menambahkan lebih banyak data ke dalam elemen lain di HTML
  //         $("#avgTalkTimePriok").text(avgACDTime[0]); // Mengisi Average Talk Time
  //         $("#avgWaitTimePriok").text(avgWaitTime[0]); // Mengisi Average Waiting Time
  //         $("#incomingLiveChatPriok").text("48"); // Misalkan ada data untuk ini
  //         $("#abandonedLiveChatPriok").text("13"); // Misalkan ada data untuk ini
  //         $("#queueingLiveChatPriok").text("30"); // Misalkan ada data untuk ini
  //       } else {
  //         console.error("Data tidak diterima dengan benar.");
  //       }
  //     })
  //     .fail(function () {
  //       console.error("Gagal mengambil data dari API.");
  //     });
  // }
  
  function addTimeDurations(time1, time2) {
    // Split the input strings into hours and minutes
    const [hours1, minutes1] = time1.split(" ").map(Number);
    const [hours2, minutes2] = time2.split(" ").map(Number);
  
    // Calculate total minutes
    let totalMinutes = (hours1 + hours2) * 60 + (minutes1 + minutes2);
  
    // Convert back to hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    // Return the result in "HH MM" format
    return `${String(hours).padStart(2, "0")} ${String(minutes).padStart(
      2,
      "0"
    )}`;
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
  