import express from 'express';
import { getBookById, updateBook } from '../db/queries.js';

const router = express.Router();

router.get('/edit', async (req, res, next) => {
  const bookId = req.query.bookId;

  try {
    const book = await getBookById(bookId);
    if (book) {
      res.render('pages/edit', { book });
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    next(err);
  }
});

router.post('/edit_book', async (req, res, next) => {
    // Construct the book object from form input values in the request body
    const book = {
      id: req.body.id,                              // Book uuid (Do not parse it as an INT)
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
      // Generate the cover image URL using the Open Library API with the "UPDATED" ISBN
      book.cover = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
      
      await updateBook(book.id, book.isbn, book.title, book.author, book.rating, book.genre, book.status, book.review, book.cover, book.date);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

export default router;
