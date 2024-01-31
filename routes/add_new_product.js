const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const {  addProduct } = require('../db/queries/products');


router.route('/api/add')
.get((req, res) => {
  if(!req.session.admin) {
    res.redirect('/');
  }
  res.render('/api/add', {admin: req.session.admin});
})
.post((req, res) => {
  const insertData = req.body;
  addProduct(insertData);
  res.redirect('/');
});

module.exports = router;

// - That form will make a query post request to the back end 
// - ie $.post('localhost:8000/api/add')
// - backend will have app.post('/api/add')