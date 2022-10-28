import React, { useEffect, useState } from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./UserSpots.css";

const UserSpots = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const allSpots = useSelector((state) => state.spots);

  useEffect(() => {
    (async () => {
      await dispatch(spotActions.getAllSpots());
    })();
  }, [dispatch]);

  const currentUserSpots = Object.values(allSpots).filter((spot) => {
    return spot.ownerId === currentUser.id;
  });

  console.log(currentUser)
};

export default UserSpots;
