const BASE_URL = "localhost/pds2/";

function clearErrors(){
    $(".has-error").removeClass("has-error");
    $(".help-block").html("");
}

function showErrors(erro_list){
    clearErrors();

    $.each(error_list, function(id, message){
        $(id).parent().parent().addClass("has-error");
        $(id).parent().siblings(".help-block").html(message);
    })
}

function loading(message=""){
    return "<i class='fa da-circle-notch fa-spin'></i>$nbsp;" + message
}
