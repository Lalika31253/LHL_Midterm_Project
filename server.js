// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const sassMiddleware = require('./lib/sass-middleware');
const morgan = require('morgan');
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
const logoutRoutes = require('./routes/logout');
const searchRoutes = require('./routes/search');
const newProductForm = require('./routes/users');
const favoritesRoutes = require('./routes/favorites');

const filterRoutes = require('./routes/filter');
const messageRoutes = require('./routes/message');
const markSoldRoutes = require('./routes/mark_as_sold');
const deleteRoutes = require('./routes/delete');
const productRoutes = require('./routes/product_id');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/filter', filterRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/search', searchRoutes);
app.use('/add', newProductForm);
app.use('/favorites', favoritesRoutes);

app.use('/message', messageRoutes);
app.use('/marksold', markSoldRoutes);
app.use('/delete', deleteRoutes);
app.use('/product', productRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// Middleware to check if the user is logged in and set user object in res.locals
app.use((req, res, next) => {
  const userId = req.cookies.user_id;
  if (userId) {
    // Fetch user data from the database based on user ID
    db.query(`SELECT * FROM users WHERE id = $1`, [userId])
      .then(data => {
        const user = data.rows[0];
        if (user) {
          // If the user exists, set it in res.locals
          res.locals.user = user;
          console.log(res.locals.user);
        }
        next();
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } else {
    // If no user ID in cookies, proceed to next middleware
    next();
  }
});

app.get('/', (req, res) => {
  const user = res.locals.user;
  console.log(user);
    db.query(`SELECT * FROM products`)
      .then(data => {
        res.render('index', { products: data.rows, user });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
