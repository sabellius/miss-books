const { useState } = React;

export default function BookFilter({ onFilterChange }) {
  const [filterBy, setFilterBy] = useState({
    title: '',
    minPrice: '',
    maxPrice: '',
  });

  function handleChange(ev) {
    let { name, value } = ev.target;
    setFilterBy(prevFilter => {
      if (name === 'minPrice' || name === 'maxPrice') {
        value = value === '' ? '' : parseInt(value);
      }
      return { ...prevFilter, [name]: value };
    });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    onFilterChange(filterBy);
  }

  return (
    <div className="book-filter">
      <form className="book-filter-form" onSubmit={handleSubmit}>
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
        <div className="filter min-price-filter">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Filter by min price"
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
            placeholder="Filter by max price"
            value={filterBy.maxPrice}
            onChange={handleChange}
          />
        </div>
        <button>Apply Filters</button>
      </form>
    </div>
  );
}
