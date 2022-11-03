import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import { Link, useParams } from "react-router-dom";
import EditReviews from "./EditReviews";

const SpotReviews = ({ locationId }) => {
  const dispatch = useDispatch();
  // const { spotId } = useParams();

  useEffect(() => {
    dispatch(reviewActions.getAllReviews(locationId));
  }, [dispatch, locationId]);
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);

  let foundReviews;
  if (reviews && locationId) {
    foundReviews = (
      <div>
        <div id="my-reviews-container">
          <div id="userReviews" key="userreviews">
            {reviews &&
              reviews.map((review) => (
                <div id="review" key={review.id}>
                  <div>
                    <p>
                      ⭐ {review.stars} Stars · {reviews.length} reviews
                    </p>
                  </div>
                  <div>
                    <p>
                      {review.User.firstName} {review.User.lastName}
                    </p>
                  </div>
                  <div>
                    <p>{review.review}</p>
                  </div>
                  <div id="updated-at">
                    Updated on: {review.updatedAt.slice(0, 10)}
                  </div>

                  <div id="edit-delete-container">
                    <Link to={`/review-edit/${review.id}`}>
                      <button>Edit</button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    foundReviews = (
      <>
        <p>No Reviews Found for This Listing</p>
      </>
    );
  }
  if (reviews)
    return (
      <div>
        <div>{foundReviews}</div>
      </div>
    );
};

export default SpotReviews;
