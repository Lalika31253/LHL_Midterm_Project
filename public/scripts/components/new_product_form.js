$(document).ready(function () {



  const $newProductForm = $(`
  <form action="/api/add" method="post" id="new-product-form" class="new-product-form">
      <div class="new-product-form__field-wrapper">
        <label for="new-product-form__title">Title</label>
        <input type="text" name="title" placeholder="Title" id="new-product-form__title">
      </div>
      
      <div class="new-product-form__field-wrapper">
        <label for="new-product-form__description">Description</label>
        <textarea placeholder="Description" name="description" id="new-product-form__description" cols="30" rows="10"></textarea>
      </div>

      <div class="new-product-form__field-wrapper">
        <label for="new-product-form__price">Price</label>
        <input placeholder="Price" type="number" name="price" id="new-product-form__price">
      </div>

      <div class="new-product-form__field-wrapper">
        <label for="new-product-form__photo_url_1">Image</label>
        <input placeholder="Furniture Image" type="text" name="photo_url_1" id="new-product-form__photo_url_1">
      </div>

      <div class="new-product-form__field-wrapper">
        <label for="new-product-form__photo_url_2">Image</label>
        <input placeholder="Furniture Image" type="text" name="photo_url_2" id="new-product-form__photo_url_2">
      </div>

      <div class="new-product-form__field-wrapper">
        <label for="new-product-form__photo_url_3">Image</label>
        <input placeholder="Furniture Image" type="text" name="photo_url_3" id="new-product-form__photo_url_3">
      </div>

      <div class="new-product-form__field-wrapper">
        <label for="new-product-form__stock_quantity">Quantity</label>
        <input placeholder="Quantity" type="number" name="stock_quantity" id="new-product-form__stock_quantity" />
      </div>

      <div class="new-product-form__field-wrapper">
        <button>Create</button>
        <a id="new-product-form__cancel" href="#">Cancel</a>
      </div>
        
    </form>
  `);

  window.$newProductForm = $newProductForm;


  $newProductForm.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');

    const formData = $(this).serialize();
    submitProduct(formData)
      .then(() => {
        views_manager.show('listings');
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('listings');
      })
  });

  $('body').on('click', '#new-product-form__cancel', function () {
    views_manager.show('listings');
    return false;
  });

});