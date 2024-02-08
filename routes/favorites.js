const express = require('express');
const router = express.Router();
const db = require('../db/connection');
//
router.get('/', (req, res) => {
  const userId = req.cookies.user_id;
  const query = `SELECT DISTINCT products.id, products.title, products.price FROM products JOIN favorites ON products.id = favorites.product_id WHERE favorites.user_id = $1`;
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

router.post('/', (req, res) => {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized. User not logged in.' });
  }

  const userCheckQuery = `SELECT * FROM users WHERE id = $1`;// Next, verify that the userId represents a real user in the database
  db.query(userCheckQuery, [userId])
    .then(data => {
      if (data.rows.length === 0) {
        return res.status(401).json({ error: 'Unauthorized. Invalid user ID.' });
      }
      const { productId } = req.body;
      const query = `INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)`;
      return db.query(query, [userId, productId]);
    })
    .then(() => {
      res.json({ message: 'Product added to favorites' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



router.delete('/:productId/delete', (req, res) => {
  const userId = req.cookies.user_id;
  const productId = req.params.productId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized. User not logged in.' });
  }

  const userCheckQuery = `SELECT * FROM users WHERE id = $1`;
  db.query(userCheckQuery, [userId])
    .then(data => {
      if (data.rows.length === 0) {
        return res.status(401).json({ error: 'Unauthorized. Invalid user ID.' });
      }
      const query = `DELETE FROM favorites WHERE user_id = $1 AND product_id = $2`;
      return db.query(query, [userId, productId]);
    })
    .then(() => {
      res.json({ message: 'Product removed from favorites' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
