const { useState, useEffect } = React;
import { query, getDefaultFilter } from '../services/book.service.js';
import BookList from '../cmps/BookList.jsx';
import BookFilter from '../cmps/BookFilter.jsx';

export default function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(getDefaultFilter());

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    query(filterBy).then(books => setBooks(books));
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }));
  }

  if (!books) return <div>Loading...</div>;
  return (
    <div>
      <BookFilter onFilterChange={onSetFilterBy} filterBy={filterBy} />
      <BookList books={books} />
    </div>
  );
}
