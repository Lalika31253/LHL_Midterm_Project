const express = require('express');
const router = express.Router();
const { getPriceFilter } = require('../db/queries/filter-price');

// Note the path here is just '/', because '/api/filter' is already prefixed by app.use() in your server setup
router.get('/', (req, res) => {
  console.log(req.query); // For debugging
  getPriceFilter(req.query)
    .then(products => {
      res.json({ products });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

