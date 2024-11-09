import pool from "../config/dbPool.js";

export const getAllBooks = async () => {
  try {
    const result = await pool.query("SELECT * FROM public.books ORDER BY title ASC");
    return result.rows;
  } catch (err) {
    console.error("Error fetching books:", err);
    throw new Error("Failed to retrieve books from the database.");
  }
};

// Function to add a new book
export const addBook = async (isbn, title, author, rating, genre, status, review, cover, date = new Date()) => { // Defaults to the current date if not provided
  // SQL query to insert a new book record into the 'books' table
  const query = `
    INSERT INTO books (isbn, title, author, rating, genre, status, review, cover_image, date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;
  try {
    // Execute the query with provided values
    const result = await pool.query(query, [isbn, title, author, rating, genre, status, review, cover, date]);
    return result.rows[0]; // Return the newly added book
  } catch (err) {
    console.error("Error adding book:", err);
    throw new Error("Failed to add book to the database.");
  }
};

// Function to get a book by its ID from the database
export const getBookById = async (id) => {
  try {
    // Execute query to fetch a book with the specified ID
    const result = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
    return result.rows[0]; // Return the first result (expected to be one book)
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    throw new Error("Failed to retrieve the book from the database.");
  }
};

// Function to update a book by its ID
export const updateBook = async (id, isbn, title, author, rating, genre, status, review, cover) => {
  // SQL query to update a book's details by ID
  const query = `
    UPDATE books
    SET isbn = $1, title = $2, author = $3, rating = $4, genre = $5, status = $6, review = $7, cover_image = $8
    WHERE id = $9
    RETURNING *;
  `;

  const values = [isbn, title, author, rating, genre, status, review, cover, id]; // Parameters for query

  try {
    // Execute the query to update the book with provided values
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the updated book
  } catch (err) {
    console.error("Error updating book:", err);
    throw new Error("Failed to update the book in the database.");
  }
};
