const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { deleteProduct } = require('../db/queries/products');

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


router.route('/')
.post(async (req, res) => {
  try {
  const { id } = req.body;
  const deletedProduct = await deleteProduct({ id });
  res.json({success: true, deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, error: 'Server error'});
  }
});

module.exports = router;