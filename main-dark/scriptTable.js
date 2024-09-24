$(document).ready(function() {
  console.log("Adad");
  pageScroll();
  $("#contain").mouseover(function() {
    clearTimeout(my_time);
  }).mouseout(function() {
    pageScroll();
  });
  
  getWidthHeader('table_fixed','table_scroll');
  
});

var my_time;
function pageScroll() {
	var objDiv = document.getElementById("contain");
  objDiv.scrollTop = objDiv.scrollTop + 1;  
  if ((objDiv.scrollTop + 100) == objDiv.scrollHeight) {
    objDiv.scrollTop = 0;
  }
  my_time = setTimeout('pageScroll()', 25);
}

function getWidthHeader(id_header, id_scroll) {
  var colCount = 0;
  $('#' + id_scroll + ' tr:nth-child(1) td').each(function () {
    if ($(this).attr('colspan')) {
      colCount += +$(this).attr('colspan');
    } else {
      colCount++;
    }
  });
  
  for(var i = 1; i <= colCount; i++) {
    var th_width = $('#' + id_scroll + ' > tbody > tr:first-child > td:nth-child(' + i + ')').width();
    $('#' + id_header + ' > thead th:nth-child(' + i + ')').css('width',th_width + 'px');
  }
}