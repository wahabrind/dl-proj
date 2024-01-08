"use strict";
// Class definition

var KTDropzoneDemo = function () {
  // Private functions

  $.validator.addMethod('customphone', function (value, element) {
    return this.optional(element) || /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(value);
  }, "Please enter a valid phone number");

  var showErrorMsg = function (form, type, msg) {
    var alert = $('<div class="alert alert-bold alert-solid-' + type + ' alert-dismissible" role="alert" id="company_alert">\
        <div class="alert-text">'+ msg + '</div>\
       </div>');

    form.find('.alert').remove();
    alert.prependTo(form);
    KTUtil.animateClass(alert[0], 'fadeIn animated');
  }

  var btn;


  var FormdropzoneImage = function (form, file_path, image_url) {

    var focusElement;
    var id = '#kt_dropzone_1';
    var myDropzone = new Dropzone(id, {
      url: "/s3_image_upload/", // Set the url for your upload script location
      paramName: "image", // The name that will be used to transfer the file
      maxFiles: 1,
      maxFilesize: 6, // MB
      acceptedFiles: "image/*",
      autoProcessQueue: false,
      addRemoveLinks: true,
      init: function (submit_click) {

        var submitButton = document.querySelector(".submit");
        submitButton.addEventListener("click", function (e) {

          btn = $(this);
          var validation = true;

          form.validate({
            rules: {
              company_name: {
                required: true,
                maxlength: 50,
              },
              company_phone: 'customphone',
              company_email: {
                required: true,
                maxlength: 200,
              },
              company_location: {
                required: true,
                maxlength: 200,
              },
            },
            onfocusout: false,
            invalidHandler: function (form, validator) {
              var errors = validator.numberOfInvalids();
              if (errors) {
                focusElement = validator.errorList[0].element;
              }
            }
          });




          if (myDropzone.getQueuedFiles().length > 0) {
            $('.dropzone').removeAttr("style")
            $('.dropzone-error').hide();
          }
          else {
            if ($('.image_url').val() == "") {
              validation = false;
              $('.dropzone-error').show();
              $('.dropzone').attr("style", "border:1px solid #fd397a;border-radius:5px");
            }
          }
          if (!form.valid()) {
            focusElement.focus();
            return
          }
          else {
            if (!validation) {
              focusElement.focus();
              return
            }
            KTApp.progress(btn[0]);
            if (myDropzone.getQueuedFiles().length > 0) {
              // showErrorMsg($('.kt-portlet__foot'), 'info', 'Uploading Image.');
              setTimeout(function() {
                $('#company_alert').fadeOut();
           }, 5000);
              myDropzone.processQueue();
            }
            else {
              // showErrorMsg($('.kt-portlet__foot'), 'success', 'Updating Data.');
              setTimeout(function() {
                $('#company_alert').fadeOut();
           }, 5000);




              

        form.ajaxSubmit({
          url: '/add_companies/',
          action: "post",
          statusCode: {
            401: function () {
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
              // showErrorMsg(form, 'danger', 'Company can not be updated.');
              showErrorMsg($('.kt-portlet__foot'), 'danger', 'Company can not be updated.');
          //     setTimeout(function() {
          //       $('#company_alert').fadeOut();
          //  }, 5000);
            },
            409: function () {
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
              // showErrorMsg(form, 'danger', 'Company name or email already exists.');
              showErrorMsg($('.kt-portlet__foot'), 'danger', 'Company name or email already exists.');
          //     setTimeout(function() {
          //       $('#company_alert').fadeOut();
          //  }, 5000);
            },

          },
          success: function (response, status, xhr, $form) {
            // similate 2s delay
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            // showErrorMsg(form, 'success', 'Company added successfully.');
            showErrorMsg($('.kt-portlet__foot'), 'success', 'Company added successfully.');
            setTimeout(function() {
              $('#company_alert').fadeOut();
              window.location.href = '/';
         }, 3000);
            $('.edit_modal').modal('toggle');


          },
          error: function (response) {
            console.log(response)
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            // showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
            showErrorMsg($('.kt-portlet__foot'), 'success', 'Something went wrong. Please try again.');
        //     setTimeout(function() {
        //       $('#company_alert').fadeOut();
        //  }, 5000);
          }

        });

            }
          }
        });
        this.on("sending", function (file, xhr, formData) {
          // Will send the filesize along with the file as POST data.

          formData.append("csrfmiddlewaretoken", $('input[name="csrfmiddlewaretoken"]').val());
          formData.append("file_path", file_path);
        });

      },
      success: function (file, response) {

        // showErrorMsg($('.kt-portlet__foot'), 'success', 'Image Uploaded');
        // KTApp.unprogress(btn[0]);

        $('.image_url').val(response.image_url)

        $('.image_name').val(response.image_name)
        // form.submit();


        form.ajaxSubmit({
          url: '/add_companies/',
          action: "post",
          statusCode: {
            401: function () {
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
              // showErrorMsg(form, 'danger', 'Company can not be updated.');
              showErrorMsg($('.kt-portlet__foot'), 'danger', 'Company can not be updated.');
          //     setTimeout(function() {
          //       $('#company_alert').fadeOut();
          //  }, 5000);
            },
            409: function () {
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
              // showErrorMsg(form, 'danger', 'Company name or email already exists.');
              showErrorMsg($('.kt-portlet__foot'), 'danger', 'Company name or email already exists.');
          //     setTimeout(function() {
          //       $('#company_alert').fadeOut();
          //  }, 5000);
            },

          },
          success: function (response, status, xhr, $form) {
            // similate 2s delay
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            // showErrorMsg(form, 'success', 'Company added successfully.');
            showErrorMsg($('.kt-portlet__foot'), 'success', 'Company added successfully.');
            setTimeout(function() {
              $('#company_alert').fadeOut();
              window.location.href = '/';
         }, 3000);
            $('.edit_modal').modal('toggle');


          },
          error: function (response) {
            console.log(response)
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            // showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
            showErrorMsg($('.kt-portlet__foot'), 'success', 'Something went wrong. Please try again.');
        //     setTimeout(function() {
        //       $('#company_alert').fadeOut();
        //  }, 5000);
          }

        });




        // KTApp.unprogress(btn[0]);

      },
      removedfile: function (file) {

        $('.image_name,.image_url').val('');
        var _ref;
        return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
      },


    });
    if (image_url != "") {
      let mockFile = { name: "", size: 0 };
      myDropzone.displayExistingFile(mockFile, image_url);
      $('.dz-size,.dz-filename').hide();
    }


  }

  if ($("#old_image").val() != "") {

    $("#kt_dropzone_1").html(`<img src='${$("#old_image").val()}'   class="dropzone-msg dz-message needsclick" style="max-height:100px ; max-width:150px" /> `);

  }
  var UserProfiledropZoneImage = function () {

  }

  return {
    // public functions
    init: function (form, file_path, image_url) {
      FormdropzoneImage(form, file_path, image_url);
      UserProfiledropZoneImage(form, file_path, image_url);

    }
  };
}();

