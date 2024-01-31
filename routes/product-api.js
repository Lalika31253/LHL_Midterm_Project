console.log('Product API route is registered!');

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const {  addProduct } = require('../db/queries/products');


// router.route('/api/add')
// .get((req, res) => {
//   if(!req.session.admin) {
//     res.redirect('/');
//   }
//   res.render('/api/add', {admin: req.session.admin});
// })
// .post((req, res) => {
//   const insertData = req.body;
//   addProduct(insertData);
//   res.redirect('/');
// });


router.route('/add') 
.get((req, res) => {
console.log('Add page');
})
// .post(async (req, res) => {
//   console.log('POST request to /api/add received!');
//   try {
//     const formData = req.body;
//     const newProduct = await addProduct(formData);

//     res.json({success: true, newProduct});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({success: false, error: 'Server error'});
//   }
// });

module.exports = router;

// - That form will make a query post request to the back end 
// - ie $.post('localhost:8000/api/add')
// - backend will have app.post('/api/add')