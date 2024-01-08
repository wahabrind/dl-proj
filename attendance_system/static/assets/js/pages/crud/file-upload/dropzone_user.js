"use strict";
// Class definition

var KTDropzoneDemo = function () {
  // Private functions

  var failed_check = true;
  var showErrorMsg = function (form, type, msg) {
    var alert = $('<div class="alert alert-bold alert-solid-' + type + ' alert-dismissible" role="alert">\
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
              short_description: {
                required: true,
                maxlength: 2500,
              },
              title: {
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


          if (failed_check == false) {
            form.ajaxSubmit({
              url: '/add-user/',
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
                  showErrorMsg($('.kt-portlet__foot'), 'danger', 'username or email is already taken');
                  // setTimeout(function () {
                  //   $('#my-alert').fadeOut();
                  //   // window.location.href = "/add-user/"
                  // }, 5000);
                  failed_check = false

                },

              },
              success: function (response, status, xhr, $form) {
                // similate 2s delay
                btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                // if (url == `/add_user/`)
                //   showErrorMsg($('.kt-portlet__foot'), 'success', 'User Added Successfully');
                // else
                showErrorMsg($('.kt-portlet__foot'), 'success', 'User Added Successfully');
                // showErrorMsg(form, 'success', 'Company added successfully.');
                setTimeout(function () {
                  // $('#company_alert').fadeOut();
                  window.location.href = '/users/';
                  // window.location.href = "/add_members/"
                }, 3000);



              },
              error: function (response) {
                console.log(response)
                btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                // showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
                showErrorMsg($('.kt-portlet__foot'), 'danger', 'Something went wrong. Please try again.');
                // setTimeout(function () {
                //   $('#company_alert').fadeOut();
                //   // window.location.href = "/add-user/"
                // }, 5000);
                failed_check = false
              }

            });

          }





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
              myDropzone.processQueue();
            }
            else {
              // showErrorMsg($('.kt-portlet__foot'), 'success', 'Updating Data.');
              // form.submit();
              if ($('#old_image').val() != "") {
                form.ajaxSubmit({
                  url: `/users/${$('.id').val()}/edit/`,
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
                      showErrorMsg($('.kt-portlet__foot'), 'danger', 'username or email is already taken');
                      // setTimeout(function () {
                      //   $('#my-alert').fadeOut();
                      //   // window.location.href = "/add-user/"
                      // }, 5000);
                      // failed_check = false

                    },

                  },
                  success: function (response, status, xhr, $form) {
                    // similate 2s delay
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    // if (url == `/add_user/`)
                    //   showErrorMsg($('.kt-portlet__foot'), 'success', 'User Added Successfully');
                    // else
                    showErrorMsg($('.kt-portlet__foot'), 'success', 'User Updated Successfully');
                    // showErrorMsg(form, 'success', 'Company added successfully.');
                    setTimeout(function () {
                      // $('#company_alert').fadeOut();
                      window.location.href = '/users/';
                      // window.location.href = "/add_members/"
                    }, 3000);


                  },
                  error: function (response) {
                    console.log(response)
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    // showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
                    showErrorMsg($('.kt-portlet__foot'), 'danger', 'Something went wrong. Please try again.');
                    // setTimeout(function () {
                    //   $('#company_alert').fadeOut();
                    //   // window.location.href = "/add-user/"
                    // }, 5000);
                  }

                });
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
        // showErrorMsg($('.kt-portlet__foot'), 'success', 'Image Uploaded');


        $('.image_url').val(response.image_url)

        console.log($('.image_url').val())
        $('.image_name').val(response.image_name)
        // form.submit();

        var url = '';
        if ($('.old_image').val() == '') {
          url = '/add-user/';
        } else {

          url = `/users/${$('.id').val()}/edit/`
        }

        // alert(url)
        form.ajaxSubmit({
          url: '/add-user/',
          action: "post",
          statusCode: {
            401: function () {
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
              // showErrorMsg(form, 'danger', 'Company can not be updated.');
              showErrorMsg($('.kt-portlet__foot'), 'danger', 'Member can not be updated.');
              failed_check = false;

            },
            409: function () {
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
              // showErrorMsg(form, 'danger', 'Company name or email already exists.');
              showErrorMsg($('.kt-portlet__foot'), 'danger', 'username or email is already taken');
              // setTimeout(function () {
              //   $('#my-alert').fadeOut();
              //   // window.location.href = "/add-user/"
              // }, 5000);
              failed_check = false

            },

          },
          success: function (response, status, xhr, $form) {
            // similate 2s delay
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            // if (url == `/add_user/`)
            //   showErrorMsg($('.kt-portlet__foot'), 'success', 'User Added Successfully');
            // else
            showErrorMsg($('.kt-portlet__foot'), 'success', 'User Added Successfully');
            // showErrorMsg(form, 'success', 'Company added successfully.');
            setTimeout(function () {
              // $('#company_alert').fadeOut();
              window.location.href = '/users/';
              // window.location.href = "/add_members/"
            }, 3000);



          },
          error: function (response) {
            console.log(response)
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            // showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
            showErrorMsg($('.kt-portlet__foot'), 'danger', 'Something went wrong. Please try again.');
            // setTimeout(function () {
            //   $('#company_alert').fadeOut();
            //   // window.location.href = "/add-user/"
            // }, 5000);
            failed_check = false
          }

        });











        // showErrorMsg($('.kt-portlet__foot'), 'success', 'User Added Successfully');
        KTApp.unprogress(btn[0]);
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