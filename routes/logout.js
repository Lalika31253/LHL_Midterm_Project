const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.clearCookie('user_id');
  // res.json({ message: 'Logout successful' });
  res.redirect('/');
});

module.exports = router;
