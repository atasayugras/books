import express from 'express';
import { getAllBooks } from '../db/queries.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const books = await getAllBooks();
    res.render('pages/index', { books });
  } catch (err) {
    next(err);
  }
});

export default router;
