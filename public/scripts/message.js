// const { response } = require("express");

$(document).ready(function () {

  $('#send-message-form').on('submit', function (event) {
    event.preventDefault();
    // Serialize form data
    const formData = $(this).serialize();

    console.log(formData);

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

  // $(document).ready(function() {
  //   $(".send-message").on("click", function() {
  //     window.location.href="/message";
  //   });
  // });

