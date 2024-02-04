// Client facing scripts here

// Template for products

const createProduct = function (productData) {
  return`
  <article class="featured-item">
          <section class="featured-item__preview-image">
            <img src="${productData.photo_url_1}" alt="featured-furniture" style="width: 200px; border:solid;">
          </section>
          <section class="featured-item__details">
            <h3 class="featured-item__title">${productData.title}</h3>
            <footer class="featured-item__footer">
              <div class="featured-item__rating">Quantity in stock: ${productData.stock_quantity}</div>
              <br>
              <div class="featured-item__price">Price: ${(productData.price)/100}</div>
              <br>
              <div class="featured-item__description">Description: ${productData.description}</div>
              <br>
              <div class="featured-item__message">Avalable: ${productData.is_sold ? + "SOLD" : "Not sold"}</div>
              <div class="featured-item__message"><a href="/message">Send message to user</a></div>
              <br>
              <div class="featured-item__favourite">Favourite <i class="fa-regular fa-heart"></i></div>

            </footer>
          </section>
        </article>
  `;
}

// Load products on main page -- in progress

const renderProducts = (productData) => {
  for (const product of productData) {
    const $product = createProduct(product);
    $('.product-container').prepend($product);
  }

};

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
      $('#product-container').html(" ");
      for (let item of results.products) {
        $('#product-container').append(createProduct(item));
      }
    })
})


$(document).ready(function() {
  $(".add_button").on("click", function() {
    window.location.href="/add";
  });
});

