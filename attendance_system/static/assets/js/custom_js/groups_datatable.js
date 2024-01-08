"use strict";

// Class definition
// simulator function start here
function preview(data_id) {
    var preview_html = $('input[value="' + data_id + '"]').closest('tr').find('.preview_html').html();
    var title = $('input[value="' + data_id + '"]').closest('tr').find('td[data-field="title"]').text();
    var image = $('input[value="' + data_id + '"]').closest('tr').find('.preview_image').text();
    $('.modal-image').show();
    if (image != '')
        $('.modal-image').attr('src', image);
    else
        $('.modal-image').hide();
    $('.modal_title').text(title);
    $('.model_news_description').html(preview_html);
    var simulator_content = $('.view_modal_content').html();
    $('.simulator_content').html(simulator_content);
    $('#simulator_modal').modal('show');
}

var KTUserListDatatable = function () {

    // variables
    var datatable;

    var showErrorMsg = function (form, type, msg) {
        var alert = $('<div class="alert alert-' + type + ' alert-dismissible" role="alert" id="group_alert">\
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


    // init
    var init = function (main_title) {

        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        datatable = $('#kt_apps_groups_list_datatable').KTDatatable({
            // responsive: true,
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/all_groups/',
                        method: "GET",
                        // params: {
                        //     nav_id: 92
                        // }

                    },
                },
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                saveState: false,

            },
            select: true,
            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            pagination: true,


            search: {
                input: $('#generalSearch'),
                delay: 400,
            },
            // columns definition
            columns: [
                {
                    field: 'id',
                    // autoHide: false,
                    width: 20,
                    // textAlign: 'center',
                    sortable: true,
                    selector: {
                        class: 'kt-checkbox--solid'
                    },
                    template: function (row, index, datatable) {

                        return ` <span >${row.id}</span>`;

                    },
                    title: '#',

                },


                {
                    field: 'group_name',
                    title: 'Group',
                    // autoHide: false,
                    sortable: true,
                    width: 150,
                    textAlign: 'center',
                    // sortable: true,
                    template: function (row, index, datatable) {

                        return ` <span class="" id="group_name_val${row.id}">${row.group_name.charAt(0).toUpperCase() + row.group_name.slice(1)}</span>`;

                    },


                },
                {
                    field: 'total_members',
                    sortable: false,
                    width: 150,
                    textAlign: 'center',
                    template: function (row, index, datatable) {
                        var date = new Date(row.created_at_date)
                        return `<span class="" >${row.total_members}</span>`;
                    },
                    title: 'Total Members',
                    // autoHide: true,
                },
                // {
                //     field: 'member_limit',
                //     sortable: true,
                //     width: 150,
                //     textAlign: 'center',
                //     template: function (row, index, datatable) {
                //         var date = new Date(row.created_at_date)
                //         return `<span class="" id="group_members_limit${row.id}" > ${row.member_limit}</span>`;
                //     },
                //     title: 'Members Limit',
                //     autoHide: true,
                // },
                {
                    field: 'status',
                    // autoHide: true,
                    sortable: true,
                    width: 200,
                    textAlign: 'center',
                    template: function (row, index, datatable) {


                        // $('#status_switch').prop('checked', true);

                        var date = new Date(row.updated_at_date)
                        var status = {
                            0: { title: "Published", color: 'success' },
                            1: { title: "Not Published", color: 'danger' },

                        };

                        return `<span class="kt-badge kt-badge--inline kt-font-light kt-badge--unified-${status[row.status]['color']} kt-font-${status[row.status]['color']}" id="publish_check_value${row.id}">${status[row.status]['title']}</span>
                        <div class="dropdown dropdown-inline">
                            <button type="button" class="btn btn-clean btn-icon btn-sm btn-icon-md" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="la la-angle-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item kt-font-success publish_status" href="javascript:;" data-id="${row.id}" ><i class="fa fa-square-full kt-font-md kt-padding-t-5 kt-font-success"></i>Publish</a>
                            <a class="dropdown-item kt-font-danger unpublish_status"  href="javascript:;" data-id="${row.id}" > <i class="fa fa-square-full kt-font-md kt-padding-t-5 kt-font-danger"></i>Unpublish</a>
                        </div>
                        </div>`;


                    },
                    title: 'Status',
                },


                {
                    field: 'actions',
                    title: 'Actions',
                    // autoHide: true,
                    sortable: false,
                    width: 150,
                    textAlign: 'center',
                    template: function (row) {

                        return `<a href="#" data-toggle="modal" data-target=".edit_modal" class="btn btn-icon btn-label-success edit_app"  data-id="${row.id}" data-status="${row.status}">
                        <i class="fa fa-pen"></i>
                    </a>`;
                    },
                },
                userType == 4 ?
                    {
                        field: 'activity',
                        title: 'Activity',
                        // autoHide: true,
                        width: 100,
                        sortable: false,
                        textAlign: 'center',
                        template: function (row) {
                            return `<a href="/groups/activity-logs/${row.id}"  class="btn btn-icon btn-label-primary">
                            <i class="fa fa-history"></i>
                        </a>`;
                        },
                    } : {
                        field: '',
                        title: '',
                        // autoHide: true,
                        width: 0,
                    }

            ]
        });
    };

    // search
    var search = function () {
        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'status');
        });
    };

    // selection
    var selection = function () {

        var initTooltip = function (el) {
            var skin = el.data('skin') ? 'tooltip-' + el.data('skin') : '';
            var width = el.data('width') == 'auto' ? 'tooltop-auto-width' : '';
            var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
            var placement = el.data('placement') ? el.data('placement') : 'left';

            el.tooltip({
                trigger: triggerValue,
                template: '<div class="tooltip ' + skin + ' ' + width + '" role="tooltip">\
                    <div class="arrow"></div>\
                    <div class="tooltip-inner"></div>\
                </div>'
            });
        }

        datatable.on('kt-datatable--on-layout-updated', function (e) {
            $('[data-toggle="kt-tooltip"]').each(function () {
                console.log('Inside Tootltipe');
                initTooltip($(this));
                // Private functions
            });
        })

        // event handler on check and uncheck on records
        datatable.on('kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated', function (e) {
            var checkedNodes = datatable.rows('.kt-datatable__row--active').nodes(); // get selected records
            var count = checkedNodes.length; // selected records count

            $('#kt_subheader_group_selected_rows').html(count);

            if (count > 0) {
                $('#kt_subheader_search').addClass('kt-hidden');
                $('#kt_subheader_group_actions').removeClass('kt-hidden');
            } else {
                $('#kt_subheader_search').removeClass('kt-hidden');
                $('#kt_subheader_group_actions').addClass('kt-hidden');
            }
        });
    }

    // fetch selected records
    var selectedFetch = function () {
        // event handler on selected records fetch modal launch
        $('#kt_datatable_records_fetch_modal').on('show.bs.modal', function (e) {
            // show loading dialog
            var loading = new KTDialog({ 'type': 'loader', 'placement': 'top center', 'message': 'Loading ...' });
            loading.show();

            setTimeout(function () {
                loading.hide();
            }, 1000);

            // fetch selected IDs
            var ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function (i, chk) {
                return $(chk).val();
            });

            // populate selected IDs
            var c = document.createDocumentFragment();

            for (var i = 0; i < ids.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }

            $(e.target).find('#kt_apps_user_fetch_records_selected').append(c);
        }).on('hide.bs.modal', function (e) {
            $(e.target).find('#kt_apps_user_fetch_records_selected').empty();
        });
    };







    var editGroup = function () {
        // event handler on selected records fetch modal launch
        $('#group-edit').on('click', function (e) {

            e.preventDefault();

            console.log('clickedddd')
            var btn = $(this);
            var form = $('#edit_group_form')


            form.validate({
                rules: {
                    group_name: {
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
                url: '/groups/edit/',
                action: "post",
                statusCode: {
                    401: function () {
                        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                        showErrorMsg(form, 'warning', 'Groups can not be updated.');
                    },
                    400: function () {
                        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                        showErrorMsg(form, 'warning', 'Groups can not be updated.');
                    },
                },
                success: function (response, status, xhr, $form) {
                    // similate 2s delay
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    // showErrorMsg(form, 'success', 'Group updated successfully.');
                    $('.edit_modal').modal('toggle');

                    datatable.reload();
                    // var next = $('#next').val()

                    // if (next == '')
                    //     window.location.href = '';
                    // else
                    //     window.location.href = next;
                },
                error: function (response) {
                    console.log(response)
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'warning', 'Something went wrong. Please try again.');
                    setTimeout(function () {
                        $('#group_alert').fadeOut();
                    }, 5000);
                }

            });




        });
    };




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


    // bootstrap switch
    $('[data-switch=true]').bootstrapSwitch();
    $('[data-switch=true]').on('switchChange.bootstrapSwitch', function () {
        console.log('sadasdsadsad')
    });

    $('body').on('click', '.edit_app', function () {

        var mid = $(this).attr('data-id')
        var status = $(this).attr('data-status')
        if (status == 1) {
            // $('.status_switch')[0].checked = true;
            // $('.status_switch').prop('checked', true);
            $('[data-switch=true]').bootstrapSwitch('state', false)
            // $('#status_switch').attr('checked', true)
        } else {
            // $('#status_switch').attr('checked', false)
            // $('.status_switch').prop('checked', true);
            $('[data-switch=true]').bootstrapSwitch('state', true)
            // $('.status_switch')[0].checked = false;

        }
        console.log(status)
        // alert(status)
        $('#group_name').val($(`#group_name_val${mid}`).text())
        var check = false
        if (($(`#publish_check_value${mid}`).text()).toString() == 'Published') { check = true }
        // $('#status_switch').prop('checked', check);
        console.log($(`#group_members_limit${mid}`).text());
        $('#group_id').val(mid)
        var index = 0;

        if (($(`#group_members_limit${mid}`).text() == 200)) {
            index = 1;
        } else if ($(`#group_members_limit${mid}`).text() == 245) {
            index = 2
        }

        // console.log(index)
        // document.getElementById('add_group_member_limit').selectedIndex = index;
        // $('#add_group_member_limit') .val($(`#group_members_limit${mid}`).text());


    })



    var changeGroupStatusPublish = function () {
        $('body').on('click', '.publish_status', function () {
            var group_id = $(this).attr('data-id');

            $.ajax({
                type: "get",
                url: `/change_group_status/${group_id}/0`,
                statusCode: {
                    //                              401:unauthorize(),
                },
                success: function (response) {
                    swal.fire({
                        title: 'Success!',
                        text: "Group status changed.",
                        type: 'success',
                        buttonsStyling: false,
                        confirmButtonText: "OK",
                        confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                    })

                    datatable.reload();

                }
            });


        });
    }



    var multipleDelete = function () {


        $('body').on('click', '#kt_subheader_group_actions_delete_all', function () {
            var ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function (i, chk) {
                return $(chk).val();
            });

            swal.fire({
                buttonsStyling: false,

                text: "Delete " + ids.length + " records?",
                type: "warning",

                confirmButtonText: "Yes, delete!",
                confirmButtonClass: "btn btn-sm btn-bold btn-danger",

                showCancelButton: true,
                cancelButtonText: "No, cancel",
                cancelButtonClass: "btn btn-sm btn-bold btn-brand"
            }).then(function (result) {
                if (result.value) {

                    var member_id = $.merge([], ids);
                    $(".delete_group_id").val(member_id);
                    var form = $('.delete_form');
                    form.ajaxSubmit({
                        type: "post",
                        url: "/groups/delete/",
                        statusCode: {
                            401: function () {
                                unauthorize()
                            },
                        },
                        success: function (response) {
                            swal.fire({
                                title: 'Deleted!',
                                text: "Records deleted successfully!",
                                type: 'success',
                                buttonsStyling: false,
                                confirmButtonText: "OK",
                                confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                            })
                            datatable.reload();
                        },
                    });
                }
            });

        });

    }



    var multiplePublish = function () {


        $('body').on('click', '#kt_subheader_group_actions_publish_all', function () {
            var ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function (i, chk) {
                return $(chk).val();
            });

            console.log(ids)
            swal.fire({
                buttonsStyling: false,

                text: "Publish " + ids.length + " records?",
                type: "warning",

                confirmButtonText: "Yes, Publish!",
                confirmButtonClass: "btn btn-sm btn-bold btn-danger",

                showCancelButton: true,
                cancelButtonText: "No, cancel",
                cancelButtonClass: "btn btn-sm btn-bold btn-brand"
            }).then(function (result) {
                if (result.value) {

                    var member_id = $.merge([], ids);
                    $(".publish_group_id").val(member_id);
                    var form = $('.publish_form');
                    form.ajaxSubmit({
                        type: "post",
                        url: "/groups/multiple_publish/",
                        statusCode: {
                            401: function () {
                                unauthorize()
                            },
                        },
                        success: function (response) {
                            swal.fire({
                                title: 'Published!',
                                text: "Records published successfully!",
                                type: 'success',
                                buttonsStyling: false,
                                confirmButtonText: "OK",
                                confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                            })
                            datatable.reload();
                        },
                    });
                }
            });

        });

    }

    var multipleUnpublish = function () {


        $('body').on('click', '#kt_subheader_group_actions_unpublish_all', function () {
            var ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function (i, chk) {
                return $(chk).val();
            });

            console.log(ids)
            swal.fire({
                buttonsStyling: false,

                text: "Unpublish " + ids.length + " records?",
                type: "warning",

                confirmButtonText: "Yes, Unpublish!",
                confirmButtonClass: "btn btn-sm btn-bold btn-danger",

                showCancelButton: true,
                cancelButtonText: "No, cancel",
                cancelButtonClass: "btn btn-sm btn-bold btn-brand"
            }).then(function (result) {
                if (result.value) {

                    var member_id = $.merge([], ids);
                    $(".unpublish_group_id").val(member_id);
                    var form = $('.unpublish_form');
                    form.ajaxSubmit({
                        type: "post",
                        url: "/groups/multiple_unpublish/",
                        statusCode: {
                            401: function () {
                                unauthorize()
                            },
                        },
                        success: function (response) {
                            swal.fire({
                                title: 'Unpublished!',
                                text: "Records unpublished successfully!",
                                type: 'success',
                                buttonsStyling: false,
                                confirmButtonText: "OK",
                                confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                            })
                            datatable.reload();
                        },
                    });
                }
            });

        });

    }



    var changeGroupStatusUnPublish = function () {
        $('body').on('click', '.unpublish_status', function () {
            var group_id = $(this).attr('data-id');


            $.ajax({
                type: "get",
                url: `/change_group_status/${group_id}/1`,
                statusCode: {
                    //                              401:unauthorize(),
                },
                success: function (response) {
                    swal.fire({
                        title: 'Success!',
                        text: "Group status changed.",
                        type: 'success',
                        buttonsStyling: false,
                        confirmButtonText: "OK",
                        confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                    })

                    datatable.reload();

                }
            });


        });

    }
    return {
        // public functions
        init: function (title) {
            init(title);
            search();
            selection();
            selectedFetch();
            changeGroupStatusPublish();
            changeGroupStatusUnPublish();
            //selectedStatusUpdate();
            //selectedDelete();
            updateTotal();
            editGroup();
            multipleDelete();
            multiplePublish();
            multipleUnpublish();

            // reorder(nav_id);
        },
    };
}();




// javascript for add group page


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
        url: '/add_group/',
        action: "post",
        statusCode: {
            401: function () {
                btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                showErrorMsg(form, 'danger', 'Groups can not be updated.');
                setTimeout(function () {
                    $('#group_alert').fadeOut();
                }, 5000);
            },

            409: function () {
                btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
                showErrorMsg(form, 'danger', 'This group name is already taken.');
                setTimeout(function () {
                    $('#group_alert').fadeOut();
                }, 5000);
            },

        },
        success: function (response, status, xhr, $form) {
            // similate 2s delay
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            showErrorMsg(form, 'success', 'added successfully.');
            setTimeout(function () {
                $('#group_alert').fadeOut();
            }, 5000);
            $('.edit_modal').modal('toggle');
            window.location.href = '/groups/';


        },
        error: function (response) {
            console.log(response)
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            showErrorMsg(form, 'warning', 'Something went wrong. Please try again.');
            setTimeout(function () {
                $('#group_alert').fadeOut();
            }, 5000);
        }

    });




});


var showErrorMsg = function (form, type, msg) {
    var alert = $('<div class="alert alert-' + type + ' alert-dismissible" role="alert" id="group_alert">\
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
