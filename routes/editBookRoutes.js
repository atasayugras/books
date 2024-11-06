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
  const { id, isbn, title, author, rating, genre, status, review } = req.body;

  try {
    await updateBook(id, isbn, title, author, rating, genre, status, review);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

export default router;
