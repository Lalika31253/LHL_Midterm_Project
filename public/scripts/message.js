const { response } = require("express");

$(document).ready(function () {

  $('#send-message-form').on('submit', function (event) {
    event.preventDefault();
    // Serialize form data
    const formData = $(this).serialize();

    // Send a POST request to the server
    $.ajax({
      method: 'POST',
      url: '/message',
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

  // - That form will make a query post request to the back end
  // - ie $.post('localhost:8000/api/add')
  // - backend will have app.post('/api/add')

s
