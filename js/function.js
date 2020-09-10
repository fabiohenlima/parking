$(function () {
  $(".select2").select2();
});

function send(id) {
  $(`#form_delete${id}`).submit();
}

$(document).ready(function(){
    $("#CPF").mask("999.999.999-99");
});