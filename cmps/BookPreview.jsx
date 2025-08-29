import { utilService } from '../services/util.service.js';

export default function BookPreview({ book }) {
  return (
    <div className="book-preview">
      <img
        className="book-img"
        src={utilService.fixThumbnailUrl(book.thumbnail)}
        alt={book.title}
        width={'200px'}
      />
      <div className="book-info">
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
      </div>
    </div>
  );
}
