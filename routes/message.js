/*
* All routes for Users are defined here
* Since this file is loaded in server.js into /users,
*   these routes are mounted onto /users
* See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
*/

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { sendMessage } = require('../db/queries/message');
const { emailToId } = require('../db/queries/message');

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
});

router.route('/')
.get((req, res) => {
  console.log('get path'); // For debugging
  const userData = res.locals.user || {};
  const userId = req.cookies.user_id;
  db.query(`SELECT * FROM messages WHERE receiver_id = $1;`, [userId])
    .then(messages => {
      res.render('message', { messages: messages.rows, user: userData });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

router.route('/')
.post(async (req, res) => {
  const userId = req.cookies.user_id;
  console.log('POST request received!', req.body);
  try {
    const formData = req.body;
    const receiverId = await emailToId(formData.email);
    // console.log('Form Data:', receiverId[0].id);
    const newMessage = await sendMessage(userId, receiverId[0].id, formData.content);

   res.json({success: true, newMessage, redirectUrl: '/message'});
 } catch (error) {
   console.log(error);
   res.status(500).json({success: false, error: 'Server error'});
 }
});

module.exports = router;


 //one is get
//makes an api call and gives you a list of all the messages
//second route that submits a message *post request for a message
// perpetually ping with jquerry
