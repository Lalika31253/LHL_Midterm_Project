
$(document).ready(function () {

  $('.delete_product').on('submit', function (event) {
    event.preventDefault();
    const productId = $(this).find('input[name="itemId"]').val();

    // Send a DELETE request to the server
    $.ajax({
      method: 'POST',
      url: '/delete',
      data: {id: productId},
      success: function (response) {
        console.log('success');
        location.reload(); // 
      },
    error: function (error) {
      console.log(error);
    }
    });

  });
});

