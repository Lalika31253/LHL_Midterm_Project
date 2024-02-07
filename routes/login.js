const express = require('express');
const router = express.Router();
const { loginUsers } = require('../db/queries/login_queries');

//
router.post('/', (req, res) => {
  const { email, password } = req.body;

  loginUsers(email, password)
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.cookie('user_id', user.id, {maxAge: 24 * 60 * 60 * 1000});
      res.json({ message: 'Login successful', user });
      console.log('Successful login');
      console.log('user.id:', user.id);
      console.log('Req.cookies' + JSON.stringify(req.cookies.user_id));
      // res.redirect('/');
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/', (req, res) => {
  res.render('login_form');
});

module.exports = router;
