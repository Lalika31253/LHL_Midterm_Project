// Client facing scripts here

// Template for products

const createProduct = function (productData) {
  return `
  <article class="featured-item">
  <section class="featured-item__preview-image">
    <img src="${productData.photo_url_1}" alt="featured-furniture" style="width: 200px; border:solid;">
  </section>
  <section class="featured-item__details">
    <h3 class="featured-item__title">${productData.title}</h3>
    <footer class="featured-item__footer">
      <div class="featured-item__rating">Quantity in stock:${productData.stock_quantity}</div>
      <div class="featured-item__price">Price: $${(productData.price)/100}</div>
      <div class="featured-item__description">Description: ${productData.description}</div>
      <div class="featured-item__favourite">Favourite<i class="fa-regular fa-heart"></i></div>
      <div class="featured-item__message"><a href="https://www.ikea.com/ca/en/">send message to user</a></div>

    </footer>
  </section>
</article>`
}

// For filtering prodcuts by price

$('#filter-price-form').submit(function (event) {
  event.preventDefault();

  const formData = $(this).serialize(); // serialize return obj
  // console.log(formData);

  $.ajax('/api/filter', {

    method: 'GET',
    data: formData

  })
    .then(function (results) {
      $('#filtered-items').html(" ");
      for (let item of results.products) {
        $('#filtered-items').append(createProduct(item));
      }
    })
})


$(document).ready(function() {
  $(".add_button").on("click", function() {
    window.location.href="/add";
  });
});

