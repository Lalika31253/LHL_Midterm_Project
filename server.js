// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
<<<<<<< HEAD
=======
// const cookieSession = require('cookie-session');
>>>>>>> e9ab06399c33f41eed136dd6f382548290210fc8
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

const db = require('./db/connection');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
// app.use(cookieSession({
//   name: 'Andrew',
//   keys: ['secret keys'],
//   maxAge: 24 * 60 * 60 * 1000
// }));
app.use(cookieParser('your secret key'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const searchRoutes = require('./routes/search');
const newProductForm = require('./routes/users');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/search', searchRoutes);
app.use('/add', newProductForm);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get('/', (req, res) => {

  db.query(`SELECT * FROM products`)
  .then(data => {
    // console.log(data.rows);
    res.render('index', { products: data.rows });
  })

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
