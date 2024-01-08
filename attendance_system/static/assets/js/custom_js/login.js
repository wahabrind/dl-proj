"use strict";

// Class Definition

var timer = function () {
    var timing = 60;
    $('.kt_login_resend_verify_pin_submit').fadeOut();
    $('#kt_login_verify_pin_submit').prop('disabled', false);

    var myTimer = setInterval(function() {
      --timing;

      $('.verifyTimer').text( "Code Expires In: 00:"+timing);
      if (timing === 0) {
        clearInterval(myTimer);
        $('#kt_login_verify_pin_submit').prop('disabled', true);
        $('.kt_login_resend_verify_pin_submit').fadeIn();
        $('.verifyTimer').text( "Code Expired");
      }
    }, 1000);
}

var KTLoginGeneral = function() {

    var login = $('#kt_login');

    var showErrorMsg = function(form, type, msg) {
        var alert = $('<div class="alert alert-' + type + ' alert-dismissible" role="alert" id="pin_alert">\
			<div class="alert-text">'+msg+'</div>\
			<div class="alert-close">\
                <i class="flaticon2-cross kt-icon-sm" data-dismiss="alert"></i>\
            </div>\
		</div>');




        form.find('.alert').remove();
        alert.prependTo(form);
        KTUtil.animateClass(alert[0], 'fadeIn animated');
        alert.find('span').html(msg);
    }

    // Private Functions
    var displaySignUpForm = function() {
        login.removeClass('kt-login--forgot');
        login.removeClass('kt-login--signin');

        login.addClass('kt-login--signup');
        KTUtil.animateClass(login.find('.kt-login__signup')[0], 'flipInX animated');
    }

    var displaySignInForm = function() {
        login.removeClass('kt-login--forgot');
        login.removeClass('kt-login--signup');

        login.addClass('kt-login--signin');
        KTUtil.animateClass(login.find('.kt-login__signin')[0], 'flipInX animated');
        //login.find('.kt-login__signin').animateClass('flipInX animated');
    }

    var displayForgotForm = function() {
        login.removeClass('kt-login--signin');
        login.removeClass('kt-login--signup');

        login.addClass('kt-login--forgot');
        //login.find('.kt-login--forgot').animateClass('flipInX animated');
        KTUtil.animateClass(login.find('.kt-login__forgot')[0], 'flipInX animated');

    }

    var handleFormSwitch = function() {
        $('#kt_login_forgot').click(function(e) {
            e.preventDefault();
            displayForgotForm();
        });

        $('#kt_login_forgot_cancel').click(function(e) {
            e.preventDefault();
            displaySignInForm();
        });

        $('#kt_login_signup').click(function(e) {
            e.preventDefault();
            displaySignUpForm();
        });

        $('#kt_login_signup_cancel').click(function(e) {
            e.preventDefault();
            displaySignInForm();
        });
    }

    var handleSignInFormSubmit = function() {
        
        $('#kt_login_signin_submit').click(function(e) {
            e.preventDefault();
            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    lemail: {
                        required: true,
                        // email: true
                    },
                    lpassword: {
                        required: true
                    },
                    lcompany_id:{
                        required: true
                    }
                },
                // errorClass:'alert',
                
            }
    
            );
              $( ".password" ).rules( "add", { required: true });

            if (!form.valid()) {
                return;
            }

            btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '/login/',
                action: "post",
                    statusCode: {
                  401:function() {
                     btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                     showErrorMsg(form, 'danger', 'Incorrect email or password. Please try again.');
                      },
                  423:function() {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'Too many failed attempts. Please try again in 20 minutes');
                  },
                  403:function(response) {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'User is not authorized for backend use.');
                  },
                  403:function(response) {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'User is not activated check email to activate account.');
                  }
                },
                success: function(response, status, xhr, $form) {
                	// similate 2s delay
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'success', 'Login Successfully.');

                    var next = $('#next').val()

                    if (next == '')
                        window.location.href = '/';
                    else
                        window.location.href = next;
                },
                error: function (response) {
                    console.log(response)
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
                }

            });
        });
    }

    var handleSignUpFormSubmit = function() {
        $('#kt_login_signup_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    fullname: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    },
                    rpassword: {
                        required: true
                    },
                    agree: {
                        required: true
                    }
                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '',
                success: function(response, status, xhr, $form) {
                	// similate 2s delay
                	setTimeout(function() {
	                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
	                    form.clearForm();
	                    form.validate().resetForm();

	                    // display signup form
	                    displaySignInForm();
	                    var signInForm = login.find('.kt-login__signin form');
	                    signInForm.clearForm();
	                    signInForm.validate().resetForm();

	                    showErrorMsg(signInForm, 'success', 'Thank you. To complete your registration please check your email.');
	                }, 2000);
                }
            });
        });
    }


    var handleForgotFormSubmit = function() {
        $('#kt_login_forgot_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $("#forgot_password_form");
            btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
            
            $('.invalid-feedback').hide()
            $('.bootstrap-select').removeClass('is-invalid')
            if ($('.password').hasClass('is-invalid'))
                $('.password').rules( 'remove', 'required');
            form.validate({
                rules: {
                    femail: {
                        required: true,
                        email: true
                    },
                    fcompany_id:{
                        required: true
                    },
                }
            });

            if (!form.valid()) {
                btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                return;
            }

            // btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
            $('.forget-loading-bar').removeClass('kt-hide');
            form.ajaxSubmit({
                url: '/forget_password/',
                action: "post",
                  statusCode: {
                      401:function() {
                         $('.forget-loading-bar').addClass('kt-hide');
                           showErrorMsg(form, 'danger', 'No User Found.');
                          }
                          },
                success: function(response, status, xhr, $form) {
                	// similate 2s delay
                		$('.forget-loading-bar').addClass('kt-hide');
	                    showErrorMsg(form, 'success', 'Email Sent Successfully');
	                    // set 2 seconds delay
                        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
	                    setTimeout(function() {
                             window.location.href = "/verification/";
                        }, 2000);
                },
                error: function (response) {
                    $('.forget-loading-bar').addClass('kt-hide');
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
                }
            });
        });
    }

    var handleVerifyPinFormSubmit = function() {
        $('#kt_login_verify_pin_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '/verification/',
                method: "post",
                  statusCode: {
                      401:function() {
                         btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                         showErrorMsg(form, 'danger', 'Incorrect Code.');
                                             
                    setTimeout(function() {
                        // Do something after 5 seconds

                        $('#pin_alert').fadeOut();
                   }, 5000);
                          },
                      423:function() {
                        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                        showErrorMsg(form, 'danger', 'Too many failed attempts. Please click send code again button to generate a new verification code.');
                                            
                    setTimeout(function() {
                        $('#pin_alert').fadeOut();
                   }, 5000);
                      }
                    },
                success: function(response, status, xhr, $form) {
                		btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
	                    showErrorMsg(form, 'success', 'Pin verified successfully');
	                    // set 2 seconds delay
	                    setTimeout(function() {
                            window.location.href = "/reset_password/";
                        }, 2000)
                },
                error: function (response) {
                    console.log(response)
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');

                    setTimeout(function() {
                        $('#pin_alert').fadeOut();
                   }, 5000);
                }
            });
        });
    }


    var handleResendVerifyPinFormSubmit = function() {
        $('#kt_login_resend_verify_pin_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '/resend_verification_code/',
                method: "post",
                  statusCode: {
                      401: function () {
                          btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                          showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
                          setTimeout(function() {
                            $('#pin_alert').fadeOut();
                       }, 5000);
                      }
                  },
                success: function(response, status, xhr, $form) {
                		btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                        showErrorMsg(form, 'success', 'Pin resend successfully');
                        setTimeout(function() {
                            $('#pin_alert').fadeOut();
                       }, 5000);
                        timer();
                },
                error: function (response) {
                    console.log(response)
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
                    setTimeout(function() {
                        $('#pin_alert').fadeOut();
                   }, 5000);
                    
                }
            });
        });
    }

    var handleresetPasswordFormSubmit = function() {
        $('#kt_login_reset_password_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    pass1: {
                        required: true,
                    },
                    pass2: {
                        required: true,
                    }

                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '/reset_password/',
                method: "post",
                  statusCode: {
                      401:function() {
                         btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                         showErrorMsg(form, 'danger', 'Password not updated.');
                         setTimeout(function() {
                            $('#pin_alert').fadeOut();
                       }, 5000);
                          },
                      400:function(message) {
                         btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                         var mes = jQuery.parseJSON(message.responseText);
                         showErrorMsg(form, 'danger', mes.developer_message);
                         setTimeout(function() {
                            $('#pin_alert').fadeOut();
                       }, 5000);
                          }
                    },
                success: function(response, status, xhr, $form) {
                		btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
	                    showErrorMsg(form, 'success', 'Password Updated Successfully.');
	                    // set 2 seconds delay
	                    if(! response.is_login) {
                            //alert("IF")
                            setTimeout(function() {
                                window.location.href = '/';
                            }, 2000)
                        } else {
                            //alert("ELSE")
                            setTimeout(function() {
                                window.location.href = '/';
                            }, 2000)
                        }
                },
                error: function (response) {
                    console.log(response)
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
                    setTimeout(function() {
                        $('#pin_alert').fadeOut();
                   }, 5000);

                }
            });
        });
    }




    // Public Functions
    return {
        // public functions
        init: function() {
            handleFormSwitch();
            handleSignInFormSubmit();
            handleSignUpFormSubmit();
            handleForgotFormSubmit();
            handleVerifyPinFormSubmit();
            handleResendVerifyPinFormSubmit();
            handleresetPasswordFormSubmit();
            timer();
        }
    };
}();

// Class Initialization
jQuery(document).ready(function() {
    KTLoginGeneral.init();
});
