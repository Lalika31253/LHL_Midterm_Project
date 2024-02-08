// const db = require('../connection');

// // Send a message

// const sendMessage = function (options) {
//   // Logging the content to make sure it's what we expect
//   console.log(options.content);

//   // Basic validation
//   if (!options.content) {
//     return Promise.reject(new Error('Missing message'));
//   }

//   let query = `
//     INSERT INTO messages(content)
//     VALUES($1)
//     RETURNING *;
//   `;

//   const queryParams = [options.content];

//   return db.query(query, queryParams)
//     .then((res) => {
//       return res.rows;
//     })
//     .catch((err) => {
//       throw err;
//     });
// }

// module.exports = { sendMessage };


const db = require('../connection');

// Send a message
const sendMessage = function (options) {
  // Logging the options to make sure it's what we expect
  console.log(options);

  // Basic validation for message content and IDs
  if (!options.content || !options.sender_id || !options.receiver_id) {
    return Promise.reject(new Error('Missing required message fields'));
  }

  let query = `
    INSERT INTO messages (sender_id, receiver_id, content, created_at)
    VALUES ($1, $2, $3, NOW()) RETURNING *;
  `;

  // Including sender_id and receiver_id in queryParams
  const queryParams = [options.sender_id, options.receiver_id, options.content];

  return db.query(query, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = { sendMessage };
