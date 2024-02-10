const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getProduct } = require('../db/queries/products');

// Middleware to check if the user is logged in and set user object in res.locals
router.use((req, res, next) => {
  const userId = req.cookies.user_id;
  if (userId) {
    // Fetch user data from the database based on user ID
    db.query(`SELECT * FROM users WHERE id = $1`, [userId])
      .then(data => {
        const user = data.rows[0];
        if (user) {
          // If the user exists, set it in res.locals
          res.locals.user = user;
          console.log(res.locals.user);
        }
        next();
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } else {
    // If no user ID in cookies, proceed to next middleware
    next();
  }
});


//route to handle add_product
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
 
  try {
    const userData = res.locals.user || {};
    const products = await getProduct(productId);
    if (products && products.length > 0) {
      const product = products[0];
      console.log(product);
      res.render('product_listing', { product, user: userData } );
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    console.error(error.stack)
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;


