const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const searchTerms = req.query.search;
  const query = `SELECT * FROM products WHERE title LIKE $1`;
  // console.log(query);
  db.query(query, [`%${searchTerms}%`])
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
