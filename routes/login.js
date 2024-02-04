const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.route('/')
.get((req, res) => {
  res.render('login_form');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = $1`;
  console.log(query);
  db.query(query, [email])
    .then(data => {
      const user = data.rows[0];
      // console.log(user);
      // console.log(req.body);
      if (!user) {

        return res.status(401).json({ error: 'Invalid username or password' });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // req.session.user = user;
      res.cookie('user_id', user.id, {maxAge: 24 * 60 * 60 * 1000});
      // res.json({ message: 'Login successful'});
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
