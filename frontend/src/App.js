import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import * as reviewActions from "./store/reviews";
import Navigation from "./components/Navigation";
import SpotsPage from "./components/Spots";
import EditSpotForm from "./components/Spots/EditSpotForm";
import SpotForm from "./components/Spots/SpotForm";
import SpotDetail from "./components/Spots/SpotDetail";
import UserSpots from "./components/Spots/UserSpots";
import ReviewForm from "./components/Reviews/ReviewForm";
import UserReviews from "./components/Reviews/UserReviews";
import EditReviews from "./components/Reviews/EditReviews";
import SpotReviews from "./components/Reviews/SpotReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotActions.getAllSpots());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotsPage}/>
          <Route exact path="/spots" component={SpotForm} />
          <Route exact path="/spotReviews/:spotId" component={SpotReviews} />
          <Route exact path="/reviews/user" component={UserReviews} />
          <Route exact path="/userSpots" component={UserSpots} />
          <Route exact path="/spots/:spotId/reviews" component={ReviewForm} />
          <Route path="/spots/:spotId" component={SpotDetail} />
          <Route path="/review-edit/:reviewId" component={EditReviews} />
          <Route path="/spot-edit/:spotId" component={EditSpotForm} />
        </Switch>
      )}
    </>
  );
}

export default App;
