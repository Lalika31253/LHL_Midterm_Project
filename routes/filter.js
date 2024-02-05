
const express = require('express');
const router = express.Router();
const { getPriceFilter } = require('../db/queries/filter-price')

router.get('/', (req, res) => {
  console.log(req.query, "hello");
  getPriceFilter(req.query)
    .then(products => {
      // const products = data.rows;
      res.json({ products });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
