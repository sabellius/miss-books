import { utilService } from '../services/util.service.js';

export default function BookList({ books }) {
  return (
    <section className="book-list flex justify-center">
      {books.map(book => (
        <div key={book.id} className="book-preview">
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
      ))}
    </section>
  );
}
