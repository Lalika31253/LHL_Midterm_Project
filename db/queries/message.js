const db = require('../connection');

// Send a message

const sendMessage = function (options) {
  console.log(message);

  // Basic validation
  if (!options.content) {
    return Promise.reject(new Error('Missing message'));
  }

  let query = `
    INSERT INTO messages(content)
    VALUES($1)
    RETURNING *;
    `;

  const queryParams = [options.content];

  return db.query(query, queryParams)
    .then((res) => {
      return res.rows;
    })

    .catch((err) => {
      throw err;
    })
}

module.exports = { sendMessage };
