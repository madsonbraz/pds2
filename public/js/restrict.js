$(function(){
    $("#btn_add_course").click(function(){
        clearErrors();
        $("#form_course")[0].reset();
        $("#course_img_path").attr("src","");
        $("#modal_course").modal();
    });

    $("#btn_add_member").click(function(){
        clearErrors();
        $("#form_member")[0].reset();
        $("#member_photo_path").attr("src","");
        $("#modal_member").modal();
    });

    $("#btn_add_user").click(function(){
        clearErrors();
        $("#form_user")[0].reset();
        $("#modal_user").modal();
    });

    $("#btn_upload_course_img").change(function(){
        uploadImg($(this), $("#course_img_path"),$("#course_img"));
    });

    $("#btn_upload_member_photo").change(function(){
        uploadImg($(this), $("#member_photo_path"),$("#member_photo"));
    });

    $("#form_course").submit(function(){
        $.ajax({
            type: "POST",
            url: BASE_URL + "restrito/ajax_save_course",
            dataType: "json",
            data: $(this).serialize(),
            beforeSend: function(){
                clearErrors();
                $("#btn_save_course").siblings(".help-block").html(loadingImg("Verificando..."));
            },
            success: function(response){
                clearErrors();
                if (response["status"]){
                    $("#modal_course").modal("hide");
                }else{
                    showErrorsModal(response["error_list"])
                }
            }
        })
        return false;
    });

    $("#form_member").submit(function(){
        $.ajax({
            type: "POST",
            url: BASE_URL + "restrito/ajax_save_member",
            dataType: "json",
            data: $(this).serialize(),
            beforeSend: function(){
                clearErrors();
                $("#btn_save_member").siblings(".help-block").html(loadingImg("Verificando..."));
            },
            success: function(response){
                clearErrors();
                if (response["status"]){
                    $("#modal_member").modal("hide");
                }else{
                    showErrorsModal(response["error_list"])
                }
            }
        })
        return false;
    });

    $("#form_user").submit(function(){
        $.ajax({
            type: "POST",
            url: BASE_URL + "restrito/ajax_save_user",
            dataType: "json",
            data: $(this).serialize(),
            beforeSend: function(){
                clearErrors();
                $("#btn_save_user").siblings(".help-block").html(loadingImg("Verificando..."));
            },
            success: function(response){
                clearErrors();
                if (response["status"]){
                    $("#modal_user").modal("hide");
                }else{
                    showErrorsModal(response["error_list"])
                }
            }
        })
        return false;
    });

    $("#btn_your_user").click(function(){
        $.ajax({
            type: "POST",
            url: BASE_URL + "restrito/ajax_get_user_data",
            dataType: "json",
            data: {"user_id": $(this).attr("user_id")},
            
            success: function(response){
                clearErrors();
                $("#form_user")[0].reset();
                $.each(response["input"], function(id, value){
                    $("#"+id).val(value);
                });
                $("#modal_user").modal();
            }
        })
        return false;
    });

    function active_btn_course(){
        $(".btn-edit-course").click(function(){
            $.ajax({
                type: "POST",
                url: BASE_URL + "restrito/ajax_get_course_data",
                dataType: "json",
                data: {"course_id": $(this).attr("course_id")},
                
                success: function(response){
                    clearErrors();
                    $("#form_course")[0].reset();
                    $.each(response["input"], function(id, value){
                        $("#"+id).val(value);
                    });
                    $("#course_img_path").attr("src", response["img"]["course_img"]);
                    $("#modal_course").modal();
                }
            })

        })
    }
    var dt_course = $("#dt_courses").DataTable({
        
		"autoWidth": false,
		"processing": true,
        "serverSide": true,
        "ajax": {
            "url": BASE_URL + "restrito/ajax_list_course",
            "type": "POST",
        },
        "columnDefs": [
			{ targets: "no-sort", orderable: false },
			{ targets: "dt-center", className: "dt-center" },
		],
        "initComplete": function(){
            active_btn_course();
        }
    });

    var dt_member = $("#dt_team").DataTable({
        
		"autoWidth": false,
		"processing": true,
        "serverSide": true,
        "ajax": {
            "url": BASE_URL + "restrito/ajax_list_member",
            "type": "POST",
        },
        "columnDefs": [
			{ targets: "no-sort", orderable: false },
			{ targets: "dt-center", className: "dt-center" },
		]
    });

    var dt_user = $("#dt_users").DataTable({
        
		"autoWidth": false,
		"processing": true,
        "serverSide": true,
        "ajax": {
            "url": BASE_URL + "restrito/ajax_list_user",
            "type": "POST",
        },
        "columnDefs": [
			{ targets: "no-sort", orderable: false },
			{ targets: "dt-center", className: "dt-center" },
		]
    });
})
