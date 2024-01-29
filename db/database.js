// To be edited for price filter

const filterPrice = (options, limit = 10) => {

  const queryParams = [];

  // Initial query
  let queryString = `
  SELECT products.*, price
  FROM products
  `;

  // // Search for city
  // if (options.city) {
  //   queryParams.push(`%${options.city}%`);
  //   queryString += `WHERE city LIKE $${queryParams.length} `;
  // }

  // // Owner id
  // if (options.owner_id) {
  //   queryParams.push(options.owner_id);
  //   queryString += `AND owner_id = $${queryParams.length} `;
  // }

  // Search by cost
  if (options.minimum_price && options.maximum_price) {
    queryParams.push(options.minimum_price * 100, options.maximum_price * 100);
    queryString += `AND price >= $${queryParams.length - 1} AND price <= $${queryParams.length}`;
  } else if (options.minimum_price) {
    queryParams.push(options.minimum_price * 100);
    queryString += `AND price >= $${queryParams.length}`;
  } else if (options.maximum_price) {
    queryParams.push(options.maximum_price * 100);
    queryString += `AND price <= $${queryParams.length}`;
  }

  queryString += `
  GROUP BY products.id
  `;

  // // Search by rating
  // if (options.minimum_price_rating) {
  //   queryParams.push(options.minimum_price_rating);
  //   queryString += `
  //    HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  // }

  queryParams.push(limit);
  queryString += `
  ORDER BY price
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);

};

module.exports = {
  filterPrice,
};
