function getData() {
    //var var_listStatusCall = $('#listStatusCall');
    console.log("run");	
    const UserName = $('#hd_sessionLogin').val();
    const NamaUserLogin = $('#hd_NameKaryawan').val();
    alert(NamaUserLogin)
    document.getElementById("iframe_wb").src = "WB/main/Out_Dashboard.html";
}
function formatWZero(tgl) {
    return (tgl < 10) ? "0" + tgl.toString() : tgl;
}
function formatTanggal(time) {
    let classDate = new Date(time);
    let formatDate = classDate.getFullYear() + "-" + formatWZero(classDate.getMonth()) + "-" + formatWZero(classDate.getDate());
    console.log(formatDate)
    return formatDate;
}