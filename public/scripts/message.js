

$(document).ready(function () {

  $('#send-message-form').on('submit', function (event) {
    event.preventDefault();
    // Serialize form data
    const formData = $(this).serialize();

    console.log('Form data: ', formData);

    // Send a POST request to the server
    $.ajax({
      method: 'POST',
      url: '/message',
      data: formData,
      success: function (response) {
        console.log('success');
        window.location.href = response.redirectUrl || '/message';
      },
    error: function (error) {
      console.log('hi', error);
    }
    });

  });
});

