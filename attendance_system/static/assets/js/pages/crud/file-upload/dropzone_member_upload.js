"use strict";
// Class definition

var KTDropzoneDemo = function () {

  // Private functions


  var showErrorMsg = function (form, type, msg) {
    var alert = $('<div class="alert alert-bold alert-solid-' + type + ' alert-dismissible" role="alert" id="my_alert">\
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
      // url: "/members/upload_member_data/", // Set the url for your upload script location
      url: "/members/upload_member_data/", // Set the url for your upload script location
      paramName: "file", // The name that will be used to transfer the file
      maxFiles: 1,
      maxFilesize: 6, // MB
      acceptedFiles: ".csv",
      autoProcessQueue: false,
      addRemoveLinks: true,

      headers: {
        'X-CSRF-TOKEN': csrftoken
      },
      init: function (submit_click) {

        var submitButton = document.querySelector(".submit");
        // if(myDropzone.getQueuedFiles().length==0){
        //   submitButton.attr('disabled', true);
        // }else{
        //   submitButton.attr('disabled', false);
        // }

        // console.log(submitButton)
        $(submitButton).attr('disabled', true);

        submitButton.addEventListener("click", function (e) {

          btn = $(this);
          var validation = true;

          btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light')



          // alert(csrftoken)
          // alert(form.formData)

          if (myDropzone.getRejectedFiles().length > 0) {
            // btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            showErrorMsg(form, 'danger', "Not a valid File");
            setTimeout(function () {
              $('#my_alert').fadeOut();
            }, 3000);
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light')

          } else {
            // form.formData.append("csrfmiddlewaretoken",csrftoken)
            // form.formData.append("file_path", file_path);
            // console.log(form)
            myDropzone.processQueue();
          }

        });


      },

      success: function (file, response) {
        // console.log(response)
        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light')
        showErrorMsg(form, 'success', response.developer_message);
        KTApp.unprogress(btn[0]);

        
        // UpdateTableFromFileResponse(response)
        // showErrorMsg(form, 'danger', response.developer_message);
        setTimeout(function () {
          // window.location.href = '/members/'
          // $('#my_alert').fadeOut();
        }, 3000)


      },
      error: function (file, response) {
        // console.log(response)
        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
        showErrorMsg(form, 'danger', response.developer_message);
        setTimeout(function () {
          $('#my_alert').fadeOut();
        }, 3000);
      },
      statusCode: {
        400: function (file, response) {
          // console.log(response)
          btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
          showErrorMsg(form, 'danger', response.developer_message);
          setTimeout(function () {
            $('#my_alert').fadeOut();
          }, 3000);
        },
        409: function (file, response) {
          // console.log(response)
          btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
          showErrorMsg(form, 'danger', response.developer_message);
          setTimeout(function () {
            $('#my_alert').fadeOut();
          }, 3000);
        },

      },
      removedfile: function (file) {

        // $('.image_name,.image_url' , "#old_image").val('');
        var _ref;
        return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
      },


    });

    myDropzone.on('sending', function (data, xhr, formData) {

      // this will get sent
      formData.append("csrfmiddlewaretoken", $('input[name="csrfmiddlewaretoken"]').val());


    });

    myDropzone.on("addedfile", function (file) {
      $('.submit').attr('disabled', false);

    });



  }


  var UpdateTableFromFileResponse = function (data) {



    var myHtml = ''

    if (data.new_members_list.length == 0) {
      myHtml += `													
      	<div class="row justify-content-center">
          <h4><img src="/static/assets/media/icons/no_data.png" width="30px" class="kt-padding-r-5">
              <span class="font-weight-bold text-dark fa-xs">No records found</span>
          </h4>
        </div>`;

    } else {

      myHtml += `
      <div class="row head-top border">
      <div class="col-md-6">
          <div class="heading-top">
              <p class="kt-font-lg kt-font-bold kt-margin-b-0 kt-padding-t-15 kt-padding-b-15 kt-padding-l-5">New Members</p>
          </div>
      </div>
      </div>
      <div class="border kt-margin-b-15">
      <div class="row head-top-2 tb-head-fix kt-scroll" data-scroll="true" data-height="400">    
      <table class="table kt-margin-b-0" id="new_members_table">
      <thead class="text-center">
        <tr class="table-border-custom">
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Mobile Phone</th>
            <th>Designation</th>
            <th>Street Address</th>
            <th>Group</th>
            <th><label class="tb-checkbox-m kt-checkbox kt-checkbox--tick kt-checkbox--success kt-margin-l-5 kt-margin-b-0">
                <input type="checkbox" id="new_check_all">
                <span></span>
              </label>
            </th>
          </tr>
      </thead>
      <thead class="text-center">`

      data.new_members_list.forEach(function (e, index) {

        myHtml += `
        <tr class="table-border-custom">
              <td ><b>${index + 1}</b></td>
              <td>${e.first_name}</td>
              <td>${e.last_name}</td>
              <td >${e.email}</td>
              <td>${e.dob}</td>
              <td>${e.cell}</td>
              <td>${e.designation}</td>
              <td>${e.street_address}</td>
              <td>${e.group}</td>
              <td><label class="tb-checkbox-m kt-checkbox kt-checkbox--tick kt-checkbox--success kt-margin-l-5 kt-margin-b-0">
                <input type="checkbox" class="new_check_list">
                <span></span>
              </label></td>
        </tr>
        `;
      });
      myHtml += `
      </thead>
       <tbody class="text-center">
       </tbody>
       </table>
       </div>
       </div>
      `;

    }

    $('#new_member_section').html(myHtml)
    $('#new_total_span').html(data.new_members_list.length)



    myHtml = ''

    if (data.existing_members_list_new_data.length == 0) {
      myHtml += ``;

    } else {

      myHtml += `
      <div class="row head-top border">
      <div class="col-md-6">
          <div class="heading-top">
              <p class="kt-font-lg kt-font-bold kt-margin-b-0 kt-padding-t-15 kt-padding-b-15 kt-padding-l-5">Registered Members Updated Data</p>
          </div>
      </div>
      </div>
      <div class="border kt-margin-b-15">
      <div class="row head-top-2 tb-head-fix kt-scroll" data-scroll="true" data-height="400">    
      <table class="table kt-margin-b-0" id="new_members_table">
      <thead class="text-center">
        <tr class="table-border-custom">
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Mobile Phone</th>
            <th>Designation</th>
            <th>Street Address</th>
            <th>Group</th>
            <th><label class="tb-checkbox-m kt-checkbox kt-checkbox--tick kt-checkbox--success kt-margin-l-5 kt-margin-b-0">
                <input type="checkbox" id="existing_check_all" >
                <span></span>
              </label>
            </th>
          </tr>
      </thead>
      <thead class="text-center">`

      data.existing_members_list_new_data.forEach(function (e, index) {

        myHtml += `
        <tr class="table-border-custom new-val">
              <td ><b>${index + 1}</b></td>
              <td>${e.first_name}</td>
              <td>${e.last_name}</td>
              <td >${e.email}</td>
              <td>${e.dob}</td>
              <td>${e.cell}</td>
              <td>${e.designation}</td>
              <td>${e.street_address}</td>
              <td>${e.group}</td>
              <td><label class="tb-checkbox-m kt-checkbox kt-checkbox--tick kt-checkbox--success kt-margin-l-5 kt-margin-b-0">
                <input type="checkbox" class="existing_check_list" >
                <span></span>
              </label></td>
        </tr>
        `;
      });
      myHtml += `
      </thead>
       <tbody class="text-center">
       </tbody>
       </table>
       </div>
       </div>
      `;

    }
    $('#existing_member_section').html(myHtml)
    $('#existing_total_span').html(data.existing_members_list.length)










    // myHtml = ''

    if (data.existing_members_list.length == 0) {
      myHtml += `													
      	<div class="row justify-content-center">
          <h4><img src="/static/assets/media/icons/no_data.png" width="30px" class="kt-padding-r-5">
              <span class="font-weight-bold text-dark fa-xs">No records found</span>
          </h4>
        </div>`;

    } else {

      myHtml += `
      <div class="row head-top border">
      <div class="col-md-6">
          <div class="heading-top">
              <p class="kt-font-lg kt-font-bold kt-margin-b-0 kt-padding-t-15 kt-padding-b-15 kt-padding-l-5">Registered Members Existing Data</p>
          </div>
      </div>
      </div>
      <div class="border kt-margin-b-15">
      <div class="row head-top-2 tb-head-fix kt-scroll" data-scroll="true" data-height="400">    
      <table class="table kt-margin-b-0" id="new_members_table">
      <thead class="text-center">
        <tr class="table-border-custom ">
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Mobile Phone</th>
            <th>Designation</th>
            <th>Street Address</th>
            <th>Group</th>
            <th>  </th>

          </tr>
      </thead>
      <thead class="text-center">`

      data.existing_members_list.forEach(function (e, index) {

        myHtml += `
        <tr class="table-border-custom old-val">
              <td ><b>${index + 1}</b></td>
              <td>${e.first_name}</td>
              <td>${e.last_name}</td>
              <td >${e.email}</td>
              <td>${e.dob}</td>
              <td>${e.cell}</td>
              <td>${e.designation}</td>
              <td>${e.street_address}</td>
              <td>${e.group}</td>
              <td></td>

        </tr>
        `;
      });
      myHtml += `
      </thead>
       <tbody class="text-center">
       </tbody>
       </table>
       </div>
       </div>
      `;

    }
    $('#existing_member_section').html(myHtml)
    // $('#existing_total_span').html(data.existing_members_list.length)

















    myHtml = ''

    if (data.wrong_format_member_list.length == 0) {
      myHtml += `													
      	<div class="row justify-content-center">
          <h4><img src="/static/assets/media/icons/no_data.png" width="30px" class="kt-padding-r-5">
              <span class="font-weight-bold text-dark fa-xs">No records found</span>
          </h4>
        </div>`;

    } else {

      myHtml += `
      <div class="row head-top border">
      <div class="col-md-6">
          <div class="heading-top">
              <p class="kt-font-lg kt-font-bold kt-margin-b-0 kt-padding-t-15 kt-padding-b-15 kt-padding-l-5">Invalid Members</p>
              
          </div>
      </div>

      <div class="col-md-6">
        <div class="heading-top text-right kt-padding-t-10 kt-padding-b-10">
                <a href="javascript:;" class="btn btn-primary btn-icon-sm kt-margin-r-10"  id="export">
                    <i class="fa fa-share-square"></i> Export
                </a>
            </div>
        </div>
      </div>

      <div class="border kt-margin-b-15">
      <div class="row head-top-2 tb-head-fix kt-scroll" data-scroll="true" data-height="400">    
      <table class="table kt-margin-b-0" id="wrong_format_table">
      <thead class="text-center">
        <tr class="table-border-custom">
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Mobile Phone</th>
            <th>Designation</th>
            <th>Street Address</th>
            <th>Group</th>
          </tr>
      </thead>
      <thead class="text-center">`

      data.wrong_format_member_list.forEach(function (e, index) {

        myHtml += `
        <tr class="table-border-custom">
              <td ><b>${index + 1}</b></td>
              <td>${e.first_name}</td>
              <td>${e.last_name}</td>
              <td >${e.email}</td>`;
        myHtml += toString(e.dob).toLowerCase() == "Wrong date format".toLowerCase() ? `<td   class="kt-font-danger">${e.dob}</td>` : `<td>${e.dob}</td>`

        myHtml += `    
              <td>${e.cell}</td>
              <td>${e.designation}</td>
              <td>${e.street_address}</td>`

        myHtml += e.group.toLowerCase() == "Wrong group".toLowerCase() ? `<td   class="kt-font-danger">${e.group}</td></tr>` : `<td>${e.group}</td></tr>`;



      });
      myHtml += `
      </thead>
       <tbody class="text-center">
       </tbody>
       </table>
       </div>
       </div>
      `;

    }
    $('#invalid_member_section').html(myHtml)
    $('#invalid_total_span').html(data.wrong_format_member_list.length)



    myHtml = ''

    if (data.wrong_format_member_list.length == 0) {
      myHtml += `													
      	<div class="row justify-content-center" style="display:none">
          <h4><img src="/static/assets/media/icons/no_data.png" width="30px" class="kt-padding-r-5">
              <span class="font-weight-bold text-dark fa-xs">No records found</span>
          </h4>
        </div>`;

    } else {

      myHtml += `
      <div class="row head-top border" style="display:none">
      <div class="col-md-6">
          <div class="heading-top">
              <p class="kt-font-lg kt-font-bold kt-margin-b-0 kt-padding-t-15 kt-padding-b-15 kt-padding-l-5">Invalid Members</p>
              
          </div>
      </div>

      <div class="col-md-6" style="display:none">
        <div class="heading-top text-right kt-padding-t-10 kt-padding-b-10">
                <a href="javascript:;" class="btn btn-primary btn-icon-sm kt-margin-r-10"  id="export">
                    <i class="fa fa-share-square"></i> Export
                </a>
            </div>
        </div>
      </div>

      <div class="border kt-margin-b-15" style="display:none">
      <div class="row head-top-2 tb-head-fix kt-scroll" data-scroll="true" data-height="400">    
      <table class="table kt-margin-b-0" id="wrong_format_table_hidden" style="display:none">
      <thead class="text-center">
        <tr class="table-border-custom">

            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>date_of_birth</th>
            <th>cell_phone_number</th>
            <th>designation</th>
            <th>street_address</th>
            <th>city</th>
            <th>state</th>
            <th>zip</th>
            <th>group</th>
          </tr>
      </thead>
      <thead class="text-center" style="display:none">`

      data.wrong_format_member_list.forEach(function (e, index) {

        myHtml += `
        <tr class="table-border-custom">

              <td>${e.first_name}</td>
              <td>${e.last_name}</td>
              <td >${e.email}</td>`;
        myHtml += e.dob.toLowerCase() == "Wrong date format".toLowerCase() ? `<td   class="kt-font-danger">${e.dob}</td>` : `<td>${e.dob}</td>`

        myHtml += `    
              <td>${e.cell}</td>
              <td>${e.designation}</td>
              <td>${e.street_address}</td>
              <td>${e.city}</td>
              <td>${e.state}</td>
              <td>${e.zip}</td>`

        myHtml += e.group.toLowerCase() == "Wrong group".toLowerCase() ? `<td   class="kt-font-danger">${e.group}</td></tr>` : `<td>${e.group}</td></tr>`;



      });
      myHtml += `
      </thead>
       <tbody class="text-center">
       </tbody>
       </table>
       </div>
       </div>
      `;

    }
    $('#invalid_member_section_hidden').html(myHtml)
    // $('#invalid_total_span_hidden').html(data.wrong_format_member_list.length)




    $("#kt_modal_32").modal()
  }


  var submitTableResult = function () {
    $('.submit_btn').on('click', function () {

      var btn = $(this)
      var new_member_email_list = []
      var existing_member_email_list = []
      var new_member_index_list = []
      var existing_member_index_list = []
      var check = 0

      btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);

      $('#new_review_and_submit_table').find('tr').each(function (i, val) {
        check = 0
        $(val).find('td').each(function (j, val1) {
          // console.log(val1)
          check++;
          if (check == 1) {
            new_member_index_list.push($(val1).text())
          }
          if (check == 4) {
            new_member_email_list.push($(val1).html())
          }

        })

        // console.log(i, val)


      })

      $('#existing_review_and_submit_table').find('tr').each(function (i, val) {
        check = 0
        $(val).find('td').each(function (j, val1) {
          // console.log(val1)
          check++;
          if (check == 1) {
            existing_member_index_list.push($(val1).text())
          }
          if (check == 4) {
            existing_member_email_list.push($(val1).html())
          }

        })

        // console.log(i, val)


      })

      if (new_member_email_list.length == 0 && existing_member_email_list==0) {
        swal.fire({
          title: 'Error!',
          text: "Please Select Some Members To Be Uploaded.",
          type: 'warning',
          buttonsStyling: false,
          confirmButtonText: "OK",
          confirmButtonClass: "btn btn-sm btn-bold btn-brand",
        })
        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
      } else {


        // console.log(email_list)
        $.ajax({
          type: "post",
          url: "/members/upload_csv_final/",
          data: { 'data': JSON.stringify({ 'new_member_email_list': new_member_email_list, 'existing_member_email_list': existing_member_email_list, 'new_member_index_list': new_member_index_list, 'existing_member_index_list': existing_member_index_list }) },
          statusCode: {
            //                              401:unauthorize(),
          },
          success: function (response) {


            swal.fire({
              title: 'Uploaded!',
              text: "All Members Uploaded Successfully",
              type: 'success',
              buttonsStyling: false,
              confirmButtonText: "OK",
              confirmButtonClass: "btn btn-sm btn-bold btn-brand",
            })
            $(this).closest('.snip0013').remove();
            setTimeout(function () {
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
              location.reload()
            }, 1000)
          }
        });
      }

    });


  }



  $(document).on('click', '#new_check_all', function () {
    // console.log('clickckck')
    $('.new_check_list:input:checkbox').not(this).prop('checked', this.checked);
  });

  $(document).on('click', '#existing_check_all', function () {
    // console.log('clickckck')
    $('.existing_check_list:input:checkbox').not(this).prop('checked', this.checked);
  });







  $('.summary_btn').on('click', function () {
    // console.log('btnnnnns')



    var myHtml = ``;

    if ($('.new_check_list:input:checkbox:checked').closest('tr').length == 0 && $('.existing_check_list:input:checkbox:checked').closest('tr').length == 0) {

      myHtml += `  
     
     <div class="row justify-content-center">
         <h4><img src="/static/assets/media/icons/no_data.png" width="30px" class="kt-padding-r-5">
             <span class="font-weight-bold text-dark fa-xs">No records found</span>
         </h4>
     </div>`;

    }
    if ($('.new_check_list:input:checkbox:checked').closest('tr').length != 0) {

      myHtml +=

        `<div class="kt-heading kt-heading--md w-50 m-auto mb-4">New Members</div>
        <hr class="w-50 m-auto mb-4">
        <div class="row justify-content-center mt-5">
        <table class="table table-borderless w-50 member-t-p" id ="new_review_and_submit_table">
            <thead class="kt-margin-b-15 text-center">
              <tr class="">
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">DOB</th>
                <th scope="col">Mobile Phone</th>
                <th scope="col">Designation</th>
                <th scope="col">Street Address</th>
                <th scope="col">Group</th>
              </tr>
            </thead>
            <tbody>`;

      var check = 0
      $('.new_check_list:input:checkbox:checked').closest('tr').each(function (i, val) {
        check = 0

        myHtml += `<tr class="">`
        $(val).find('td').each(function (j, val1) {
          check++;
          if (check < 10) {

            myHtml += `<td>${$(val1).html()}</td>`;
          }
        })

        myHtml += `</tr>`
      })

      myHtml += `
      </tbody>
          </table>
    </div> `
    }

    if ($('.existing_check_list:input:checkbox:checked').closest('tr').length != 0) {

      myHtml +=
        `<div class="kt-heading kt-heading--md w-50 m-auto mb-4">Existing Members</div>
      <hr class="w-50 m-auto mb-4">
      <div class="row justify-content-center mt-5">
      <table class="table table-borderless w-50 member-t-p" id ="existing_review_and_submit_table">
          <thead class="kt-margin-b-15 text-center">
            <tr class="">
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
              <th scope="col">Mobile Phone</th>
              <th scope="col">Designation</th>
              <th scope="col">Street Address</th>
              <th scope="col">Group</th>
            </tr>
          </thead>
          <tbody>`;

      $('.existing_check_list:input:checkbox:checked').closest('tr').each(function (i, val) {
        check = 0

        myHtml += `<tr class="">`
        $(val).find('td').each(function (j, val1) {
          check++;
          if (check < 10) {

            myHtml += `<td>${$(val1).html()}</td>`;
          }
        })

        myHtml += `</tr>`
      })

      myHtml += `
          </tbody>
              </table>
        </div> `



    }

    $('#review_submit_section').html(myHtml);



  });
  $(document).on('click', '#export', function () {
    $("#wrong_format_table_hidden").tableToCSV({
      fileName: 'wrong_format_data',
      extension: 'csv',
      outputheaders: true,
      seperator: ',',



    });
    // console.log('sacsac')
  })

  // $("#export").click(function(){
  //   $("#wrong_format_table").tableToCSV();
  // });

  return {
    // public functions
    init: function (form, file_path, image_url) {
      FormdropzoneImage(form, file_path, image_url);
      submitTableResult();
      // UpdateTableFromFileResponse();

    }
  };
}();





