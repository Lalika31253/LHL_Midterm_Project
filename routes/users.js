/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { addProduct } = require('../db/queries/products');

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
router.route('/')
  .get((req, res) => {
    // Get the user data from res.locals
    const userData = res.locals.user || {};
    console.log('userData from form', userData);
    res.render('new_form', { user: userData })
  })

  .post(async (req, res) => {
    console.log('POST request to /api/add received!');
    try {
      const formData = req.body;
      console.log('Form Data:', formData);
      const newProduct = await addProduct(formData);

      res.json({success: true, newProduct, redirectUrl: '/'});
    } catch (error) {
      console.log(error);
      res.status(500).json({success: false, error: 'Server error'});
    }
  });

module.exports = router;
