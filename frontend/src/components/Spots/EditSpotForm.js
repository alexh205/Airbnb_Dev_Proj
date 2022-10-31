import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { modifySpot } from "../../store/spots";
import React, { useState, useEffect } from "react";

const EditSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(spotActions.getAllSpots());
  // }, [dispatch]);

  let spotData = useSelector((state) => state.spots[spotId]);

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
  const [previewImage, setPreviewImage] = useState(spotData.previewImage);

  const [errors, setErrors] = useState([]);

  const onSubmit = (e) => {
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
      previewImage,
    };

    spotData = { ...spotData, ...spot };
    console.log(spotData);

    try {
      dispatch(modifySpot(spotData));

      history.push(`/spots/${spotData.id}`);
    } catch (res) {
      setErrors([]);
      const data = res.json();
      if (data && data.message) setErrors(data.errors);
    }
  };

  if (spotData)
    return (
      <div>
        <form className="spots-app" onSubmit={onSubmit}>
          <div>
            <h2>Create a New Spot</h2>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Address:
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                City:
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                State:
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Country:
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Latitude:
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Longitude:
                <input
                  type="text"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Description:
                <input
                  type="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Price:
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Preview Image:
                <input
                  type="text"
                  value={previewImage}
                  onChange={(e) => setPreviewImage(e.target.value)}
                />
              </label>
              <div id="img-preview">
                {previewImage.length > 0 && <img src={previewImage} />}
              </div>
            </div>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
};

export default EditSpotForm;
