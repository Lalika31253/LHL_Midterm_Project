const db = require('../connection');

// Send a message

const sendMessage = function (options) {
  console.log(message);

  // Basic validation
  if (!options.content) {
    return Promise.reject(new Error('Missing message'));
  }

  const query = `
    INSERT INTO messages (sender_id, reciever_id, content, created_at )
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `;

  const queryParams = [sender_id, reciever_id, message, created_at];

  return db.query(query, [queryParams])
    .then((res) => {
      return res.rows;
    })

    .catch((err) => {
      throw err;
    })
}

module.exports = { sendMessage };
