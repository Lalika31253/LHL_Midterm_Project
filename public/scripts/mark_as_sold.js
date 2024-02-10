
$(document).ready(function () {

  $('.mark_sold').on('submit', function (event) {
    event.preventDefault();
    const productId = $(this).find('input[name="itemId"]').val();

    // Send a mark sold request to the server
    $.ajax({
      method: 'POST',
      url: '/mark_as_sold',
      data: {id: productId},
      success: function (response) {
        console.log('success');

      },
    error: function (error) {
      console.log(error);
    }
    });

  });
});

