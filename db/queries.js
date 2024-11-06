import pool from "../config/dbPool.js";

// Function to get all books
export const getAllBooks = async () => {
  try {
    const result = await pool.query("SELECT * FROM public.books ORDER BY id ASC ");
    return result.rows;
  } catch (err) {
    console.error("Error fetching books:", err);
    throw new Error("Failed to retrieve books from the database.");
  }
};

// Function to add a new book
export const addBook = async (
  isbn,
  title,
  author,
  rating,
  genre,
  status,
  review,
  cover,
  date = new Date() // Defaults to current date if not provided
) => {
  const query = `
    INSERT INTO books (isbn, title, author, rating, genre, status, review, cover_image, date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [
      isbn,
      title,
      author,
      rating,
      genre,
      status,
      review,
      cover,
      date
    ]);
    return result.rows[0];
  } catch (err) {
    console.error("Error adding book:", err);
    throw new Error("Failed to add book to the database.");
  }
};

// Function to get a book by its ID from db
export const getBookById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
    return result.rows[0]; // Return the first result
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    throw new Error("Failed to retrieve the book from the database.");
  }
};

// Function to update a book by its ID
export const updateBook = async (id, isbn, title, author, rating, genre, status, review) => {
  const query = `
    UPDATE books
    SET isbn = $1, title = $2, author = $3, rating = $4, genre = $5, status = $6, review = $7
    WHERE id = $8
    RETURNING *;
  `;
  const values = [isbn, title, author, rating, genre, status, review, id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error updating book:", err);
    throw new Error("Failed to update the book in the database.");
  }
};
