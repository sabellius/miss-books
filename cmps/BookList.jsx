import { utilService } from '../services/util.service.js';

export default function BookList({ books }) {
  return (
    <section className="book-list container flex justify-center wrap">
      {books.map(book => (
        <div key={book.id} className="book-preview">
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
          <img
            src={utilService.fixThumbnailUrl(book.thumbnail)}
            alt={book.title}
            width={'200px'}
          />
        </div>
      ))}
    </section>
  );
}
