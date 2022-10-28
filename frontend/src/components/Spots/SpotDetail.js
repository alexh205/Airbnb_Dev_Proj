import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import "./SpotDetail.css";

const SpotDetail = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const spot = useSelector((state) => state.spots[spotId]);

  
  if (spot)
    return (
      <div>
        {spot && (
          <div>
            <h2 id="spot-name">{spot.name}</h2>
          </div>
        )}
        <div>
          {spot.spotImages.map((image) => (
            <div className="img-container" key={image?.id}>
              <img className="spot-img" src={image?.url} alt={spot.name} />
            </div>
          ))}
        </div>
        <div>★{spot?.avgRating}</div>
        <div>{spot?.address}</div>
        <div>
          {spot.city}, {spot.state}
        </div>
        <div id="description">{spot.description}</div>
        <div>${spot.price} per night</div>

        <Link to="/">
          <button>Back to Properties</button>
        </Link>
      </div>
    );
};

export default SpotDetail;
