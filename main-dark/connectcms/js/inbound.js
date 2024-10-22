//$(document).ready(function () {
//    console.log("ready...")
   
//});
var myVar;

function myFunction() {
    //myVar = setInterval(llll, 3000);
    myVarX = setInterval(getABNINA, 1000);
    //myVarY = setInterval(getRedirect, 10000);
}
function getRedirect() {
    console.log("getRedirect");
    //window.location.replace("outbound.html");
}
//function alertFunc() {
//    wbinboundOnload();
//}
//function timerRun() {
//    setInterval(wbinboundOnload(), 1000);
//}
/*
function llll(){
			var jqxhr = $.getJSON( "test.php", function(data) {
				  //console.log( data );
			
			var messageDiv = $('#1_TampungListAgent'); 
					var i, x, result = "";
					$.each(data, function(i, item) {
							messageDiv.empty();
							// console.log( data.DataDetail );
							var object = item['Top Agents Staffed'];
							var AgentsInAUX = item['Top Agents in AUX'];
							
							//var val2 = this.val2;
							if(object!== undefined){
								console.log("Object : " + object);
								console.log("Agents Aux : " + AgentsInAUX);
							}
							$.each(data.DataDetail, function(x, itemx) {
								console.log("Name : " + itemx['Agent Name']);
								console.log("Aux : " + itemx['AUX Reason']);
								result = '<a href="#" class="list-item">' +
									'<div class="list-info">' +
									'<img src="img/example/user/dmitry_s.jpg" class="img-circle img-thumbnail">' +
									'</div>' +
									'<div class="list-text">' +
									'<span style="font-size:18px;" class="list-text-name">' + itemx['Agent Name'] +' - '+ itemx['Extn'] +'</span>' +
									'<div style="font-size:15px; color:rgb(255, 255, 255);" class="list-text-info">' +
									'<i class="icon-circle"></i>' +
									itemx['State'] +' - '+ itemx['AUX Reason'] +
									'</div>' +
									'</div>' +
									'</a>';
								messageDiv.append(result);
							});
							
					  });
					
				})
				  .done(function() {
					//console.log( "done" );
					getEng();
				  })
				  .fail(function() {
					//console.log( "error" );
				  })
				  .always(function() {
					//console.log( "complete" );
				  });
				 
				// Perform other work here ...
				 
				// Set another completion function for the request above
				jqxhr.always(function() {
				  //console.log( "second complete" );
				});
				}
*/
function getABNINA() {
    getDateTime();
    getEng();
    getData_AgentStates();
			var jqxhr = $.getJSON("abnina.php", function(data) {
				  console.log("Hai ABNINA");
				  console.log(data);
                var messageDiv = $('#1_TampungListAgent'); 
					var i, x, result = "";
					$.each(data, function(i, item) {
							
							//console.log( data.DataDetail );
							var object = item['Top Agents Staffed'];
                            var AgentsInABN = item['Aban Calls'];
                            var AgentsInSL = item['Service Level'];
                            var OldestCallWaiting = item['Oldest Call Waiting'];
                            var CallsWaiting = item['Calls Waiting'];
                            var CallsACD = item['ACD Calls'];
                            //$(".knob").knob({
                            //    'min': -50,
                            //    'max': 50,
                            //    'value' : 6
                            //});
							//var val2 = this.val2;
                        
							if(object!== undefined){
                                console.log("Object SL : " + AgentsInSL);
								console.log("Abandon Call INA : " + AgentsInABN[0]);
                                var jumlahNyaAbn = AgentsInABN[0];
                                var jumlahNyaSL = AgentsInSL[0];
                                var jumlahNyaOld = OldestCallWaiting[0];
                                var jumlahNyaACD = CallsACD[0];
                                console.log("Object SLA : " + jumlahNyaSL);
                                $('.abnVal')
                                    .val(jumlahNyaAbn)
                                    .trigger('change');
                                $('.slVal')
                                    .val(jumlahNyaSL)
                                    .trigger('change');
                                $('#valOldest').text(jumlahNyaOld.replace(" ", ":"));
                                $('#callACD').text(jumlahNyaACD);
                                $('#totAnswered').text(jumlahNyaACD);
                            }
                        
                        $('#valCallsWaiting').text(CallsWaiting);
							
                    });
                $.each(data.DataDetail, function (x, itemx) {
                    console.log("Name : " + itemx['Agent Name']);
                    console.log("Aux : " + itemx['AUX Reason']);
                    result += '<a href="#" class="list-item">' +
                        '<div class="list-info">' +
                        '<img src="img/example/user/dmitry_s.jpg" class="img-circle img-thumbnail">' +
                        '</div>' +
                        '<div class="list-text">' +
                        '<span style="font-size:18px;" class="list-text-name">' + itemx['Agent Name'] + ' - ' + itemx['Extn'] + '</span>' +
                        '<div style="font-size:15px; color:rgb(255, 255, 255);" class="list-text-info">' +
                        '<i class="icon-circle"></i>' +
                        itemx['State'] + ' - ' + itemx['AUX Reason'] +
                        '</div>' +
                        '</div>' +
                        '</a>';
                    messageDiv.empty();
                    messageDiv.append(result);
                });
					
				})
				  .done(function() {
					//console.log( "done" );
				  })
				  .fail(function() {
					//console.log( "error" );
				  })
				  .always(function() {
					//console.log( "complete" );
				  });
				 
				// Perform other work here ...
				 
				// Set another completion function for the request above
				jqxhr.always(function() {
				  //console.log( "second complete" );
				});
}
function getEng(){
			var jqxhr = $.getJSON( "getEng.php", function(data) {
				    console.log( "Hai ENG" );
			
                //var messageDivEng = $('#1_TampungListAgentEng'); 
					var i, x, result = "";
					$.each(data, function(i, item) {
							
							// console.log( data.DataDetail );
							var object = item['Top Agents Staffed'];
							var AgentsInAUX = item['Top Agents in AUX'];
							
							//var val2 = this.val2;
							if(object!== undefined){
								console.log("Object : " + object);
								console.log("Agents Aux : " + AgentsInAUX);
							}
							
							
                    });
                $.each(data.DataDetail, function (x, itemx) {
                    console.log("Name ENg : " + itemx['Agent Name']);
                    console.log("Aux ENg : " + itemx['AUX Reason']);
                    result += '<a href="#" class="list-item">' +
                        '<div class="list-info">' +
                        '<img src="img/example/user/dmitry_s.jpg" class="img-circle img-thumbnail">' +
                        '</div>' +
                        '<div class="list-text">' +
                        '<span style="font-size:18px;" class="list-text-name">' + itemx['Agent Name'] + ' - ' + itemx['Extn'] + '</span>' +
                        '<div style="font-size:15px; color:rgb(255, 255, 255);" class="list-text-info">' +
                        '<i class="icon-circle"></i>' +
                        itemx['State'] + ' - ' + itemx['AUX Reason'] +
                        '</div>' +
                        '</div>' +
                        '</a>';
                    //messageDivEng.empty();
                    //messageDivEng.append(result);
                });
					
				})
				  .done(function() {
					//console.log( "done" );
				  })
				  .fail(function() {
					//console.log( "error" );
				  })
				  .always(function() {
					//console.log( "complete" );
				  });
				 
				// Perform other work here ...
				 
				// Set another completion function for the request above
				jqxhr.always(function() {
				  //console.log( "second complete" );
				});
				}
function getDateTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
function wbinboundOnload() {
    var ValJenisSkill = "a";
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + m;
    }
    console.log("timer..." + h + " : " + m + " : " + s)
    var result = "";
    var messageDiv = $('#1_TampungListAgent');
    //alert(ValUserID)
    $.ajax({
        type: "POST",
        url: "../apps/asmx/wb_inbound.asmx/GetDataListAgentPrio",
        data: "{JenisSkill: '1'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;
            messageDiv.empty();
            console.log(json);
            for (i = 0; i < json.length; i++) {
                result = '<a href="#" class="list-item">' +
                    '<div class="list-info">' +
                    '<img src="img/example/user/dmitry_s.jpg" class="img-circle img-thumbnail">' +
                    '</div>' +
                    '<div class="list-text">' +
                    '<span style="font-size:18px;" class="list-text-name">' + json[i].AgentName +' - '+ json[i].Extension +'</span>' +
                    '<div style="font-size:15px; color:rgb(255, 255, 255);" class="list-text-info">' +
                    '<i class="icon-circle"></i>' +
                    json[i].StateNya +' - '+ json[i].AuxReason +
                    '</div>' +
                    '</div>' +
                    '</a>';

                //result = '<div class="col-lg-3 col-6"> ' +
                //        '<a class="box box-link-shadow text-center" href="2_taskboard.aspx?status=' + json[i].StatusData + '"> ' +
                //            '<div class="box-body"> ' +
                //                '<div class="font-size-24">' + json[i].JumlahData + '</div> ' +
                //                '<span>' + json[i].StatusData + '</span> ' +
                //                '</div> ' +
                //                '<div class="box-body ' + json[i].statusColor + '"> ' +
                //                '<center> ' +
                //                '<span class="mdi ' + json[i].statusIcon + ' font-size-30"></span> ' +
                //                '</center> ' +
                //            '</div> ' +
                //        '</a> ' +
                //    '</div>';

                messageDiv.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    var messageDivEng = $('#1_TampungListAgentEng');
    //alert(ValUserID)
    $.ajax({
        type: "POST",
        url: "../apps/asmx/wb_inbound.asmx/GetDataListAgentPrio",
        data: "{JenisSkill: '2'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;
            messageDivEng.empty();
            console.log(json);
            for (i = 0; i < json.length; i++) {
                result = '<a href="#" class="list-item">' +
                    '<div class="list-info">' +
                    '<img src="img/example/user/dmitry_s.jpg" class="img-circle img-thumbnail">' +
                    '</div>' +
                    '<div class="list-text">' +
                    '<span style="font-size:18px;" class="list-text-name">' + json[i].AgentName +' - '+ json[i].Extension +'</span>' +
                    '<div style="font-size:15px; color:rgb(255, 255, 255);" class="list-text-info">' +
                    '<i class="icon-circle"></i>' +
                    json[i].StateNya +' - '+ json[i].AuxReason +
                    '</div>' +
                    '</div>' +
                    '</a>';

                //result = '<div class="col-lg-3 col-6"> ' +
                //        '<a class="box box-link-shadow text-center" href="2_taskboard.aspx?status=' + json[i].StatusData + '"> ' +
                //            '<div class="box-body"> ' +
                //                '<div class="font-size-24">' + json[i].JumlahData + '</div> ' +
                //                '<span>' + json[i].StatusData + '</span> ' +
                //                '</div> ' +
                //                '<div class="box-body ' + json[i].statusColor + '"> ' +
                //                '<center> ' +
                //                '<span class="mdi ' + json[i].statusIcon + ' font-size-30"></span> ' +
                //                '</center> ' +
                //            '</div> ' +
                //        '</a> ' +
                //    '</div>';

                messageDivEng.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getData_AgentStates() {
    console.log("Agent States");
    var var_TotalAgentInbound = 0;
    var var_TotalAgentReady = 0;
    var var_TotalAgentNotReady = 0;
    var var_TotalAgentTalking = 0;
    var divNotReady = $('#lblNotReady');
    var divTalking = $('#lblTalking');
    var divReady = $('#lblReady');
    var jsonText = JSON.stringify({ JenisWB: "dataAgentStatesInbound" });
    $.ajax({
        type: "POST",
        url: "../apps/asmx/WallboardOutbound.asmx/listDataOutbound",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSourceListAgent2 = "";
            
            var gambarIconCallStatus = 0;
            for (i = 0; i < json.length; i++) {
                console.log("Console Outbound : " + json[i].TotalAgentNotReady);
                divNotReady.empty();
                divTalking.empty();
                divReady.empty();
                divNotReady.text(json[i].TotalAgentNotReady);
                divTalking.text(json[i].TotalAgentTalking);
                divReady.text(json[i].TotalAgentReady);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}