const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getProduct } = require('../db/queries/products');


//route to handle add_product
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const userData = res.locals.user || {};
  try {
    const product = await getProduct(productId);
    if (product) {
      // res.render('product_listing', { product });
      console.log(product);
      res.render('product_listing', { product, user: userData } );
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;




    // try {
    //   const { id } = req.body;
    //   const product = await getProduct(id);
    //   res.json({success: true, product});
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({success: false, error: 'Server error'});
    // }


