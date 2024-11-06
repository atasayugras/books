import express from 'express';
import { addBook } from '../db/queries.js';

const router = express.Router();

router.get('/add_book', (req, res) => {
  res.render('pages/add');
});

router.post('/add_book', async (req, res, next) => {
  const book = {
    isbn: parseInt(req.body.isbn),
    title: req.body.title,
    author: req.body.author,
    rating: req.body.rating,
    genre: req.body.genre,
    status: req.body.status,
    review: req.body.review,
    date: new Date().toISOString().split('T')[0] // Format to 'YYYY-MM-DD'
  };

  try {
    book.cover = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
    await addBook(
      book.isbn,
      book.title,
      book.author,
      book.rating,
      book.genre,
      book.status,
      book.review,
      book.cover,
      book.date
    );
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

export default router;
