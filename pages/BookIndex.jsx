const { useState, useEffect } = React;
import { query, getDefaultFilter, remove } from '../services/book.service.js';
import BookList from '../cmps/BookList.jsx';
import BookFilter from '../cmps/BookFilter.jsx';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';

export default function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(getDefaultFilter());

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  async function loadBooks() {
    try {
      const books = await query(filterBy);
      setBooks(books);
    } catch (err) {
      console.error('Failed to load books:', err);
    }
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }));
  }

  async function onRemoveBook(bookId) {
    try {
      await remove(bookId);
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooks(updatedBooks);
      showSuccessMsg('Book removed successfully');
    } catch (err) {
      console.error('Failed to remove book:', err);
      showErrorMsg('Failed to remove book');
    }
  }

  if (!books) return <div>Loading...</div>;
  return (
    <div>
      <BookFilter onFilterChange={onSetFilterBy} filterBy={filterBy} />
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </div>
  );
}
