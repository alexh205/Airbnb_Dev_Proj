import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

const ReviewForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let reviewData = {
      review,
      stars,
    };

    try {
      dispatch(reviewActions.addNewReview(reviewData));

      dispatch(reviewActions.getAllReviews(spotId));
      history.push(`/spots/${spotId}`);
    } catch (res) {
      const data = res.json();

      const err = [data.message];
      if (data && data.message) setErrors(err);
    }
  };

  return (
    <div id="review-form-container">
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Create Review</h2>
          {errors && (
            <ul>
              {errors.map((error, i) => (
                <li className="errors" key={i}>
                  {error}
                </li>
              ))}
            </ul>
          )}
          <label>
            Review
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
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
              required
            />
          </label>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
