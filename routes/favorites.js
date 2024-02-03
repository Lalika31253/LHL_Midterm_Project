const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const userId = req.cookies.user_id;
  const query = `SELECT products.id, products.title, products.price FROM products JOIN favorites ON products.id = favorites.product_id WHERE favorites.user_id = $1`;
  db.query(query, [userId])
    .then(data => {
      const products = data.rows;
      res.json({ products });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
