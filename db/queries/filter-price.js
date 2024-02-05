// Filter products by price

const db = require('../connection');

const getPriceFilter = options => {
  // Basic validation (You can make this more robust)
  if (!options.minimum_price || !options.maximum_price) {
    return Promise.reject(new Error('Missing minimum or maximum price options'));
  }

  // Convert to numbers to avoid SQL injection and ensure correct query formatting
  const minPrice = Number(options.minimum_price);
  const maxPrice = Number(options.maximum_price);

  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return Promise.reject(new Error('Invalid minimum or maximum price values'));
  }

  // Parameterized query to prevent SQL injection
  let query = `
    SELECT products.*
    FROM products
    WHERE price >= ($1*100) AND price <= ($2*100)
    ORDER BY price;
  `;

  const queryParams = [minPrice, maxPrice];

  return db.query(query, queryParams)
    .then((res) => res.rows)
    .catch((err) => {
      // Handle errors, maybe log them and then rethrow or reject
      throw err;
    });
}

module.exports = { getPriceFilter };
