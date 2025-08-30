import { utilService } from '../services/util.service.js';
const { Link } = ReactRouterDOM;

export default function BookPreview({ book }) {
  return (
    <div className="book-preview">
      <Link to={`/books/${book.id}`}>
        <img
          className="book-img"
          src={book.thumbnail}
          alt={book.title}
          width={'200px'}
        />
        <div className="book-info">
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
        </div>
      </Link>
    </div>
  );
}
