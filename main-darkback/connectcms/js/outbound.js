//$(document).ready(function () {
//    console.log("ready...")
   
//});
var myVar;

function myFunction() {
   
	//myVarX = setInterval(getOUT, 3000);
}

function alertFunc() {
    wbinboundOnload();
}
function timerRun() {
    setInterval(wbinboundOnload(), 1000);
}

function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('getOUT()', refresh);
    //myVarY = setInterval(getRedirect, 10000);
}
function getRedirect() {
    console.log("getRedirect");
    window.location.replace("inbound.html");
}
//Get Status Call
function getData_StatusCall() {
    var var_listStatusCall = $('#listStatusCall');
    
    var resourceListReasonStatus = "";
    var jsonText = JSON.stringify({ JenisWB: "dataStatusCall" });
    $.ajax({
        type: "POST",
        url: "http://10.28.2.222/brilifecc/apps/asmx/WallboardOutbound.asmx/listDataOutbound",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSourceEscalation = "";
            var fileBusy = "img/icon/busy.png";
            var fileDone = "img/icon/checked.png";
            var fileNo = "img/icon/noanswer.png";
            var fileUn = "img/icon/unregistered.png";
            var fileWrong = "img/icon/call.png";
			var fileAnswer = "img/icon/answerunfollow.png";
            var gambarIconCallStatus = 0;
            for (i = 0; i < json.length; i++) {
                //alert();
                //alert();
                //alert(json[i].UserCreate);
                console.log(json[i].NameNya);

                if (json[i].NameNya == "Busy") {
                    gambarIconCallStatus = fileBusy;
                } else if (json[i].NameNya == "Done") {
                    gambarIconCallStatus = fileDone;
                } else if (json[i].NameNya == "No Answer") {
                    gambarIconCallStatus = fileNo;
                } else if (json[i].NameNya == "Unregistered") {
                    gambarIconCallStatus = fileUn;
                } else if (json[i].NameNya == "Wrong Number") {
                    gambarIconCallStatus = fileWrong;
                }else if (json[i].NameNya == "Answer Follow Up") {
                    gambarIconCallStatus = fileAnswer;
                }
                resourceListReasonStatus += '<a href="#" class="list-item">' +
                    '<div class="list-info">' +
                    '<img src="' + gambarIconCallStatus + '" width="36px">' +
                    '</div>' +
                    '<div class="list-text">' +
                    '<span style="font-size:18px;" class="list-text-name">' + json[i].NameNya + '</span>' +
                    '<div style="font-size:13px;" class="list-text-info"><i class="icon-circle"></i> ' + json[i].TotalNya + '' +
                    ' Called' +
                    '</div>' +
                    '</div>' +
                    '</a>';
            }
            var_listStatusCall.empty();
            var_listStatusCall.append(resourceListReasonStatus);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//Get Agent List
function getData_ListAgent1() {
    var var_listAgent = $('#listAgent1');
    
    var resultSourceListAgent1 = "";

    var jsonText = JSON.stringify({ JenisWB: "dataListAgent1" });
    $.ajax({
        type: "POST",
        url: "http://10.28.2.222/brilifecc/apps/asmx/WallboardOutbound.asmx/listDataOutbound",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSourceListAgent1 = "";
            var fileBusy = "img/icon/busy.png";
            var fileDone = "img/icon/checked.png";
            var fileNo = "img/icon/noanswer.png";
            var fileUn = "img/icon/unregistered.png";
            var fileWrong = "img/icon/call.png";
            var gambarIconCallStatus = 0;
            for (i = 0; i < json.length; i++) {
                //alert();
                //alert();
                //alert(json[i].UserCreate);
                //console.log('Data : ' + json[i].NameNya);

                if (json[i].NameNya == "Busy") {
                    gambarIconCallStatus = fileBusy;
                } else if (json[i].NameNya == "Done") {
                    gambarIconCallStatus = fileDone;
                } else if (json[i].NameNya == "No Answer") {
                    gambarIconCallStatus = fileNo;
                } else if (json[i].NameNya == "Unregistered") {
                    gambarIconCallStatus = fileUn;
                } else if (json[i].NameNya == "Wrong Number") {
                    gambarIconCallStatus = fileWrong;
                }

                resultSourceListAgent1 += '<a href="#" class="list-item">' +
                    '<div class="list-info">' +
                    '<img src="' + json[i].FotoAgent + '" width="44" class="img-circle img-thumbnail">' +
                    '</div>' +
                    '<div class="list-text">' +
                    '<span style="font-size:18px;" class="list-text-name">' + json[i].NameNya + '</span>' +
                    '<div style="font-size:13px; color:#00000;" class="list-text-info"><i class="icon-circle"></i>' +
                    ' Not Ready - ' + json[i].TotalNya + ' Outstanding List' +
                    '</div>' +
                    '</div>' +
                    '</a>'
            }
            var_listAgent.empty();
            var_listAgent.append(resultSourceListAgent1);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getData_ListAgent2() {
    var var_listAgent2 = $('#listAgent2');
    
    var resultSourceListAgent2 = "";

    var jsonText = JSON.stringify({ JenisWB: "dataListAgent2" });
    $.ajax({
        type: "POST",
        url: "http://10.28.2.222/brilifecc/apps/asmx/WallboardOutbound.asmx/listDataOutbound",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSourceListAgent2 = "";
            var fileBusy = "img/icon/busy.png";
            var fileDone = "img/icon/checked.png";
            var fileNo = "img/icon/noanswer.png";
            var fileUn = "img/icon/unregistered.png";
            var fileWrong = "img/icon/call.png";
            var gambarIconCallStatus = 0;
            for (i = 0; i < json.length; i++) {
                //alert();
                //alert();
                //alert(json[i].UserCreate);
                //console.log('Data : ' + json[i].NameNya);

                if (json[i].NameNya == "Busy") {
                    gambarIconCallStatus = fileBusy;
                } else if (json[i].NameNya == "Done") {
                    gambarIconCallStatus = fileDone;
                } else if (json[i].NameNya == "No Answer") {
                    gambarIconCallStatus = fileNo;
                } else if (json[i].NameNya == "Unregistered") {
                    gambarIconCallStatus = fileUn;
                } else if (json[i].NameNya == "Wrong Number") {
                    gambarIconCallStatus = fileWrong;
                }

                resultSourceListAgent2 += '<a href="#" class="list-item">' +
                    '<div class="list-info">' +
                    '<img src="' + json[i].FotoAgent + '" width="44" class="img-circle img-thumbnail">' +
                    '</div>' +
                    '<div class="list-text">' +
                    '<span style="font-size:18px;" class="list-text-name">' + json[i].NameNya + '</span>' +
                    '<div style="font-size:13px; color:#00000;" class="list-text-info"><i class="icon-circle"></i>' +
                    ' Not Ready - ' + json[i].TotalNya + ' Outstanding List' +
                    '</div>' +
                    '</div>' +
                    '</a>'
            }
            var_listAgent2.empty();
            var_listAgent2.append(resultSourceListAgent2);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getData_Summary() {
    var var_listSumAnswered = $('#sumAnswered');
    var var_listSumTotal = $('#sumTotal');
    var var_listSumQue = $('#sumQue');
    
    var jsonText = JSON.stringify({ JenisWB: "dataCallSummary" });
    $.ajax({
        type: "POST",
        url: "http://10.28.2.222/brilifecc/apps/asmx/WallboardOutbound.asmx/listDataOutbound",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSourceListAgent2 = "";

            var gambarIconCallStatus = 0;
            for (i = 0; i < json.length; i++) {
                //alert();
                //alert();
                //alert(json[i].UserCreate);
                //console.log('Data : ' + json[i].NameNya);

                /*if(json[i].NameNya=="Busy"){
                    gambarIconCallStatus=fileBusy;
                }else if(json[i].NameNya=="Done"){
                    gambarIconCallStatus=fileDone;
                }else if(json[i].NameNya=="No Answer"){
                    gambarIconCallStatus=fileNo;
                }else if(json[i].NameNya=="Unregistered"){
                    gambarIconCallStatus=fileUn;
                }else if(json[i].NameNya=="Wrong Number"){
                    gambarIconCallStatus=fileWrong;
                }*/
                var_listSumAnswered.empty();
                var_listSumTotal.empty();
                var_listSumQue.empty();
                var_listSumTotal.append(json[i].TotalCallDay);
                var_listSumAnswered.append(json[i].TotalCallAnswered);
                var_listSumQue.append(json[i].TotalCallQue);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getDateTime() {
    var today = new Date();
    let hours   = today.getHours(); // get hours
	let minutes = today.getMinutes(); // get minutes
	let seconds = today.getSeconds(); //  get seconds
	// add 0 if value < 10; Example: 2 => 02
	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
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
function getOUT() {
    //display_ct();
	 $('.blink').fadeOut(500);
    $('.blink').fadeIn(500);
            //GET Data
                getData_StatusCall();
                //getData_ListAgent1();
                //getData_ListAgent2();
                getData_Summary();
                getDateTime();
				getListAgentOut();
            //End GET
            var x = new Date()
            let hours   = x.getHours(); // get hours
			let minutes = x.getMinutes(); // get minutes
			let seconds = x.getSeconds(); //  get seconds
			// add 0 if value < 10; Example: 2 => 02
			if (hours   < 10) {hours   = "0"+hours;}
			if (minutes < 10) {minutes = "0"+minutes;}
			if (seconds < 10) {seconds = "0"+seconds;}
			var time = hours + ":" + minutes + ":" + seconds;
            //document.getElementById('ct').innerHTML = x1;
            var divTimenya = $('#timeNya');
            divTimenya.empty();
            divTimenya.append(time);
            //var varlblNotReady = $('#lblNotReady');
           
            var varlblReady = $('#lblReady');
    
            var varlblTalking = $('#lblTalking');
    
    
            var valueNotReady = 0;
            var valueReady = 0;
            var valueTalking = 0;
            var jqxhr = $.getJSON("abnout.php", function (data) {
				  console.log("Hai Get Outbound");
				  console.log(data);
			var messageDiv = $('#1_TampungListAgentEng'); 
                var i, x, result = "";
                var varlblReady = $('#lblReady');
                
					$.each(data, function(i, item) {
							messageDiv.empty();
							//new
							var outboundAux = item['Agents in AUX'];
							var outboundAvail = item['Agents Avail'];
							//valueNotReady=item['Agents in AUX'][1];
							valueReady = item['Agents Avail'][1];
							valueTalking = item['Agents in AUX'][1];
							//End new
							//console.log( "complete" );
							  //varlblNotReady.empty();
							  varlblReady.empty();
							  varlblTalking.empty();
							  //varlblNotReady.append(valueNotReady);
							  varlblReady.append(valueReady);
							  varlblTalking.append(valueTalking);
							// console.log( data.DataDetail );
							/*var object = 0;
							var AgentsInABN = item['Aban Calls'][0];
							
							//var val2 = this.val2;
							if(object!== undefined){
								console.log("Object : " + object);
								console.log("Abandon Call : " + AgentsInABN);
							}
                        $.each(data.DataDetail, function (x, itemx) {
                            if (itemx['State']=="AUX") {
                                //valueNotReady = x+1;
                            }
                            if (itemx['State'] == "AVAIL") {
                                //valueReady = x + 1;
                            }
                            if (itemx['State'] == "AUXOUT") {
                                //valueTalking = x + 1;
                            }

                                //console.log("Name : " + itemx['Agent Name']);
                                //console.log("Aux : " + itemx['AUX Reason']);
                                //console.log("State : " + itemx['State']);
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
                        });    */                   
                        
					  });
					
				})
				  .done(function() {
					//console.log( "done" );
                      
				  })
				  .fail(function() {
					//console.log( "error" );
				  })
				  .always(function() {
					
				  });
				 
				// Perform other work here ...
				 
				// Set another completion function for the request above
				jqxhr.always(function() {
				  //console.log( "second complete" );
				  
                });
    display_c();
}
function getListAgentOut(){
			var var_listAgent = $('#listAgent1');
    
			var resultSourceListAgent1 = "";
			
			var var_listAgent2 = $('#listAgent2');
    
			var resultSourceListAgent2 = "";
			var jqxhr = $.getJSON("listagentout.php", function(data) {
				  console.log( "Hai List Agent Out" );
			
                
					var i, x, result = "";
					$.each(data.DataDetail, function(i, item) {
						console.log(data.DataDetail);
						//' + item['Login ID'] + '
						if(i < 10){
							resultSourceListAgent1 += '<a href="#" class="list-item">' +
							'<div class="list-info">' +
							'<img src="http://10.28.2.222/brilifecc/images/agent/masnurjas.png" width="44" class="img-circle img-thumbnail">' +
							'</div>' +
							'<div class="list-text">' +
							'<span style="font-size:18px;" class="list-text-name">' + item['Agent Name'] + '</span>' +
							'<div style="font-size:13px; color:#00000;" class="list-text-info"><i class="icon-circle"></i>' +
							' ' + item['State'] + ' - ' + item['Extn'] + ' - 0 Outstanding List' +
							'</div>' +
							'</div>' +
							'</a>'
						}
						if(i > 11){
							resultSourceListAgent2 += '<a href="#" class="list-item">' +
							'<div class="list-info">' +
							'<img src="http://10.28.2.222/brilifecc/images/agent/masnurjas.png" width="44" class="img-circle img-thumbnail">' +
							'</div>' +
							'<div class="list-text">' +
							'<span style="font-size:18px;" class="list-text-name">' + item['Agent Name'] + '</span>' +
							'<div style="font-size:13px; color:#00000;" class="list-text-info"><i class="icon-circle"></i>' +
							' ' + item['State'] + ' - ' + item['Extn'] + ' - 0 Outstanding List' +
							'</div>' +
							'</div>' +
							'</a>'
						}
					});
					var_listAgent.empty();
					var_listAgent.append(resultSourceListAgent1);
					var_listAgent2.empty();
					var_listAgent2.append(resultSourceListAgent2);
			});
			
}
function getEng(){
			var jqxhr = $.getJSON( "getEng.php", function(data) {
				  console.log( "Hai ENG" );
			
                var messageDiv = $('#1_TampungListAgentEng'); 
                messageDiv.empty();
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
    messageDiv.empty();
    //alert(ValUserID)
    $.ajax({
        type: "POST",
        url: "http://10.28.2.222/brilifecc/apps/asmx/wb_inbound.asmx/GetDataListAgentPrio",
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
        url: "http://10.28.2.222/brilifecc/apps/asmx/wb_inbound.asmx/GetDataListAgentPrio",
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