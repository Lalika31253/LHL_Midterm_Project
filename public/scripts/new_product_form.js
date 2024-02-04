
$(document).ready(function () {
  
  $('#new-product-form').on('submit', function (event) {
    event.preventDefault();
    console.log('Form submitted!');

    // Serialize form data
    const formData = $(this).serialize();

    // Send a POST request to the server
    $.ajax({
      method: 'POST',
      url: '/add',
      data: formData,
      success: function (response) {
        console.log('success');
        window.location.href = response.redirectUrl || '/';
      },
    error: function (error) {
      console.log(error);
    }
    });

  });
});
