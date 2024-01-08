"use strict";
// Class definition

var KTDropzoneDemo = function () {
    // Private functions


var showErrorMsg = function(form, type, msg) {
    var alert = $('<div class="alert alert-bold alert-solid-' + type + ' alert-dismissible" role="alert">\
        <div class="alert-text">'+msg+'</div>\
       </div>');

    form.find('.alert').remove();
    alert.prependTo(form);
    KTUtil.animateClass(alert[0], 'fadeIn animated');
}


var fromSubmit = function (form,description) {
        $('.submit').click(function () {
                var focusElement;
                var validation = true;
                btn = $(this);
                form.validate({
                rules: {
                  platform: {
                    required: true,
                  },
                  app_id: {
                    required: true,
                  },
                  version: {
                    required: true,
                  },

                },
                onfocusout: false,
                invalidHandler: function(form, validator) {
                    var errors = validator.numberOfInvalids();
                    if (errors) {
                        focusElement = validator.errorList[0].element;
                    }
                }
            });
            // alert(CKEDITOR.instances[0].getData())
            // console.log(CKEDITOR.instances.editor1.getData())

                  if (CKEDITOR.instances.editor1.getData() == ''){
                      $('.ck-editor').attr("style","border:1px solid #fd397a;border-radius:5px");
                      $('.ck-editor-error').show();
                      var validation = false;
                  }
                  else{
                      $('.ck-editor').removeAttr("style");
                      $('.ck-editor-error').hide();
                  }

                  if ($('.app-selectpicker').val().length == 0){
                        $('.app-selectpicker').closest('.dropdown').attr("style","border:1px solid #fd397a;border-radius:5px");
                        $('.app-error').show();
                        var validation = false;
                  }
                  else{
                      $('.app-selectpicker').closest('.dropdown').removeAttr("style");
                      $('.app-error').hide();
                  }


              if (!form.valid()) {
                  focusElement.focus();
                  return
                }
              else{
                if (!validation){
                    focusElement.focus();
                    return
                }
                KTApp.progress(btn[0]);
                showErrorMsg($('.kt-portlet__foot'), 'info', 'Uploading data.');
                var formData = new FormData($('.version_form')[0])
                formData.append('desc',CKEDITOR.instances.editor1.getData());
                if ($('#kt_datetimepicker_3').val() == '')
                    formData.append('timestamp',moment().format('YYYY-MM-DD HH:mm'));

                $.ajax({
                    type: "POST",
                    data: formData,
                    processData: false,                          // Using FormData, no need to process data.
                    contentType:false,
                    success: function (response, status, xhr) {
                        showErrorMsg($('.kt-portlet__foot'), 'success',  response.developer_message);
                        KTApp.unprogress(btn[0]);
                        window.location.href = "/version_history/";
                    },
                    error: function (xhr, sttus, error) {
                        KTApp.unprogress(btn[0]);
                        var err = JSON.parse(xhr.responseText);
                        KTApp.unprogress(btn);
                        showErrorMsg($('.kt-portlet__foot'), 'danger', err.developer_message);

                    },
                })
              }


})


}

var btn;


    return {
        // public functions
        init: function(form,description) {
            fromSubmit(form,description)
        }
    };
}();

