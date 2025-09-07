export default function ReviewList({ reviews, onDelete }) {
  if (!reviews || reviews.length === 0) {
    return <div>No reviews yet.</div>;
  }

  return (
    <div className="review-list">
      {reviews.map(review => (
        <div key={review.id} className="review">
          <h3>{review.reviewerName}</h3>
          <p>Rating: {review.rating}</p>
          <p>Read Date: {review.readDate}</p>
          <button onClick={() => onDelete(review.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
