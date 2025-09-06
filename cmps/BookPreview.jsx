const { Link } = ReactRouterDOM;

export default function BookPreview({ book, onRemoveBook }) {
  return (
    <div className="book-preview">
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
      <div className="book-actions flex">
        <Link to={`/books/${book.id}`}>
          <button>Details</button>
        </Link>
        <Link to={`/books/${book.id}/edit`}>
          <button>Edit</button>
        </Link>
        <span className="delete-action" onClick={() => onRemoveBook(book.id)}>
          <button>Delete</button>
        </span>
      </div>
    </div>
  );
}
