// const express = require('express');
// const router = express.Router();
// const db = require('../db/connection');

// router.post('/:productId/sold', (req, res) => {
//   const userId = req.cookies.user_id;

//   if (!userId) {
//     return res.status(401).json({ error: 'Unauthorized. User not logged in.' });
//   }

//   const userCheckQuery = `SELECT * FROM users WHERE id = $1`;
//   db.query(userCheckQuery, [userId])
//     .then(data => {
//       if (data.rows.length === 0) {
//         return res.status(401).json({ error: 'Unauthorized. Invalid user ID.' });
//       }

//       const user = data.rows[0];
//       if (!user.is_admin) {
//         return res.status(401).json({ error: 'Unauthorized. Only admins can perform this actin.' });
//       }

//       const productId = req.params.productId;
//       console.log('productId:', productId);
//       const query = `UPDATE products SET is_sold = true WHERE id = $1`;
//       return db.query(query, [productId]);
//     })
//     .then(() => {
//       res.json({ message: 'Product marked as sold' });
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message });
//     });
// });



// router.post('/:productId/instock', (req, res) => {
//   const userId = req.cookies.user_id;

//   if (!userId) {
//     return res.status(401).json({ error: 'Unauthorized. User not logged in.' });
//   }

//   const userCheckQuery = 'SELECT * FROM users WHERE id = $1';
//   db.query(userCheckQuery, [userId])
//     .then(userData => {
//       if (userData.rows.length === 0) {
//         return res.status(401).json({ error: 'Unauthorized. Invalid user ID.' });
//       }

//       const user = userData.rows[0];
//       if (!user.is_admin) {
//         return res.status(401).json({ error: 'Unauthorized. Only admins can perform this action.' });
//       }

//       const productId = req.params.productId;
//       console.log('productId:', productId);
//       const query = 'UPDATE products SET is_sold = false WHERE id = $1';
//       return db.query(query, [productId]);
//     })
//     .then(() => {
//       res.json({ message: 'Product marked as in stock' });
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message });
//     });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { sold } = require('../db/queries/products');

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

  const userCheckQuery = `SELECT * FROM users WHERE id = $1`;
  db.query(userCheckQuery, [userId])
    .then(data => {
      if (data.rows.length === 0) {
        return res.status(401).json({ error: 'Unauthorized. Invalid user ID.' });
      }

      const user = data.rows[0];
      if (!user.is_admin) {
        return res.status(401).json({ error: 'Unauthorized. Only admins can perform this actin.' });
      }

      const productId = req.params.productId;
      const query = `UPDATE products SET is_sold = true WHERE id = $1`;
      return db.query(query, [productId]);
    })
    .then(() => {
      res.json({ message: 'Product marked as sold' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.route('/')
  .post(async(req, res) => {
    try {
      const id = req.body.itemId;
      const markSold = await sold(id);
      res.json({success: true, markSold });
    } catch (error) {
      console.log(error);
      res.status(500).json({success: false, error: 'Server error'});

    }
  });

module.exports = router;
