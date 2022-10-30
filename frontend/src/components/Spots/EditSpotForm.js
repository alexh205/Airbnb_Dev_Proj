import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import React, { useState} from "react";

const EditSpotForm = () => {
  const { spotId } = useParams();
  let spotData = useSelector((state) => state.spots[spotId]);


  const dispatch = useDispatch();
  const history = useHistory();



  const [address, setAddress] = useState(spotData.address);
  const [city, setCity] = useState(spotData.city);
  const [state, setState] = useState(spotData.state);
  const [country, setCountry] = useState(spotData.country);
  const [lat, setLat] = useState(spotData.lat);
  const [lng, setLng] = useState(spotData.lng);
  const [name, setName] = useState(spotData.name);
  const [description, setDescription] = useState(spotData.description);
  const [price, setPrice] = useState(spotData.price);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let spot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    spotData = { ...spotData, ...spot };
   
      try {
        dispatch(spotActions.modifySpot(spotData));

        history.push(`/spots/${spotData.id}`);
      } catch (res) {
        setErrors([]);
        const data = await res.json();
        if (data && data.message) setErrors(data.errors);
      }

  };

  if (spotData)
    return (
      <div>
        <form className="spots-app" onSubmit={handleSubmit}>
          <div>
            <h2>Create a New Spot</h2>
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              City
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label>
              State
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            <label>
              Latitude
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
            <label>
              Longitude
              <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
            <label>
              Description
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Price
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
};

export default EditSpotForm;
