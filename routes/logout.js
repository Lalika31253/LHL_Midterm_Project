const express = require('express');
const router = express.Router();

// Logout route
router.route('/').get((req, res) => {
  // Clear the user_id cookie
  res.clearCookie('user_id');
  // Redirect the user to the login page or any other appropriate page
  res.redirect('/login');
});


module.exports = router;
