
// $(document).ready(function () {
// $(document).on('click', '.featured-item', function () {
//   const productId = $(this).data('product-id');
//   const productDetailsUrl = `/product/${productId}`;
//   window.location.href = productDetailsUrl;

// });
// });

$(document).ready(function () {

  $(document).on('click', '.featured-item', function () {
    const productId = $(this).data('product-id');
  // Send a GET request to the server to fetch product details
  $.ajax({
    method: 'GET',
    url: `/product/${productId}`,
    data: productId,
    responseType: 'json',
    success: function (response) {
      console.log('Product details:', response.product);
      window.location.href = response.redirectUrl || `/product/${productId}`;
    },
    error: function (error) {
      console.log(error);
    }
  });
});
});


