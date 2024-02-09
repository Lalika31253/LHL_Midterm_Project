const db = require('../connection');

const isSold = (product_id) => {

let query = `
UPDATE prodcuts
SET is_sold = TRUE
WHERE products.id = $1
`

  return db.query(query, [product_id])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log('error', err);
    })
}

module.exports = { isSold };
