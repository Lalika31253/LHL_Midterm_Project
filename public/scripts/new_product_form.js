
$(document).ready(function () {
  $('#new-product-form').on('submit', function (event) {
    event.preventDefault();
    // Serialize form data
    const formData = $(this).serialize();

    // Send a POST request to the server
    $.post('http://localhost:8000/api/add', formData, function (response) {
      console.log(response);
      
    }).fail(function (error) {
      console.error(error);
    
    });
  });
});

  // - That form will make a query post request to the back end 
  // - ie $.post('localhost:8000/api/add')
  // - backend will have app.post('/api/add')

s