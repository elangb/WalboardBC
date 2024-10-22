function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getData_Telesales() {
    //var var_SessionLogin = $('#hd_sessionLogin').val();
	const PnLogin = $('#hd_sessionLogin').val();
	const TypeCall =$('#QM_TypeCall').val();
	const Layanan =$('#QM_GroupLayanan').val();
	
    console.log("run telesales");
	console.log(getParameterByName("tahun"));
    var resourceListReasonStatus = "";
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
                $('#valRatas').text(parseFloat(json[i].ratas_qa).toFixed(2));
                $('#valQuiz').text(parseFloat(json[i].quiz).toFixed(2));
                $('#valOut').text(parseFloat(json[i].outgoing).toFixed(2));
                $('#valContacted').text(parseFloat(json[i].contacted_rate).toFixed(2));
                $('#valSales').text(parseFloat(json[i].sales_volume).toFixed(2));
                $('#valRevenue').text(parseFloat(json[i].revenue).toFixed(2));
                $('#valKehadiran').text(parseFloat(json[i].kehadiran).toFixed(2));
                $('#valLatenes').text(parseFloat(json[i].lateness).toFixed(2));
                $('#valScore').text(parseFloat(json[i].Score).toFixed(2));
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