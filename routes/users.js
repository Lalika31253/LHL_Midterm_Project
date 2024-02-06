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

//route to handle add_product
router.route('/')
  .get((req, res) => {
    res.render('new_form');
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


router.route('/test')
  .get((req, res) => {
    res.render('test');
  });

module.exports = router;
