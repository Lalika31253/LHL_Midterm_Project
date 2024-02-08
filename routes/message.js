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

router.route('/')
.get((req, res) => {
  console.log('message here',req.query); // For debugging
  const user = res.locals.user;
  db.query('SELECT * FROM messages;')
    .then(messages => {
      res.render('message', { messages: messages.rows, user });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

router.post(async (req, res) => {
  console.log('POST request received!');
  try {
    const formData = req.body;
    console.log('Form Data:', formData);
    const newMessage = await sendMessage(formData);

    res.json({success: true, newMessage, redirectUrl: '/message'});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, error: 'Server error'});
  }
});



  //one is get
//makes an api call and gives you a list of all the messages
//second route that submits a message *post request for a message
// perpetually ping with jquerry

module.exports = router;
