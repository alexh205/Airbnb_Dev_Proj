import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import * as sessionActions from "../../store/session";
import "./UserReviews.css";

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

      history.push(`/`);
      dispatch(reviewActions.renderReviews());
    } catch (res) {
      const data = res.json();

      const err = [data.message];
      if (data && data.message) setErrors(err);
    }
  };

  return (
    <div
      id="review-form-container"
      style={{
        "margin-left": "200px",
        "margin-right": "200px",
      }}
    >
      <div
        id="form-container"
        style={{
          marginLeft: "23vw",
          paddingBottom: "3px",
          color: "green",
        }}
      >
        <h2>Add a New Review</h2>
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
          <div>
            <label className="padding-label">
              Review :
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="Review"
              />
            </label>
          </div>
          <div>
            <label className="padding-label">
              Stars :
              <input
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                max="5"
                min="1"
                required
                placeholder="#"
              />
            </label>
          </div>

          <input
            type="submit"
            className="review-submit-button"
            style={{ marginTop: "6px", marginLeft: "30px" }}
          />
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
