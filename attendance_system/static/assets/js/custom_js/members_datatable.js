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



    // init
    var init = function (main_title) {




        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        datatable = $('#kt_apps_members_list_datatable').KTDatatable({
            // responsive: true,
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/all_members/',
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

            // column sorting
            // sortable: true,

            pagination: true,


            search: {
                input: $('#generalSearch'),
                delay: 200,
            },
            rows: {
                callback: function (row, data, index) {

                    row.find('td').each(function (a, b) {
                        $(b).addClass('text-truncate')

                    });
                },
            }
            ,
            // columns definition
            columns: [
                {
                    field: 'id',
                    title: '',
                    // autoHide: false,
                    sortable: true,
                    width: 30,
                    selector: {
                        class: 'kt-checkbox--solid'
                    },

                    // textAlign: 'center',


                },

                {
                    field: 'first_name',
                    title: 'Name',
                    // autoHide: false,
                    sortable: true,
                    width: 200,
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
                    // autoHide: false,
                    sortable: true,
                    width: 160,
                    template: function (row, index, datatable) {
                        var date = new Date(row.created_at_date)
                        return `<td>
                                ${row.email}
                        </td>`
                    },
                    title: 'Email',
                },
                {
                    field: 'dob',
                    // autoHide: true,
                    sortable: true,
                    width: 100,
                    template: function (row, index, datatable) {
                        var date = new Date(row.updated_at_date)
                        return `<td>
                                ${row.dob}
                        </td>`
                    },
                    title: 'Date of Birth',
                },
                {
                    field: 'outcome',
                    title: 'Outcome',
                    // autoHide: true,
                    sortable: true,
                    width: 100,
                    template: function (row) {
                        var status = {
                            1: { 'title': 'Hired', 'class': ' kt-badge--unified-danger kt-font-danger' },
                            2: { 'title': 'Not Hired', 'class': 'kt-badge--unified-success kt-font-success' },
                        };

                        return `<td>
                            ${row.outcome_name[0].toUpperCase() + row.outcome_name.slice(1)}
                        </td>`;
                    },
                },
                {
                    field: 'designation',
                    title: 'Designation',
                    // autoHide: true,
                    sortable: true,
                    width: 100,
                    template: function (row) {

                        console.log(row.designation)
                        return `<td>
                         ${row.designation_name[0].toUpperCase() + row.designation_name.slice(1)}
                        </td>`;
                    },
                },

                {
                    field: 'group',
                    title: 'Group',
                    width: 100,
                    // autoHide: true,
                    sortable: true,
                    template: function (row) {
                        return `<td>
                        ${row.group_name[0].toUpperCase() + row.group_name.slice(1)}
                        </td>`;
                    },
                },
                {
                    field: 'cell',
                    title: 'Phone Number',
                    // autoHide: true,
                    sortable: true,
                    width: 120,
                    template: function (row) {
                        return `<td>
                        ${row.cell}
                    </td>`;
                    },
                },
                {
                    field: 'delete',
                    title: 'Actions',
                    // autoHide: true,
                    textAlign: 'center',
                    sortable: false,
                    width: 150,
                    template: function (row) {
                        return `<a href="/members/${row.id}/edit/" class="btn btn-icon btn-label-success">
                        <i class="fa fa-pen"></i>
                    </a>
                    <span class="px-1"></span>
                    <a href="javascript:;" data-id ="${row.id}" id="delete_member"  class="btn btn-icon btn-label-danger delete_member" >
                        <i class="flaticon2-rubbish-bin"></i>
                    </a>`;
                    },
                },
                userType == 4 ? {
                    field: 'activity',
                    title: 'Activity',
                    // autoHide: true,
                    width: 50,
                    sortable: false,
                    textAlign: 'center',
                    template: function (row) {
                        return `<a href="/members/activity-logs/${row.id}"  class="btn btn-icon btn-label-primary">
                            <i class="fa fa-history"></i>
                        </a>`;
                    },
                } :  {
                    field: '',
                    title: '',
                    // autoHide: true,
                    width: 0,
                } ,

                {
                    field: 'street_address',
                    title: 'Street Address',
                    // autoHide: true,
                    sortable: true,
                    width: 300,
                    template: function (row) {
                        return `<td>
                        ${row.street_address}
                    </td>`;
                    },
                },
                {
                    field: 'city',
                    title: 'City',
                    // autoHide: true,
                    sortable: true,
                    width: 100,
                    template: function (row) {
                        return `<td>
                        ${row.city}
                    </td>`;
                    },
                },
                {
                    field: 'state',
                    title: 'State',
                    // autoHide: true,
                    sortable: true,
                    width: 100,
                    template: function (row) {
                        return `<td>
                        ${row.state}
                    </td>`;
                    },
                },



            ]
        });
    };

    // search
    var search = function () {
        $('#kt_form_group').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'group');
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



    $('body').on('click', '.delete_member', function () {
        var member_id = $(this).attr('data-id');
        var $this = $(this);
        swal.fire({
            buttonsStyling: false,

            html: "Delete member?",
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
                    url: "/members/" + member_id + "/delete/",
                    statusCode: {
                        //                              401:unauthorize(),
                    },
                    success: function (response) {
                        swal.fire({
                            title: 'Deleted!',
                            text: "Member deleted.",
                            type: 'success',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        })
                        $this.closest('.snip0013').remove();
                        setTimeout(function () {
                            location.reload()
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

                var member_id = $.merge([], ids);

                // alert(member_id)
                $(".delete_member_id").val(member_id);
                var form = $('.delete_form');
                form.ajaxSubmit({
                    type: "post",
                    url: "/members/delete/",
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



    // if(userType==4){
    //     console.log('admin')
    //     $('[data-field="activity"]').show()
    // }else{
    //     $('[data-field="activity"]').hide()
    //     console.log('notadmin')

    // }


    return {
        // public functions
        init: function (title) {
            init(title);
            search();
            selection();
            selectedFetch();
            //selectedStatusUpdate();
            //selectedDelete();
            updateTotal();
            // reorder(nav_id);
        },
    };
}();




