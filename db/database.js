
// To be edited for price filter

const getAllProducts = (options, limit = 10) => {

  const queryParams = [];

  // Initial query
  let queryString = `
  SELECT products.title
  FROM products
  LIMIT 1;
  `;

  // // Search by cost
  // if (options.minimum_price_per_night && options.maximum_price_per_night) {
  //   queryParams.push(options.minimum_price_per_night * 100, options.maximum_price_per_night * 100);
  //   queryString += `AND cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length}`;
  // } else if (options.minimum_price_per_night) {
  //   queryParams.push(options.minimum_price_per_night * 100);
  //   queryString += `AND cost_per_night >= $${queryParams.length}`;
  // } else if (options.maximum_price_per_night) {
  //   queryParams.push(options.maximum_price_per_night * 100);
  //   queryString += `AND cost_per_night <= $${queryParams.length}`;
  // }

  // queryString += `
  // GROUP BY properties.id
  // `;

  // // Search by rating
  // if (options.minimum_rating) {
  //   queryParams.push(options.minimum_rating);
  //   queryString += `
  //    HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  // }

  // queryParams.push(limit);
  // queryString += `
  // LIMIT 1;
  // `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);

};

module.exports = {
  getAllProducts,
};
