"use strict";
// Class definition
var showErrorMsg = function (form, type, msg) {
  var alert = $('<div class="alert alert-bold alert-solid-' + type + ' alert-dismissible" role="alert" id="my-alert">\
      <div class="alert-text">'+ msg + '</div>\
     </div>');

  form.find('.alert').remove();
  alert.prependTo(form);
  KTUtil.animateClass(alert[0], 'fadeIn animated');
}


var KTDropzoneDemo = function () {
  // Private functions

  $.validator.addMethod('customphone', function (value, element) {
    return this.optional(element) || /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(value);
  }, "Please enter a valid phone number");


  $.validator.addMethod(
    "dateFormat",
    function (value, element) {
      if (value == "") {
        return true
      }
      var check = false;

      var adata = value.split('/');
      adata = adata[0].split('-')

      var mm = parseInt(adata[1], 10);
      var dd = parseInt(adata[2], 10);
      var yyyy = parseInt(adata[0], 10);
      var xdata = new Date();

      if ((parseInt(yyyy) < parseInt(xdata.getFullYear()))) {

        check = true;
      }
      else {

        check = false;
      }
      // } 
      return check;
    },
    "DOB should be more than a year ago."
  );

  $.validator.addMethod("email", function (value, element) {
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
      return true;
    } else if (value == "") {
      return true
    }
    else {
      return false;
    }
  }, "Please enter a valid Email.");

  var btn;


  var FormdropzoneImage = function (form, file_path, image_url) {
    var failed_check = true;
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

              first_name: {
                required: true,
                maxlength: 20,
              },
              last_name: {
                required: true,
                maxlength: 20,
              },
              email: {
                required: false,
                maxlength: 100,
              },
              dob: {
                required: false,
                maxlength: 100,
                date: true,
                dateFormat: true,
                // lessThan: dateCheck,
              },
              street_address: {
                required: true,
                maxlength: 100,
              },
              city: {
                required: true,
                maxlength: 50,
              },
              state: {
                required: true,
                maxlength: 50,
              },
              zip: {
                required: true,
                maxlength: 50,
                digits: true,
              },
              outcome: {
                required: true,
                maxlength: 10,
              },
              group: {
                required: true,
                maxlength: 10,
              },
              cell: 'customphone',

              designation: {
                required: true,
                maxlength: 100,
              },

            },
            onfocusout: false,
            invalidHandler: function (form, validator) {
              var errors = validator.numberOfInvalids();
              if (errors) {
                focusElement = validator.errorList[0].element;
                validation = false;
              }
              else {
                validation = true


              }
            }
          });



          if (myDropzone.getQueuedFiles().length == 0 && $(form).valid() && $('#old_image').val() == "") {
            customFormSubmit(`/add_members/` , form , btn , 'Member Added Successfully')
            return;
          }


          if (!form.valid() && failed_check) {
            focusElement.focus();
            return
          }
          else {
            if (!validation && failed_check) {
              focusElement.focus();
              return
            }
            KTApp.progress(btn[0]);
            if (myDropzone.getQueuedFiles().length > 0) {
              console.log('uploading image')
              myDropzone.processQueue();
            }
            else {
              if ($('#old_image').val() != "") {

                console.log('form is submitting')
                customFormSubmit(`/members/${$('.id').val()}/edit/` , form , btn , 'Member Updated Successfully')
              }
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

        $('.image_url').val(response.image_url)
        $('.image_name').val(response.image_name)
        customFormSubmit(`/add_members/` , form , btn , 'Member Added Successfully')


      },
      removedfile: function (file) {

        $('.image_name,.image_url', "#old_image").val('');
        var _ref;
        return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
      },


    });

    if ($("#old_image").val() != "") {

      $("#kt_dropzone_1").html(`<img src='${$("#old_image").val()}'   class="dropzone-msg dz-message needsclick" style="max-height:100px ; max-width:150px" /> `);

    }


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




var KTInputmask = function () {

  // Private functions
  var demos = function () {

    // phone number format
    $("#kt_inputmask_3").inputmask("mask", {
      "mask": "+1(999) 999-9999"
    });

    // empty placeholder
  }
  return {
    // public functions
    init: function () {
      demos();
    }
  };
}();

jQuery(document).ready(function () {
  KTInputmask.init();
});



function customFormSubmit(url , form , btn , submitMsg){

  form.ajaxSubmit({
    url: url,
    action: "post",
    statusCode: {
      401: function () {
        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
        // showErrorMsg(form, 'danger', 'Company can not be updated.');
        showErrorMsg($('.kt-portlet__foot'), 'danger', 'Member can not be updated.');

      },
      409: function () {
        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
        // showErrorMsg(form, 'danger', 'Company name or email already exists.');
        showErrorMsg($('.kt-portlet__foot'), 'danger', 'Member name or email already exists.');
        // setTimeout(function () {
        //   $('#my-alert').fadeOut();
        //   // window.location.href = "/add_members/"
        // }, 5000);
        failed_check = false

      },

    },
    success: function (response, status, xhr, $form) {
      // similate 2s delay
      btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
      showErrorMsg($('.kt-portlet__foot'), 'success', submitMsg);

      setTimeout(function () {
        $('#company_alert').fadeOut();
        window.location.href = "/members/"
      }, 3000);


    },
    error: function (response) {
      console.log(response)
      btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
      // showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
      showErrorMsg($('.kt-portlet__foot'), 'danger', 'Something went wrong. Please try again.');
      // setTimeout(function () {
      //   $('#company_alert').fadeOut();
      //   // window.location.href = "/add_members/"
      // }, 5000);
    }

  });
}