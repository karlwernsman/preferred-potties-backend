-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS loos CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL,
  username VARCHAR
);

CREATE TABLE loos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description VARCHAR(150) NOT NULL,
  -- location,
  rating BIGINT NOT NULL
);

CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cleanliness BIGINT NOT NULL,
  safety BIGINT NOT NULL,
  accessibility BIGINT NOT NULL,
  gendered boolean NOT NULL,
  locks boolean NOT NULL,
  sanitizer boolean NOT NULL,
  amenities VARCHAR(100),
  comments VARCHAR(250),
  loo_id BIGINT,
  FOREIGN KEY (loo_id) REFERENCES loos(id)
);


INSERT INTO
  loos (description, rating)
VALUES
('Nice', 5),
('Ugly', 1),
('Really stinky', 2);

INSERT INTO
reviews(cleanliness, safety, accessibility, gendered, locks,
sanitizer, amenities, comments, loo_id)
VALUES
(5, 5, 3, true, true, false, 'Test review', 'Test review', 1),
(5, 5, 3, true, true, false, 'Test review', 'Test review', 2);