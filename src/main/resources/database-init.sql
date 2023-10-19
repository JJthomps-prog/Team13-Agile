CREATE TABLE users
(
    id SERIAL PRIMARY KEY  NOT NULL,
    password TEXT NOT NULL,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    first_name TEXT,
    last_name TEXT
);