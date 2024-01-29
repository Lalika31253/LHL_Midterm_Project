// To be edited for price filter

const getAllProperties = (options, limit = 10) => {

  const queryParams = [];

  // Initial query
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
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
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100, options.maximum_price_per_night * 100);
    queryString += `AND cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length}`;
  } else if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `AND cost_per_night >= $${queryParams.length}`;
  } else if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND cost_per_night <= $${queryParams.length}`;
  }

  queryString += `
  GROUP BY properties.id
  `;

  // // Search by rating
  // if (options.minimum_rating) {
  //   queryParams.push(options.minimum_rating);
  //   queryString += `
  //    HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  // }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);

};

module.exports = {
  getAllProperties,
};
