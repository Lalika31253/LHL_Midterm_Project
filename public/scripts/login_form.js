const { response } = require("express");

$(document).ready(function () {

  $('.login-form').on('submit', function (event) {
    event.preventDefault();
    // Serialize form data
    const formData = $(this).serialize();

    // Send a POST request to the server
    $.ajax({
      method: 'POST',
      url: '/login',
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
