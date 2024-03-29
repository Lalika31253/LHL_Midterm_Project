const express = require('express');
const router = express.Router();
const { loginUsers } = require('../db/queries/login_queries');


router.get('/', (req, res) => {
  const userData = res.locals.user;
  res.render('login_form', { user: userData});
});


router.post('/', (req, res) => {
  const { email, password } = req.body;

  loginUsers(email, password)
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      res.cookie('user_id', user.id, {maxAge: 24 * 60 * 60 * 1000});

      res.locals.user = user;
      res.json({ message: 'Login successful'});
      // res.redirect('/'); //pas user object to the template
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
