$(document).ready(function () {
    
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function DialCall() {
    swal({
        title: "Do you want to call?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                console.log("Dial Call");
                const Http = new XMLHttpRequest();
                const url = "http://localhost:60024/dial/telp=" + getParameterByName("phonenumber")
                console.log("url" + url)
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)
                    var drop = ""
                    drop = '<div id="chat-box-bodyDrop">' +
                        '<div id ="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-danger l-h-70">' +
                        '<div id="chat-overlay"></div>' +
                        '<span class="mdi mdi-phone-locked font-size-30"></span>' +
                        '</div>' +
                        '</div>'
                    $("#chat-box-bodyDrop").append(drop)
                }


            } else {
                window.location.reload();
            }
        });
}
function DropCall() {
    swal({
        title: "Do you want to drop?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                console.log("Drop Call");
                const Http = new XMLHttpRequest();
                const url = "http://localhost:60024/drop/telp=" + getParameterByName("phonenumber")
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)
                    //window.close();
                }


            }
        });
}
function ModalCall() {
    $("#Modal-Call").modal('show');
}
