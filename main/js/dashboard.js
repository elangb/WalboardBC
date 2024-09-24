
$(document).ready(function () {
    getDataPrimary()
});

function getData() {
    console.log(new URLSearchParams(window.location.search))
    //runningText();
    filteValues();
    summaryCall();
    //durationCall();
    summaryData();


    setInterval(() => {
        tanggal_pojok_kanan()
    }, 1000)
}

function getDataPrimary() {
    const UserName = $('#hd_sessionLogin').val();
    const NamaUserLogin = $('#hd_NameKaryawan').val();

    console.log(UserName);
    console.log(NamaUserLogin);
    document.getElementById("iframe_wb").src = "WB/main/Out_Dashboard.html?UserName=" + UserName + "&NamaUserLogin=" + NamaUserLogin;
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

function tanggal_pojok_kanan() {
    let date = new Date;


    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];

    $("#tgl_kanan_pojok").text(`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} | ${days[date.getDay()]} | ${date.getHours()}:${(date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()} WIB`);
}

function filteValues() {
    let date = new Date;
    let current_date = date.getFullYear() + "-" + ((date.getMonth() < 10) ? "0" : "") + date.getMonth() + "-" + ((date.getDate() < 10) ? "0" : "") + date.getDate();
    console.log(current_date)
    $('#start_date').val(getUrlParameter("start_date") ?? current_date)
    $('#end_date').val(getUrlParameter("end_date") ?? current_date)
}

function summaryCall() {
    $.ajax({
        type: "POST",
        url: "../../asmx/TrmMailSystem.asmx/V2_DashboardSummaryCall",
        data: JSON.stringify({ UserName: 'Admin', XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            let datas = JSON.parse(result.d);
            let trows = ""
            datas.forEach(data => {
                trows += `<tr>
                            <td width="30" style="text-align:left;"><span class="badge badge-pill badge-light" style="width:30px;text-align:left;"><b>${data.No}</b></span></td>
                            <td width="150" style="text-align:left;"><span class="badge badge-pill badge-light" style="width:150px;text-align:left;"><b>${data.AgentName}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-primary"><b>${data.DistributeCall}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-success"><b>${data.DataCall}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-danger"><b>${data.DataNotCall}</b></span></td>
                            <td width="150" style="text-align:center;"><span class="badge badge-pill badge-warning"><b>${data.CompleteCall}</b></span></td>
                            <td width="160" style="text-align:center;"><span class="badge badge-pill badge-default"><b>${data.AnotherCall}</b></span></td>
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
    console.log({ UserName: 'Admin', XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() })
    $.ajax({
        type: "POST",
        url: "../../asmx/TrmMailSystem.asmx/V2_DashboardSummaryData",
        data: JSON.stringify({ UserName: 'Admin', XStartDate: $('#start_date').val(), XEndDate: $('#end_date').val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            let datas = JSON.parse(result.d);
            console.log(datas)
            $('#DistibuteDataCalls').text(datas[0].DistibuteDataCalls)
            $('#DataCalls').text(datas[0].DataCalls)
            $('#DataNotCalls').text(datas[0].DataNotCalls)
            $('#DataCompleteCall').text(datas[0].DataCompleteCall)
            $('#DataNotCompleteCalls').text(datas[0].DataNotCompleteCalls)
            $('#TodayAgentLogin').text(datas[0].AgentLogin)
            $('#TodayAgentNotLogin').text(datas[0].AgentNotLogin)
            $('#TodayAgentAUX').text(datas[0].AgentAUX)
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}