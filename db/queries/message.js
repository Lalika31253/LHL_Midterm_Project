const db = require('../connection');

// Take the email from the receiver_id input and match it to the receiver_id in the database
//SELECT id FROM users WHERE email = $1;

// const idToEmail = function(id) {
//   return db.query(`
//   SELECT email FROM users WHERE id = ${id}
//   `);
// }

// Turn user email into id number

const emailToId = function(email) {
  let query = `
  SELECT id FROM users WHERE email = $1;
  `;

  const queryParams = [email];

  return db.query(query, queryParams)
  .then((res) => {
    return res.rows;
  })
  .catch((err) => {
    throw err;
  });
}

// Send a message

const sendMessage = function (id, receiver, content) {

  // Basic validation
  if (!content) {
    return Promise.reject(new Error('Missing message'));
  }

  let query = `
    INSERT INTO messages(sender_id, receiver_id, content)
    VALUES($1, $2, $3)
    RETURNING *;
  `;

  const queryParams = [id, receiver, content];

  return db.query(query, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = { sendMessage, emailToId };
