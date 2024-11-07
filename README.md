# Book Library App

---

## Description

The **Book Library App** is a web application that allows users to track and manage their book collection. Built with Node.js, Express, and EJS, this app uses a PostgreSQL database hosted on Supabase to store book data and the Open Library API to fetch book covers.

---

## Features

- **Add and Edit books** in your library.
- **View details** of each book, including author, rating, genre and review.
- **Filter books by rating** and **search by title**.
- **Responsive design** for both desktop and mobile users.

---

## API

This project utilizes the **[Open Library Cover API](https://openlibrary.org/dev/docs/api/covers)** to fetch book cover images.

**Example Cover URL**:  
To retrieve a cover for a specific book by ISBN:
https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg

- Replace `{ISBN}` with the book's ISBN number.

---

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- PostgreSQL database (e.g., Supabase).

### Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:
```
npm install
```

3. **Set up your database on Supabase**:

- Create a table named books with the necessary columns: id, isbn, title, author, rating, genre, status, review, cover_image, and date.
- Configure database permissions for public CRUD access if no authentication is used.

- Create a .env file with your Supabase credentials:

```
PORT=3000
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

4. **Start the server**:
```
node index.js
```

---

## Directory Structure
```
.
├── public/            # Static assets (CSS, JS, images)
├── views/             # EJS templates
├── config/            # Database configuration
├── routes/            # Route handlers
├── db/                # Database queries
├── .env               # Environment variables
├── package.json       # Project dependencies
└── index.js           # Main server file
```

---

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or new features!

---

## License
This project is licensed under the MIT License.

---

## Instructions for Use
Replace <repository-url> and <repository-folder> with the actual URL and name of your project repository.