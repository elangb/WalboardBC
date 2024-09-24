function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getData_Sosmed() {
    //var var_listStatusCall = $('#listStatusCall');
    console.log("run sosmed");
	const PnLogin = $('#hd_sessionLogin').val();
	const TypeCall =$('#QM_TypeCall').val();
	const Layanan =$('#QM_GroupLayanan').val();
    var resourceListReasonStatus = "";
	console.log(getParameterByName("tahun"));
    jsonText = JSON.stringify({ BulanNya: getParameterByName("bulan"),TahunNya: getParameterByName("tahun"),JenisReport: "Performance",TypeReport: getParameterByName("type"),SkillAgent: getParameterByName("skill"),UserName: getParameterByName("username") });
    $.ajax({
        type: "POST",
        url: "../../asmx/WS_QM_Wallboard.asmx/WS_DataWB2Monthly",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSourceEscalation = "";
            console.log(json);
            /*var fileBusy = "img/icon/busy.png";
            var fileDone = "img/icon/checked.png";
            var fileNo = "img/icon/noanswer.png";
            var fileUn = "img/icon/unregistered.png";
            var fileWrong = "img/icon/call.png";
			var fileAnswer = "img/icon/answerunfollow.png";
            var gambarIconCallStatus = 0;*/
           
            for (i = 0; i < json.length; i++) {
                
                //alert();
                //alert(json[i].UserCreate);
                $('#valName').text(json[i].name);
                $('#valSkill').text(json[i].skill);
                $('#valLogin').text(json[i].lateness);
                $('#valHadir').text(json[i].attendance);
                $('#valCase').text(parseFloat(json[i].case).toFixed(2));
                $('#valSkor').text(parseFloat(json[i].productivity_score).toFixed(2));
                $('#valMonitor').text(parseFloat(json[i].monitoring_score).toFixed(2));
                $('#valKuis').text(parseFloat(json[i].quiz).toFixed(2));
                $('#valSus').text(parseFloat(json[i].sustainability).toFixed(2));
                $('#valKualitas').text(parseFloat(json[i].quality_score).toFixed(2));
                $('#valTotal').text(parseFloat(json[i].total).toFixed(2));
				console.log(json[i].URL);
				document.getElementById("fotoAgent").src = "../../../filefoto/"+json[i].URL;
                /*
                valQuiz
                valOut
                valContacted
                valSales
                valRevenue
                valKehadiran
                valLatenes
                valScore
                */
                /*json[i].quiz
                json[i].outgoing
                json[i].contacted_rate
                json[i].sales_volume
                json[i].revenue
                json[i].kehadiran
                json[i].lateness
                json[i].Score*/
                
            }
            
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}