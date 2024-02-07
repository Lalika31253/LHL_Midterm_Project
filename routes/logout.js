const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.clearCookie('user_id');
  res.send('Logged out');
  // res.redirect('/');
  console.log('Logout successful');
});

module.exports = router;
