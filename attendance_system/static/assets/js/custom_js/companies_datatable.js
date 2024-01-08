"use strict";
// Class definition

var CompanyFunctions = function () {



    var showErrorMsg = function (form, type, msg) {
        var alert = $('<div class="alert alert-' + type + ' alert-dismissible" role="alert" id="company_alert">\
			<div class="alert-text">'+ msg + '</div>\
			<div class="alert-close">\
                <i class="flaticon2-cross kt-icon-sm" data-dismiss="alert"></i>\
            </div>\
		</div>');




        form.find('.alert').remove();
        alert.prependTo(form);
        KTUtil.animateClass(alert[0], 'fadeIn animated');
        alert.find('span').html(msg);
    }



    var addCompany = function () {

        $('#group-add').on('click', function (e) {


            e.preventDefault();

            var btn = $(this);
            var form = $('#add_group_form')
            form.validate({
                rules: {
                    add_group_name: {
                        required: true,
                    },
                    add_group_member_limit: {
                        required: true,
                    },
                },
                // errorClass:'alert alert-danger alert-dismissible mt-3

            });


            if (!form.valid()) {
                return;
            }

            btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);



            form.ajaxSubmit({
                url: '/add_company/',
                action: "post",
                statusCode: {
                    401: function () {
                        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                        showErrorMsg(form, 'danger', 'Groups can not be updated.');
                        setTimeout(function () {
                            $('#company_alert').fadeOut();
                        }, 5000);
                    },
                },
                success: function (response, status, xhr, $form) {
                    // similate 2s delay
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'success', 'added successfully.');
                    $('.edit_modal').modal('toggle');
                    setTimeout(function () {
                        window.location.href = '/groups/';
                        $('#company_alert').fadeOut();
                    }, 3000);


                },
                error: function (response) {
                    console.log(response)
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'Something went wrong. Please try again.');
                    // setTimeout(function () {
                    //     $('#company_alert').fadeOut();
                    // }, 5000);
                }

            });




        });

    }



    $(document).on('click', '.company_delete_app', function () {
        var company_id = $(this).attr('data-id');
        console.log(company_id)
        $.ajax({
            type: "get",
            url: `companies/${company_id}/delete/`,
            statusCode: {
                //                              401:unauthorize(),
            },
            success: function (response) {
                swal.fire({
                    title: 'Success!',
                    text: "Company deleted successfully.",
                    type: 'success',
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                })

                // datatable.reload();
                window.location.href = ''
                

            }
        });
    })


    var reorder = function (nav_id) {

        $('.reorder').click(function () {
            reorder_table('title', 'News', nav_id)
        })

        $('.reorder_success').click(function () {

            reorder_submit('News', nav_id)
        })
    }



    var updateTotal = function () {
        datatable.on('kt-datatable--on-layout-updated', function () {
            //$('#kt_subheader_total').html(datatable.getTotalRows() + ' Total');
        });
    };

    return {
        // public functions
        init: function () {
            addCompany();
            updateTotal();

        },
    };
}();


