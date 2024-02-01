const { response } = require("express");

$(document).ready(function () {
  
  $('#new-product-form').on('submit', function (event) {
    event.preventDefault();
    // Serialize form data
    const formData = $(this).serialize();

    // Send a POST request to the server
    $.ajax({
      method: 'POST',
      url: '/add',
      data: formData,
      success: function (response) {
        console.log('success');
      },
    error: function (error) {
      console.log(error);
    }
    });

  });
});


s