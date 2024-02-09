const express = require('express');
const router = express.Router();

// Logout route
router.route('/').get((req, res) => {
  // Clear the user_id cookie
  res.clearCookie('user_id');
  res.redirect('/login');
});


module.exports = router;
