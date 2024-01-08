


$('body').on('click','.delete_version',function () {
    var id = $(this).attr('data-id');
    alert('ghjg')
    var $this = $(this);
            swal.fire({
                //buttonsStyling: false,

                html: "Are you sure you want to delete this data?",
                type: "info",

                confirmButtonText: "Yes, delete!",
                confirmButtonClass: "btn btn-sm btn-bold btn-brand",

                showCancelButton: true,
                cancelButtonText: "No, cancel",
                cancelButtonClass: "btn btn-sm btn-bold btn-default",
                showLoaderOnConfirm: true,
                preConfirm:(login) => {
                    return fetch('/version-history/delete/'+id+'/')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                          `Request failed: ${error}`
                        )
                    })
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.value) {

                        swal.fire({
                            title: 'Deleted!',
                            text: "Data deleted successfully",
                            type: 'success',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        }).then(function (result) {
                            $this.closest('.kt-portlet').remove();
                        })



                    }
                })

})
