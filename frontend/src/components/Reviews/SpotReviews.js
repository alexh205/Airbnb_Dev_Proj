import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";

const SpotReviews = ({ locationId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const allreviews = async () =>
    //   await dispatch(reviewActions.getAllReviews(locationId));
    // const currnUser = async () => await dispatch(sessionActions.restoreUser());

    dispatch(sessionActions.restoreUser());
    dispatch(reviewActions.getAllReviews(locationId));

    // allreviews();
    // currnUser();
  }, [dispatch, locationId]);

  // Selecting the State variables
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);

  const userObj = useSelector((state) => state.session.user);

  let foundReviews;

  if (reviews.length < 1)
    return <p>No Reviews Found for This Listing. Login to Add a Review</p>;

  if (reviews.length > 0) {
    foundReviews = (
      <div>
        <div id="my-reviews-container">
          <div id="userReviews" key="userreviews">
            {reviews &&
              reviews.map((review) => (
                <div id="review" key={review?.id}>
                  <div>
                    <p>
                      ⭐ {review.stars} Stars 
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
                  {userObj && userObj.id === review.userId && (
                    <>
                      <div id="edit-container">
                        <Link to={`/review-edit/${review?.id}`}>
                          <button>Edit</button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
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
