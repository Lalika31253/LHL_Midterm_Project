-- Users table seeds
INSERT INTO users (username, email, password) VALUES ('Alice', 'alicejackson@mail.com', 'password');
INSERT INTO users (username, email, password) VALUES ('Kira', 'kirasantos@gmail.com', 'password');
INSERT INTO users (username, email, password) VALUES ('Alex', 'alexalexon@gmail.com', 'password');


-- Admin and User credentials
INSERT INTO users (username, email, password, is_admin) VALUES ('admin', 'admin@gmail.com', 'password', true);
INSERT INTO users (username, email, password) VALUES ('user_1', 'user_1@gmail.com', '1234');
