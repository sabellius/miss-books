const { useState } = React;
const { useNavigate } = ReactRouterDOM;
import { getEmptyBook, save } from '../services/book.service.js';
import '../assets/style/cmps/BookForm.css';

export default function BookForm() {
  const [formState, setFormState] = useState(getEmptyBook());
  const navigate = useNavigate();

  function handleChange(ev) {
    const { name, value, type, checked, dataset } = ev.target;
    if (name === 'amount' || name === 'currencyCode' || name === 'isOnSale') {
      setFormState(prev => ({
        ...prev,
        listPrice: {
          ...prev.listPrice,
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
    } else if (name === 'authors') {
      const idx = Number(dataset.idx);
      setFormState(prev => {
        const authors = [...prev.authors];
        authors[idx] = value;
        return { ...prev, authors };
      });
    } else if (name === 'categories') {
      const idx = Number(dataset.idx);
      setFormState(prev => {
        const categories = [...prev.categories];
        categories[idx] = value;
        return { ...prev, categories };
      });
    } else {
      setFormState(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  }

  function handleAddField(field) {
    setFormState(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  }

  function handleRemoveField(field, idx) {
    setFormState(prev => {
      const arr = [...prev[field]];
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const book = await save(formState);
      navigate(`/books/${book.id}`);
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={formState.id} />

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formState.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="subtitle">Subtitle</label>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          value={formState.subtitle}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Authors</label>
        {formState.authors.map((author, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              name="authors"
              data-idx={idx}
              value={author}
              onChange={handleChange}
              required
            />
            {formState.authors.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveField('authors', idx)}
                style={{ minWidth: 0 }}>
                -
              </button>
            )}
            {idx === formState.authors.length - 1 && (
              <button
                type="button"
                onClick={() => handleAddField('authors')}
                style={{ minWidth: 0 }}>
                +
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="publishedDate">Published Year</label>
        <input
          id="publishedDate"
          name="publishedDate"
          type="number"
          min="1900"
          max="2100"
          value={formState.publishedDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="pageCount">Page Count</label>
        <input
          id="pageCount"
          name="pageCount"
          type="number"
          min="1"
          value={formState.pageCount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Categories</label>
        {formState.categories.map((cat, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <select
              name="categories"
              data-idx={idx}
              value={cat}
              onChange={handleChange}
              required>
              <option value="">Select category</option>
              <option value="Love">Love</option>
              <option value="Fiction">Fiction</option>
              <option value="Poetry">Poetry</option>
              <option value="Computers">Computers</option>
              <option value="Religion">Religion</option>
            </select>
            {formState.categories.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveField('categories', idx)}
                style={{ minWidth: 0 }}>
                -
              </button>
            )}
            {idx === formState.categories.length - 1 && (
              <button
                type="button"
                onClick={() => handleAddField('categories')}
                style={{ minWidth: 0 }}>
                +
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="thumbnail">Thumbnail URL</label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="url"
          value={formState.thumbnail}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="language">Language</label>
        <select
          id="language"
          name="language"
          value={formState.language}
          onChange={handleChange}
          required>
          <option value="">Select language</option>
          <option value="en">English</option>
          <option value="he">Hebrew</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Price</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          value={formState.listPrice.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="currencyCode">Currency</label>
        <select
          id="currencyCode"
          name="currencyCode"
          value={formState.listPrice.currencyCode}
          onChange={handleChange}
          required>
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ILS">ILS</option>
        </select>
      </div>

      <div
        className="form-group"
        style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
        <input
          id="isOnSale"
          name="isOnSale"
          type="checkbox"
          checked={formState.listPrice.isOnSale}
          onChange={handleChange}
        />
        <label htmlFor="isOnSale">On Sale</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
