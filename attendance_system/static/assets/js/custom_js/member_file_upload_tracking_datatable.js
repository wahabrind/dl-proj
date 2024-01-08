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
                        url: '/members/get_all_members_file/',
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
                    // selector: {
                    //     class: 'kt-checkbox--solid'
                    // },
                    template: function (row, index, datatable) {

                        return ` <span >${index + 1}</span>`;

                    },
                    title: '#',

                },

                {
                    field: 'file_name',
                    title: 'File',
                    width: 180,
                    sortable: true,
                    template: function (row, index, datatable) {
                        return ` <span >${row.file_name}</span>`;

                    },

                },
                {
                    field: 'file_status',
                    title: 'Status',
                    width: 110,
                    sortable: true,
                    template: function (row, index, datatable) {
                        var status = "";
                        if (row.file_status == "0")
                            status = "Pending"
                        if (row.file_status == "1")
                            status = "Ready"
                        if (row.file_status == "2")
                            status = "In Progress"
                        if (row.file_status == "3")
                            status = "Completed"
                        if (row.file_status == "-1")
                            status = "Failed"
                        if (row.file_status == "-2")
                            status = "Cancelled"
                        return ` <span >${status}</span>`;

                    },

                },

                {
                    field: 'created_by',
                    title: 'Created By',
                    width: 110,
                    center:true,
                    sortable: true,
                    template: function (row, index, datatable) {
                        return ` <span >${row.created_by_name}</span>`;

                    },

                },
                {
                    field: 'edited_by',
                    title: 'Updated By',
                    width: 110,
                    sortable: true,
                    center:true,
                    template: function (row, index, datatable) {
                        return ` <span >${row.updated_by_name}</span>`;

                    },

                },
                {
                    field: 'created_time',
                    title: 'Created Time',
                    width: 110,
                    sortable: true,
                    center:true,
                    template: function (row, index, datatable) {
                        return ` <span >${row.created_time}</span>`;

                    },

                },
                {
                    field: 'edited_time',
                    title: 'Updated Time',
                    width: 110,
                    sortable: true,
                    center:true,
                    template: function (row, index, datatable) {
                        return ` <span >${row.edited_time}</span>`;

                    },

                },


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







    return {
        // public functions
        init: function (title) {
            init(title);
            search();
            selection();


            // reorder(nav_id);
        },
    };
}();




// javascript for add group page



