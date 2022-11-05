import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import * as sessionActions from "../../store/session";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(reviewActions.renderReviews());
  }, [dispatch]);

  useEffect(() => {
    const errorArr = [];

    if (review.length < 3 || review.length > 400)
      errorArr.push("Review must be between 3 and 400 characters");

    if (!stars) errorArr.push("Review must have a rating");
    setErrors(errorArr);
  }, [stars, review]);

  const userObj = useSelector((state) => state.session.user);

  let reviewData;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (errors.length) return alert("Cannot Submit");

    setReview("");
    setStars("");
    setErrors([]);
    setHasSubmitted(false);

    reviewData = {
      spotId: spotId,
      review,
      stars,
    };

    try {
      dispatch(reviewActions.addNewReview(reviewData));
      dispatch(reviewActions.renderReviews());

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
        <h2>Add a Review</h2>
        {hasSubmitted && errors.length > 0 && (
          <div>
            The following errors were found:
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Review
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              // required
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
              // required
            />
          </label>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
