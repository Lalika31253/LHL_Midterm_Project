const db = require('../connection');

const getProducts = () => {
  return db.query('SELECT * FROM products;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log(error.message);
      throw error;
    });
};

const getProduct = (id) => {
  const queryParams = [id];
  return db.query('SELECT * FROM products WHERE id =$1', queryParams)
  .then(data => {
    return data.rows;
  })
  .catch (error => {
    console.log(error.message);
    throw error;
  });
};

const addProduct = (options) => {
  const title = options.title;
  const description = options.description;
  const price = options.price;
  const photo_url_1 = options.photo_url_1;
  const photo_url_2 = options.photo_url_2;
  const photo_url_3 = options.photo_url_3;
  const stock_quantity = options.stock_quantity
  ;


  const queryParams = [
    title,
    description,
    price,
    photo_url_1,
    photo_url_2,
    photo_url_3,
    stock_quantity
  ];

  let queryString = `
  INSERT INTO products(title, description, price, photo_url_1, photo_url_2, photo_url_3, stock_quantity)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;`;

  return db.query(queryString, queryParams)
  .then(data => {
    return data.rows;
  })
  .catch(error => {
    console.log(error.message);
  });
};



const deleteProduct = (options) => {
  const { id } = options;

  let queryString = `
  DELETE FROM products 
  WHERE id = $1
  RETURNING *;`;

  return db.query(queryString, [id])
  .then(data => {
    return data.rows;
  })
  .catch(error => {
    console.log(error.message);
  });
};

module.exports = { addProduct, deleteProduct, getProduct };
