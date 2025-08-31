const { useState, useEffect } = React;
const { useParams } = ReactRouterDOM;
const { Link } = ReactRouterDOM;

import LongTxt from '../cmps/LongTxt.jsx';
import { get } from '../services/book.service.js';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();

  useEffect(() => {
    loadBook();
  }, [bookId]);

  async function loadBook() {
    try {
      const book = await get(bookId);
      setBook(book);
    } catch (err) {
      console.log('🚀 ~ BookDetails ~ err:', err);
    }
  }

  function readingType(pageCount) {
    if (pageCount > 500) return 'Long reading';
    if (pageCount > 200) return 'Decent reading';
    if (pageCount < 100) return 'Light reading';
    return '';
  }

  function bookAge(publishedDate) {
    const currentYear = new Date().getFullYear();
    const bookYear = new Date(publishedDate).getFullYear();
    const age = currentYear - bookYear;
    if (age > 10) return 'Vintage';
    if (age < 1) return 'New';
    return '';
  }

  function priceClass(amount) {
    if (amount > 150) return 'red';
    if (amount < 20) return 'green';
    return '';
  }

  if (!book) return <div>Loading...</div>;

  const readingTypeText = readingType(book.pageCount);
  const readingAgeText = bookAge(book.publishedDate);
  const priceClassName = priceClass(book.listPrice.amount);

  return (
    <div className="book-details">
      <div className="book-img">
        <img width={400} src={book.thumbnail} alt={book.title} />
        {book.listPrice.isOnSale && (
          <img
            className="on-sale-ribbon"
            width={150}
            src="assets/img/on-sale-corner-ribbon.png"
            alt="on sale banner"
          />
        )}
      </div>
      <div className="book-info">
        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p>Authors: {book.authors.join(', ')}</p>
        <p>Published Date: {book.publishedDate}</p>
        <p>Categories: {book.categories.join(', ')}</p>
        {readingTypeText && <p>Reading Type: {readingTypeText}</p>}
        {readingAgeText && <p>Book Age: {readingAgeText}</p>}
        <p className={`book-price ${priceClassName}`}>
          Price: {book.listPrice.amount} {book.listPrice.currencyCode}
        </p>
        <LongTxt txt={book.description} length={120} />
      </div>
      <div className="book-navigation">
        <button>
          <Link to={`/books/${book.prevBookId}`} className="prev-book">
            Previous Book
          </Link>
        </button>
        <button>
          <Link to={`/books/${book.nextBookId}`} className="next-book">
            Next Book
          </Link>
        </button>
      </div>
    </div>
  );
}
