import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import homeRoutes from './routes/homeRoute.js';
import addBookRoutes from './routes/addBookRoutes.js';
import editBookRoutes from './routes/editBookRoutes.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  res.status(err.status || 500).send(err.message || 'Something went wrong. Please try again later.');
});

// Use the modular routes
app.use('/', homeRoutes);
app.use('/', addBookRoutes);
app.use('/', editBookRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
