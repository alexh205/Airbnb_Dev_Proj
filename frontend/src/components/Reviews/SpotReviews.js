import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";
import "./UserReviews.css";

const SpotReviews = ({ reviewsArr, currentUser, spotId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(reviewActions.renderReviews());
    dispatch(sessionActions.restoreUser());
    // dispatch(reviewActions.getAllReviews(spotId));
  }, [dispatch]);

  // let foundReviews;

  if (reviewsArr.length < 1) return <p>No Reviews Found for This Listing.</p>;

  if (reviewsArr)
    return (
      <div>
        <div>
          <div>
            <div className="my-reviews-container">
              <div id="userReviews">
                {reviewsArr &&
                  reviewsArr.map((review) => (
                    <div
                      className="review-items"
                      key={review.id}
                      // style={{
                      //   display: "grid",
                      //   overflow: "auto",
                      //   padding: "6px",
                      //   border: "1px dotted black",
                      // }}
                    >
                      {review.User && (
                        <>
                          <div>
                            <p>
                              {review.User && review.User.firstName}{" "}
                              {review.User && review.User.lastName}
                            </p>
                          </div>

                          <div>
                            <i
                              style={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: "blue",
                              }}
                            >
                              Review:{" "}
                            </i>
                            <p style={{ overflow: "auto" }}>
                              "{review.review}"
                            </p>
                          </div>
                          <div>
                            <p style={{ margin: "2px" }}>
                              ⭐ {review.stars} Stars
                            </p>
                          </div>
                          {/* <div id="updated-at">
                            Updated on: {review.updatedAt.slice(0, 10)}
                          </div> */}
                          {currentUser && currentUser.id === review.userId && (
                            <>
                              <div id="edit-container">
                                <Link to={`/review-edit/${review?.id}`}>
                                  <button
                                    style={{
                                      backgroundColor: "rgb(15, 174, 31)",
                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Edit
                                  </button>
                                </Link>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SpotReviews;
