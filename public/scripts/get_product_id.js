// $(document).ready(function () {
//   const $productList = $('.featured-item');

//   $productList.each(function () {
//     const data = $(this).data();
//     const html = `
//       <article class="featured-item" data-product-id="${data.productId}">
//         <section class="featured-item__preview-image">
//           <img src="${data.photo_url_1}" alt="featured-furniture" style="width: 200px; border:solid;">
//         </section>
//         <section class="featured-item__preview-image">
//           <img src="${data.photo_url_2}" alt="featured-furniture" style="width: 200px; border:solid;">
//         </section>
//         <section class="featured-item__preview-image">
//           <img src="${data.photo_url_3}" alt="featured-furniture" style="width: 200px; border:solid;">
//         </section>
//         <section class="featured-item__details">
//           <h3 class="featured-item__title">${data.title}</h3>
//           <footer class="featured-item__footer">
//             <div class="featured-item__rating">Quantity in stock: ${data.stock_quantity}</div>
//             <br>
//             <div class="featured-item__price">Price: $ ${data.price/100}</div>
//             <br>
//             <div class="featured-item__description">Description: ${data.description}</div>
//             <br>
//             <div class="featured-item__message"><a href="/message">Send message to user</a></div>
//             <br>
//             <div class="featured-item__favourite">Favourite <i class="fa-regular fa-heart"></i></div>
//           </footer>
//         </section>
//       </article>`;
//     $(this).replaceWith(html); // Use replaceWith instead of append
//   });
// });
$(document).ready(function () {
$(document).on('click', '.featured-item', function () {
  const productId = $(this).data('product-id');
  const productDetailsUrl = `/product/${productId}`;
  window.location.href = productDetailsUrl;

  // Send a GET request to the server to fetch product details
  $.ajax({
    method: 'GET',
    url: `/product/${productId}`,
    success: function (response) {
      console.log('Product details:', response.product);
      // Handle the response as needed
    },
    error: function (error) {
      console.log(error);
      // Handle errors
    }
  });
});
})

