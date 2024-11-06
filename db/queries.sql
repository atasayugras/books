CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre VARCHAR(35),
  isbn VARCHAR(13) UNIQUE NOT NULL,
  cover_image TEXT NOT NULL,
  status VARCHAR(12),
  review TEXT,
  rating INT
);

