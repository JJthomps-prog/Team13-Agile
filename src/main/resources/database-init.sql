DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    password TEXT NOT NULL,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    first_name TEXT,
    last_name TEXT
);

INSERT INTO users (id, password, enabled, first_name, last_name)
VALUES (11, 'secret', TRUE, 'sj', 'yu');