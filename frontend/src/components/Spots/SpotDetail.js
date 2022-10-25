import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import * as spotActions from "../../store/spots";

const SpotDetail = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(spotActions.getSpotById(spotId));
  }, [dispatch]);

  const spot = useSelector((state) => state.spots[spotId]);

  return (
    <div>
      <div>
        <h2 id="spot-name">{spot?.name}</h2>
      </div>
      <div>
        <img src={spot?.previewImage} alt={spot?.name} />
      </div>
      <div>{spot.avgRating}</div>
      <div>{spot.address}</div>
      <div>
        {spot.city}, {spot.state}
      </div>
      <div id="description">{spot.description}</div>
      <div>${spot.price}/night</div>

      <Link to="/">
        <button>Back to Properties</button>
      </Link>
    </div>
  );
};

export default SpotDetail;
