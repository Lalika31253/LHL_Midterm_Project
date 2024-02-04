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
<<<<<<< HEAD

  // - That form will make a query post request to the back end
  // - ie $.post('localhost:8000/api/add')
  // - backend will have app.post('/api/add')

s
=======
>>>>>>> bb8c566901ddf6767b462dacd16d3d3f4bd44e3c
