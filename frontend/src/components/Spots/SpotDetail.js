import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSpots } from "../../store/spots";
import { deleteSpotById } from "../../store/spots";
import { restoreUser } from "../../store/session";

import "./SpotDetail.css";

const SpotDetail = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  let spot = useSelector((state) => state.spots[spotId]);
  let currentUser = useSelector((state) => state.session.user);

  let options;
  if (spot) {
    options = (
      <>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              try {
                dispatch(deleteSpotById(spotId));
                history.push("/");
              } catch (res) {
                setErrors([]);
                const data = res.json();
                if (data && data.message) setErrors(data.errors);
              }
            }}
          >
            Delete Listing
          </button>
        </div>
        <div>
          <Link to={`/spot-edit/${spot.id}`}>
            <button>Edit Listing</button>
          </Link>
        </div>
      </>
    );
  }
  
  if (spot)
    return (
      <div>
        <div>
          <h2 id="spot-name">{spot?.name}</h2>
        </div>
        <div>
          {spot.spotImages.map((image) => (
            <div className="img-container" key={image?.id}>
              <img className="spot-img" src={image?.url} alt={spot?.name} />
            </div>
          ))}
        </div>
        <div>★{spot?.avgRating}</div>
        <div>{spot?.address}</div>
        <div>
          {spot?.city}, {spot?.state}
        </div>
        <div id="description">{spot?.description}</div>
        <div>${spot?.price} per night</div>

        {spot.ownerId === currentUser.user.id && <div>{options}</div>}
      </div>
    );
};

export default SpotDetail;
