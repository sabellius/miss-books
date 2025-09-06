import BookPreview from './BookPreview.jsx';

export default function BookList({ books, onRemoveBook }) {
  return (
    <section className="book-list flex justify-center">
      {books.map(book => (
        <BookPreview key={book.id} book={book} onRemoveBook={onRemoveBook} />
      ))}
    </section>
  );
}
