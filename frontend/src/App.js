import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsPage from "./components/Spots";
import EditSpotForm from "./components/Spots/EditSpotForm";
import SpotForm from "./components/Spots/SpotForm";
import SpotDetail from "./components/Spots/SpotDetail";
import UserSpots from "./components/Spots/UserSpots";
import ReviewForm from "./components/Reviews/ReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotsPage} />
          <Route exact path="/spots" component={SpotForm} />
          <Route exact path="/userSpots" component={UserSpots} />
          <Route path="/spots/:spotId" component={SpotDetail} />
          <Route path="/spot-edit/:spotId" component={EditSpotForm} />
          <Route exact path="/spots/:spotId/reviews" component={ReviewForm} />
        </Switch>
      )}
    </>
  );
}

export default App;
