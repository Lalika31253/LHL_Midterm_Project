/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
// const { addProduct } = require('../db/queries/products');

//route to handle messages
router.route('/')
  .get((req, res) => {
    res.render('message');
  })
  // .post(async (req, res) => {
  //     console.log('POST request to /api/add received!');
  //     try {
  //       const formData = req.body;
  //       const newProduct = await addProduct(formData);

  //       res.json({success: true, newProduct});
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).json({success: false, error: 'Server error'});
  //     }
  //   });

  //one is get
//makes an api call and gives you a list of all the messages
//second route that submits a message *post request for a message
// perpetually ping with jquerry

module.exports = router;
