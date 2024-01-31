// Client facing scripts here

// Add product listing container

const productListing = function(product) {
  return `
  <article class="featured-item" style="border: solid;">
  <section class="featured-item__preview-image">
    <img src="" alt="featured-furniture">
  </section>
  <section class="featured-item__details">
    <h3 class="featured-item__title">Example item </h3>
    <ul class="featured-item__details">
      <li>Item name: ${product}</li>
    </ul>
    <footer class="featured-item__footer">
      <div class="featured-item__rating">rating</div>
      <div class="featured-item__price">price</div>
      <div class="featured-item__price"><button>favourite item</button></div>
      <div class="featured-item__price"><a href="https://www.ikea.com/ca/en/">send message to user</a></div>
    </footer>
  </section>
  </article>`;
}

//jquery for rendering

$(document).ready(function() {
  $("#featured-items").prepend(productListing("chair"))

});
