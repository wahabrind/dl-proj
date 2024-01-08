"use strict";

// Class definition
var KTWizard2 = function () {
    // Base elements
    var wizardEl;
    var formEl;
    var validator;
    var wizard;

    $.validator.addMethod('username', function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9.\-_$@*!]{3,30}$/.test(value);
    }, "Please enter a valid username");

    var showErrorMsg = function (form, type, msg) {
        var alert = $('<div class="alert alert-bold alert-solid-' + type + ' alert-dismissible" role="alert" id="user_profile_alert">\
            <div class="alert-text">'+ msg + '</div>\
           </div>');

        form.find('.alert').remove();
        alert.prependTo(form);
        KTUtil.animateClass(alert[0], 'fadeIn animated');
    }


    // Private functions
    var initWizard = function () {
        // Initialize form wizard
        wizard = new KTWizard('kt_wizard_v2', {
            startStep: 1, // initial active step number
            clickableSteps: true  // allow step clicking
        });

        // Validation before going to next page
        wizard.on('beforeNext', function (wizardObj) {
            if (validator.form() !== true) {
                wizardObj.stop();  // don't go to the next step
            }
        });

        wizard.on('beforePrev', function (wizardObj) {
            if (validator.form() !== true) {
                wizardObj.stop();  // don't go to the next step
            }
        });

        // Change event
        wizard.on('change', function (wizard) {
            KTUtil.scrollTop();
        });
    }

    var initValidation = function () {
        $.validator.addMethod('filesize', function (value, element, arg) {
            if (element.files.length > 0) {
                if (element.files[0].size <= arg) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        });

        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",

            rules: {
                old_password: {
                    required: false,
                    remote: {
                        url: '/user_profile/check_password/',
                        type: "get",
                        complete: function (data) {
                            if (data.responseJSON) {
                                $('#old_password').prop('readonly', true);
                                $('#old_password').css("background-color", "#F7F8FA")
                                $('.new_password').prop('disabled', false);
                                $('.new_password').rules('add', 'required');
                            }
                        },
                    }
                },
                user_name: 'username',
                user_image: {
                    required: false,
                    extension: "jpg|jpeg|svg|png",
                    filesize: 6000000,
                },
                location:{
                    required:true
                }
            },
            messages: {
                old_password: {
                    remote: "Password is not valid."
                },
                image: {
                    extension: "Please select valid format",
                    filesize: "filesize must be less than or equal to 6 mb",
                },
                user_name: {
                    required: "This field is required"
                }
            },
            // Validation rules

            // Display error
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();

            },

            // Submit valid form
            submitHandler: function (form) {

            },
            errorElement: "span"
        });
    }

    var initSubmit = function () {
        var btn = formEl.find('[data-ktwizard-type="action-submit"]');

        btn.on('click', function (e) {
            e.preventDefault();

            if (validator.form()) {
                // See: src\js\framework\base\app.js
                KTApp.progress(btn);
                //KTApp.block(formEl);

                // See: http://malsup.com/jquery/form/#ajaxSubmit
                formEl.ajaxSubmit({
                    success: function (response, status, xhr) {
                        console.log(response)
                        showErrorMsg(formEl, 'success', response.developer_message);
                        document.documentElement.scrollTop = 0;

                        KTApp.unprogress(btn);
                        setTimeout(function () {
                            $('#user_profile_alert').fadeOut();
                            location.reload();
                        }, 3000);


                    },
                    error: function (xhr, sttus, error) {
                        console.log(xhr.responseText)
                        document.documentElement.scrollTop = 0;
                        var err = JSON.parse(xhr.responseText);
                        KTApp.unprogress(btn);
                        console.log(err.developer_message)

                        var msg=""
                        err.developer_message.forEach(function(val , index){
                            msg+="<li>"+val+"</li><br>"
                        })
                        showErrorMsg(formEl, 'danger', msg);
                        // setTimeout(function () {
                        // $('#user_profile_alert').fadeOut();
                        // }, 5000);
                    },
                });
            }
        });
    }

    return {
        // public functions
        init: function () {
            wizardEl = KTUtil.get('kt_wizard_v2');
            formEl = $('#kt_form');

            initWizard();
            initValidation();
            initSubmit();
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