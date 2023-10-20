DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS reviews;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    password TEXT NOT NULL,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE profiles
(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT,
    created_by_user_id INTEGER REFERENCES users(id)
);

CREATE TABLE reviews
(
    id SERIAL PRIMARY KEY NOT NULL,
    profile_id INTEGER REFERENCES profiles(id),
    user_id INTEGER REFERENCES users(id),
    title TEXT,
    content TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    date_created TIMESTAMP
);

INSERT INTO users (id, password, enabled, first_name, last_name)
VALUES (11, 'secret', TRUE, 'sj', 'yu');