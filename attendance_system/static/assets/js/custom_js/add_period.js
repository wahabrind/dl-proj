var submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", function (e) {

    btn = $(this);
    var validation = true;
    var form = $('#form')

    
    form.validate({
        rules: {
          period: {
            required: true,
            maxlength: 2500,
          },
          name: {
            required: true,
            maxlength: 200,
          },
        },
        onfocusout: false,
        invalidHandler: function (form, validator) {
          var errors = validator.numberOfInvalids();
          if (errors) {
            focusElement = validator.errorList[0].element;
            validation=false;
          }
          else{
              validation = true;
          }
        }
      });


      if(validation){
          form.submit();
      }

});