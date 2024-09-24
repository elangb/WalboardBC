

function getData() {
    console.log(new URLSearchParams(window.location.search))
    //runningText();
    filteValues();
    summaryCall();
    //durationCall();
    comboboxAccount();
    summaryData();
    MailQiwing();
    setInterval(() => {
        tanggal_pojok_kanan()
    }, 1000)
}
function getDataPrimary() {
    const UserName = $('#hd_sessionLogin').val();
    const NamaUserLogin = $('#hd_NameKaryawan').val();
    const ComboAccount = $('#ComboAccount').val();

    console.log(UserName);
    console.log(NamaUserLogin);
    document.getElementById("FrameDashboardMail").src = "WB/main/DashboardMail.html?UserName=" + UserName + "&NamaUserLogin=" + NamaUserLogin + "&ComboAccount=" + ComboAccount;
}
function getUrlParameter(params) {
    var results = new RegExp("[?&]" + params + "=([^&#]*)").exec(
        window.location.href
    );
    return results ? decodeURI(results[1]) : null;
}
function runningText() {
    console.log(getUrlParameter("NamaUserLogin"))
    $('#userName').text(getUrlParameter("NamaUserLogin") ?? "")
}
function getCookie(cookieName, is_other=false) {
	console.log("document.cookie", document.cookie)
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value, other] = el.split('=');
	if(is_other) {
		cookie[key.trim()] = other;
	} else {
		cookie[key.trim()] = value;
	}
  })
  return cookie[cookieName];
}

function tanggal_pojok_kanan() {
    let date = new Date;

    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    $("#tgl_kanan_pojok").text(`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} | ${days[date.getDay()]} | ${date.getHours()}:${(date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()} WIB`);
}
//function filteValues() {
//    let date = new Date;
//    let current_date = date.getFullYear() + "-" + ((date.getMonth() < 10) ? "0" : "") + date.getMonth() + "-" + ((date.getDate() < 10) ? "0" : "") + date.getDate();
//    console.log("Tanggal Today " + current_date)
//    $('#start_date').val(getUrlParameter("start_date") ?? current_date)
//    $('#end_date').val(getUrlParameter("end_date") ?? current_date)
//    $('#ComboAccount').val(getUrlParameter("ComboAccount") ?? "")
//}
function filteValues() {
    let date = new Date;
    let current_date = date.getFullYear() + "-" + (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + "-" + (((date.getDate()) < 10) ? "0" : "") + date.getDate();
    console.log("Tanggal Today " + current_date)
    $('#start_date').val(getUrlParameter("start_date") ?? current_date)
    $('#end_date').val(getUrlParameter("end_date") ?? current_date)
    $('#ComboAccount').val(getUrlParameter("ComboAccount") ?? "")
}
function summaryCall() {
    console.log("summaryCall", { UserName: getCookie('CookiesUserName', true), Account: decodeURIComponent(getUrlParameter("ComboAccount")) + ";", XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() })
    $.ajax({
        type: "POST",
        url: "../../asmx/TrmMailSystem.asmx/V2_UIDESK_SummaryAgentMail",
        data: JSON.stringify({ UserName: getCookie('CookiesUserName', true), Account: decodeURIComponent(getUrlParameter("ComboAccount")) + ";", XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
			console.log(result)
            let datas = JSON.parse(result.d);
            let trows = ""
			datas.forEach(data => {
                trows += `<tr>
                            <td width="150" style="text-align:left;"><span class="badge badge-pill badge-light" style="width:150px;text-align:left;"><b>${data.AgentName}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-primary"><b>${data.EmailReceived}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-success"><b>${data.EmailResponse}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-danger"><b>${data.EmailNotResponse}</b></span></td>
                        </tr>`
            });

            $('#table-summary tbody').html(trows)
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//function durationCall() {
//    $.ajax({
//        type: "POST",
//        url: "../../../asmx/TrmMailSystem.asmx/V2_DashboardDurationCall",
//        data: JSON.stringify({ UserName: 'Admin', XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() }),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            let datas = JSON.parse(result.d);
//            let trows = ""
//            datas.forEach(data => {
//                trows += `<tr>
//                    <td width="200"><span class="badge badge-pill badge-light" style="width:180px"><b>${data.AgentName}</b></span></td>
//                    <td width="200"><span class="badge badge-pill badge-primary"><b>${data.Duration}</b></span></td>
//                    <td width="120"><span class="badge badge-pill badge-warning"><b>${data.TotalCall}</b></span></td>                   
//                </tr>`
//            });
//            $('#table-duration').html(trows)
//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
//}
function summaryData() {
    console.log("summaryData", { UserName: getCookie('CookiesUserName', true), Account: decodeURIComponent(getUrlParameter("ComboAccount"))+";", XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() })
    $.ajax({
        type: "POST",
        url: "../../asmx/TrmMailSystem.asmx/V2_Dashboard_Email_Summary",
        data: JSON.stringify({ UserName: getCookie('CookiesUserName', true), Account: decodeURIComponent(getUrlParameter("ComboAccount"))+";", XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            let datas = JSON.parse(result.d);
            console.log("summaryData", datas)
            $('#EmailReceived').text(datas[0].EmailReceived)
            $('#EmailResponse').text(datas[0].EmailResponse)
            $('#EmailNotResponse').text(datas[0].EmailNotResponse)
            $('#EmailQiwing').text(datas[0].EmailQiwing)
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function comboboxAccount() {
    var ComboAccount = $('#ComboAccount');
    $.ajax({
        type: "POST",
        url: "../../asmx/TrmMailSystem.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({ TrxID: '0', TrxUserName: getCookie('CookiesUserName', true), TrxAction: "UIDESK78" }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
			console.log("comboboxAccount", data)

            var json = JSON.parse(data.d);
            var i, x, ResultFrom = "";
			
            for (i = 0; i < json.length; i++) {
                ResultFrom += '<option value="' + json[i].incoming_account_name + '">' + json[i].incoming_account_name + '</option>';
                
            }
			$('#ComboAccount').html(ResultFrom);

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function MailQiwing() {
    console.log("MailQiwing", { UserName: getCookie('CookiesUserName', true), XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() })
    $.ajax({
        type: "POST",
        url: "../../asmx/TrmMailSystem.asmx/V2_UIDESK_QiwingMail",
        data: JSON.stringify({ UserName: getCookie('CookiesUserName', true), Account: decodeURIComponent(getUrlParameter("ComboAccount")) + ";", XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            let datas = JSON.parse(result.d);
            let trows = ""
            datas.forEach(data => {

                var d = new Date(data.Email_Date);
                var milisegundos = parseInt(data.Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                trows += `<tr>
                            <td width="150" style="text-align:left;"><span class="badge badge-pill badge-light" style="width:150px;text-align:left;"><b>${data.ETO}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-light"><b>${data.EFROM}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-light"><b>${data.ESUBJECT}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-light"><b>${ newDate + " " + newTime}</b></span></td>
                        </tr>`
            });

            $('#table-qiwing tbody').html(trows)
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}