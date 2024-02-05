const db = require('../connection');

const getPriceFilter = options => {

  // const queryParams = [];

  let query = `
  SELECT products.*
  FROM products
  WHERE price >= ${options.minimum_price} AND price <= ${options.maximum_price}
  ORDER BY price;
  `;

  return db.query(query)
  .then((res) => res.rows);

}

// const getPriceFilter = options => {

//   // const queryParams = [];

//   let query = `
  // SELECT products.*
  // FROM products
  // WHERE price >= 0 AND price <= 9999999
  // ORDER BY price;
//   `;

//   return db.query(query)
//   .then((res) => res.rows);

// }

module.exports = { getPriceFilter };
