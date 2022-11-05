import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

const EditReviews = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(reviewActions.getUserReviews());
  }, [dispatch]);

  const reviewEdit = useSelector((state) => state.reviews[reviewId]);

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");

  useEffect(() => {
    if (reviewEdit) {
      setReview(reviewEdit.review);
      setStars(reviewEdit.stars);
    }
  }, [reviewEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let reviewData = {
      id: reviewId,
      review,
      stars,
    };
    dispatch(reviewActions.reviewEdit(reviewData));

    history.push(`/reviews/user`);
  };
  const onClick = (e) => {
    e.preventDefault();

    dispatch(reviewActions.reviewDelete(reviewId));
    dispatch(reviewActions.renderReviews());
    history.push(`/`);
  };

  return (
    <div id="edit-spot-container">
      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <h2>Edit Review</h2>
        <label>
          Review
          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <label>
          Stars
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            max="5"
            min="1"
          />
        </label>

        <input type="submit" />
        <button id="delete-btn" onClick={onClick}>
          delete
        </button>
      </form>
    </div>
  );
};

export default EditReviews;
