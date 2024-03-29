DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER CHECK (price >= 0) NOT NULL DEFAULT 0,
  photo_url_1 VARCHAR(255) NOT NULL,
  photo_url_2 VARCHAR(255) NOT NULL,
  photo_url_3 VARCHAR(255) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_sold BOOLEAN DEFAULT false
);
