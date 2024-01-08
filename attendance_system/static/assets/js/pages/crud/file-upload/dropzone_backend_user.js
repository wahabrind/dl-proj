"use strict";
// Class definition

var KTDropzoneDemo = function () {
    // Private functions

    $.validator.addMethod('customphone', function (value, element) {
        return this.optional(element) || /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(value);
    }, "Please enter a valid phone number");

    $.validator.addMethod('username', function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9.\-_$@*!]{3,30}$/.test(value);
    }, "Please enter a valid username");


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
                            first_name: {
                                required: true,
                                maxlength: 2500,
                            },
                            last_name: {
                                required: true,
                                maxlength: 200,
                            },
                            email: {
                                email: true,
                                required: true,
                                maxlength: 200,
                            },
                            username: 'username',
                            cell: 'customphone',
                            location: {
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
                            myDropzone.processQueue();
                        }
                        else {
                            // showErrorMsg($('.kt-portlet__foot'), 'success', 'Updating Data.');
                            form.submit();
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

                $('.image_name').val(response.image_name)
                form.submit();
                showErrorMsg($('.kt-portlet__foot'), 'success', 'User Added Successfully');
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

