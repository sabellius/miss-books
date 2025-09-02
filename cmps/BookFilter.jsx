const { useState } = React;

export default function BookFilter({ onFilterChange }) {
  const [filterBy, setFilterBy] = useState({
    title: '',
    subtitle: '',
    author: '',
    category: '',
    publishedYear: '',
    minPageCount: '',
    maxPageCount: '',
    minPrice: '',
    maxPrice: '',
    currency: '',
    isOnSale: false,
  });

  function handleChange(ev) {
    let { name, value, type, checked } = ev.target;
    if (type === 'checkbox') value = checked;
    if (
      [
        'minPrice',
        'maxPrice',
        'minPageCount',
        'maxPageCount',
        'publishedYear',
      ].includes(name)
    ) {
      value = value === '' ? '' : parseInt(value);
    }
    setFilterBy(prevFilter => ({ ...prevFilter, [name]: value }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    onFilterChange(filterBy);
  }

  return (
    <form className="book-filter container" onSubmit={handleSubmit}>
      <div className="filter title-filter">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Filter by title"
          value={filterBy.title}
          onChange={handleChange}
        />
      </div>
      <div className="filter subtitle-filter">
        <label htmlFor="subtitle">Subtitle</label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          placeholder="Filter by subtitle"
          value={filterBy.subtitle}
          onChange={handleChange}
        />
      </div>
      <div className="filter author-filter">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Filter by author"
          value={filterBy.author}
          onChange={handleChange}
        />
      </div>
      <div className="filter category-filter">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Filter by category"
          value={filterBy.category}
          onChange={handleChange}
        />
      </div>
      <div className="filter published-year-filter">
        <label htmlFor="publishedYear">Published Year</label>
        <input
          type="number"
          id="publishedYear"
          name="publishedYear"
          placeholder="Year"
          value={filterBy.publishedYear}
          onChange={handleChange}
        />
      </div>
      <div className="filter min-page-filter">
        <label htmlFor="minPageCount">Min Pages</label>
        <input
          type="number"
          id="minPageCount"
          name="minPageCount"
          placeholder="Min pages"
          value={filterBy.minPageCount}
          onChange={handleChange}
        />
      </div>
      <div className="filter max-page-filter">
        <label htmlFor="maxPageCount">Max Pages</label>
        <input
          type="number"
          id="maxPageCount"
          name="maxPageCount"
          placeholder="Max pages"
          value={filterBy.maxPageCount}
          onChange={handleChange}
        />
      </div>
      <div className="filter min-price-filter">
        <label htmlFor="minPrice">Min Price</label>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          placeholder="Min price"
          value={filterBy.minPrice}
          onChange={handleChange}
        />
      </div>
      <div className="filter max-price-filter">
        <label htmlFor="maxPrice">Max Price</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="Max price"
          value={filterBy.maxPrice}
          onChange={handleChange}
        />
      </div>
      <div className="filter on-sale-filter">
        <label htmlFor="isOnSale">On Sale</label>
        <input
          type="checkbox"
          id="isOnSale"
          name="isOnSale"
          checked={filterBy.isOnSale}
          onChange={handleChange}
        />
      </div>
      <button>Apply Filters</button>
    </form>
  );
}
