function getData() {
    //var var_listStatusCall = $('#listStatusCall');
    console.log("run");
    var resourceListReasonStatus = "";
    var jsonText = JSON.stringify({ BulanNya: "7",TahunNya: "2022",JenisReport: "Performance",TypeReport: "Non Call",SkillAgent: "Video Banking",UserName: "90135204" });
    $.ajax({
        type: "POST",
        url: "http://localhost/brilifecc/apps/asmx/WS_QM_Wallboard.asmx/WS_DataWB2Monthly",
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
                $('#valEffective').text(parseFloat(json[i].effective_time).toFixed(2));
                $('#valSkor').text(parseFloat(json[i].productivity_score).toFixed(2));
                $('#valMonitor').text(parseFloat(json[i].monitoring_score).toFixed(2));
                $('#valKuis').text(parseFloat(json[i].quiz).toFixed(2));
                $('#valSus').text(parseFloat(json[i].sustainability).toFixed(2));
                $('#valKualitas').text(parseFloat(json[i].quality_score).toFixed(2));
                $('#valTotal').text(parseFloat(json[i].total).toFixed(2));
              
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