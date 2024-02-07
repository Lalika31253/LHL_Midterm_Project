const db = require('../connection');

const loginUsers = (email, password) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  return db.query(query, [email])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { loginUsers };
