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

var KTUserListDatatable = function (url = '', column = []) {

    // variables
    var datatable;

    // init
    var init = function (main_title) {

        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        datatable = $('#kt_apps_users_list_datatable').KTDatatable({
            // responsive: true,
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/all_users/',
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

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting

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
                    sortable: true,
                    width: 20,
                    // textAlign: 'center',
                    selector: {
                        class: 'kt-checkbox--solid'
                    },
                    title: '',
                },



                {
                    field: 'first_name',

                    title: 'Username',

                    // autoHide: false,
                    sortable: true,
                    width: 170,
                    template: function (row, index, datatable) {
                        return `<span style="">
								<div class="kt-user-card-v2">
								<div class="kt-user-card-v2__pic" >
									<img src="${row.image_url}" alt="photo"  >
								</div>
								<div class="kt-user-card-v2__details">
									<span class="kt-user-card-v2__desc fa-1x kt-margin-t-0">${row.first_name} ${row.last_name}</span>
								</div>
							</div>
						</span>`;

                    }
                },
                {
                    field: 'email',
                    sortable: true,
                    width: 170,
                    template: function (row, index, datatable) {
                        var date = new Date(row.created_at_date)
                        return ` <td> ${row.email}
                                </td>`;
                    },
                    title: 'Email',
                    autoHide: false,
                },
                {
                    field: 'type',
                    // autoHide: true,
                    sortable: true,
                    width: 110,
                    template: function (row) {
                        return ` <td>${row.type}
                        </td>`;
                    },
                    title: 'Role Assigned',
                },
                {
                    field: 'date_joined',
                    title: 'Date Joined',
                    width: 140,
                    // autoHide: true,
                    sortable: true,
                    template: function (row) {
                        return ` <td> ${row.date_joined}
                        </td>`;
                    },
                },
                {
                    field: 'last_login',
                    title: 'Last Login',
                    width: 140,
                    // autoHide: true,
                    sortable: true,
                    template: function (row) {
                        return ` <td> ${row.last_login}
                        </td>`;
                    },
                },
                {
                    field: 'actions',
                    title: 'Actions',
                    sortable: false,
                    width: 130,
                    // autoHide: true,
                    textAlign: 'center',
                    template: function (row) {

                        return `<a href="/users/${row.id}/edit/" class="btn btn-icon btn-label-success">
                        <i class="fa fa-pen"></i>
                    </a>
                    <span class="px-1"></span>
                    <a href="javascript:;" data-id ="${row.id}"  class="btn btn-icon btn-label-danger delete_user" >
                        <i class="flaticon2-rubbish-bin"></i>
                    </a>`;
                    },
                },
                userType == 4 ? {
                    field: 'activity',
                    title: 'Activity',
                    // autoHide: true,
                    width: 80,
                    sortable: false,
                    textAlign: 'center',
                    template: function (row) {
                        return `<a href="/users/activity-logs/${row.id}" class="btn btn-icon btn-label-primary">
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
        $('#kt_form_user_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'user_type');
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




    $('body').on('click', '.delete_user', function () {
        var user_id = $(this).attr('data-id');
        var $this = $(this);
        swal.fire({
            buttonsStyling: false,

            html: "Delete user?",
            type: "info",

            confirmButtonText: "Yes, delete!",
            confirmButtonClass: "btn btn-sm btn-bold btn-brand",

            showCancelButton: true,
            cancelButtonText: "No, cancel",
            cancelButtonClass: "btn btn-sm btn-bold btn-default"
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    type: "get",
                    url: "/users/" + user_id + "/delete/",
                    statusCode: {
                        //                              401:unauthorize(),
                    },
                    success: function (response) {
                        swal.fire({
                            title: 'Deleted!',
                            text: "User deleted.",
                            type: 'success',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        })
                        $this.closest('.snip0013').remove();
                        setTimeout(function () {
                            // location.reload()
                            datatable.reload()
                        }, 1000)
                    }
                });
                // result.dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
            }
        });


    });



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

                var user_id = $.merge([], ids);
                $(".delete_user_id").val(user_id);
                var form = $('.delete_form');
                form.ajaxSubmit({
                    type: "post",
                    url: "/users/delete/",
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


    $("#mobile_app_users").on('click', function () {

        $('#add_app_user_btn').show();
        $('.kt-subheader__toolbar').show();
        $('#add_backend_user_btn').hide();
        // datatable.url = '/all_users/';
        // datatable.reload();


    })
    $("#backend_users").on('click', function () {

        $('#add_app_user_btn').hide();
        $('.kt-subheader__toolbar').hide();
        $('#add_backend_user_btn').show();
        // datatable.url(`/all_backend_users/`).reload();
        // datatable.reload();

    })


    // $('.kt-datatable__cell').css("background-color", "yellow");
    // $('.kt-datatable__table').find('td').addClass("width200");
    // $('#DataContainer').find('td')


    return {
        // public functions
        init: function (title) {
            init(title);
            search();
            selection();
            selectedFetch();
            updateTotal();
        },
    };
}();







