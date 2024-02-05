const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = $1`;
  console.log(query);
  db.query(query, [username])
    .then(data => {
      const user = data.rows[0];
      if (!user) {

        return res.status(401).json({ error: 'Invalid username or password' });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // req.session.user = user;
      res.cookie('user_id', user.id, {maxAge: 24 * 60 * 60 * 1000});
      // res.json({ message: 'Login successful', user });
      res.redirect('/favorites');
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/', (req, res) => {
  res.render('login');
});

module.exports = router;
