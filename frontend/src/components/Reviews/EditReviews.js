import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import "./UserReviews.css";

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
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errorArr = [];

    if (review.length < 3 || review.length > 400)
      errorArr.push("Review must be between 3 and 400 characters");

    if (!stars) errorArr.push("Review must have a rating");
    setErrors(errorArr);
  }, [stars, review]);

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

    setHasSubmitted(true);
    if (errors.length) return alert("Cannot Submit");

    setReview("");
    setStars("");
    setErrors([]);
    setHasSubmitted(false);

    dispatch(reviewActions.reviewEdit(reviewData));

    history.push(`/spots/${reviewEdit.spotId}`);
  };
  const onClick = (e) => {
    e.preventDefault();

    dispatch(reviewActions.reviewDelete(reviewId));
    dispatch(reviewActions.renderReviews());
    history.push(`/`);
  };

  return (
    <div
      id="edit-spot-container"
      style={{
        "margin-left": "200px",
        "margin-right": "200px",
      }}
    >
      <div
        style={{
          marginLeft: "23vw",
          paddingBottom: "3px",
          color: "green",
        }}
      >
        <h2>Edit Review</h2>
      </div>{" "}
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
      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <div>
          <label className="padding-label">
            Review:
            <textarea
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            Stars:
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              max="5"
              min="1"
              required
            />
          </label>
        </div>
        <div style={{marginLeft:"20px"}}>
          <input
            type="submit"
            style={{ marginTop: "6px", marginLeft: "30px", marginRight: "3px" }}
            className="review-submit-button"
          />
          <button
            id="delete-btn"
            onClick={onClick}
            className="review-submit-button"
          >
            delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReviews;
