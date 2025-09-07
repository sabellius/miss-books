const { useState } = React;
import { addReview } from '../services/book.service.js';

export default function AddReview({ bookId, setReviews }) {
  const [review, setReview] = useState({
    reviewerName: '',
    rating: '',
    readDate: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const savedReview = await addReview(bookId, review);
      setReviews(prevReviews => [...prevReviews, savedReview]);
      setReview({
        reviewerName: '',
        rating: '',
        readDate: '',
      });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  }

  return (
    <div className="add-review">
      <h2>Add Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reviewer-name">Your Name:</label>
          <input
            type="text"
            id="reviewer-name"
            name="reviewerName"
            placeholder="Enter your name"
            value={review.reviewerName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={review.rating}
            onChange={handleChange}>
            <option value="" disabled>
              Select rating
            </option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="read-date">Read Date:</label>
          <input
            type="date"
            id="read-date"
            name="readDate"
            value={review.readDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
