const { useState, useEffect } = React;
import { query } from '../services/book.service.js';
import BookList from '../cmps/BookList.jsx';

export default function BookIndex() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    query().then(books => setBooks(books));
  }

  if (!books) return <div>Loading...</div>;
  return <BookList books={books} />;
}
