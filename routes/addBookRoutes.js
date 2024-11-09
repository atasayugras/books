import express from 'express';
import { addBook } from '../db/queries.js';

const router = express.Router();

router.get('/add_book', (req, res) => {
  res.render('pages/add');
});

router.post('/add_book', async (req, res, next) => {
  // Construct the book object from form input values in the request body
  const book = {
    isbn: parseInt(req.body.isbn),                // Convert ISBN to an integer
    title: req.body.title,                        // Book title
    author: req.body.author,                      // Author's name
    rating: req.body.rating,                      // User rating for the book
    genre: req.body.genre,                        // Book genre
    status: req.body.status,                      // Reading status (e.g., read, want to read)
    review: req.body.review,                      // User's review of the book
    date: new Date().toISOString().split('T')[0]  // Store date in 'YYYY-MM-DD' format for database consistency, 
  };

  try {
    // Generate the cover image URL using the Open Library API with the ISBN
    book.cover = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
    
    // Call addBook to save the book data to the database
    await addBook(book.isbn, book.title, book.author, book.rating, book.genre, book.status, book.review, book.cover, book.date);

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

export default router;
