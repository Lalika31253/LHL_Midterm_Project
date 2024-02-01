/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const filter = require('../db/queries/filter-price');

router.get('/', (req, res) => {
  filter.filterPrice()
    .then(users => {
      console.log('HIHIHI');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// We'll need something like this to connect to for the filter by price?
// router.get("/properties", (req, res) => {
//   database
//     .getAllProperties(req.query, 20)
//     .then((properties) => res.send({ properties }))
//     .catch((e) => {
//       console.error(e);
//       res.send(e);
//     });
// });

module.exports = router;
