import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as spotActions from "../../store/spots";

const EditSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const history = useHistory();

  let spotData = useSelector((state) => state.spots[spotId]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (spotData) {
      setAddress(spotData.address);
      setCity(spotData.city);
      setState(spotData.state);
      setCountry(spotData.country);
      setLat(spotData.lat);
      setLng(spotData.lng);
      setName(spotData.name);
      setDescription(spotData.description);
      setPrice(spotData.price);
      setPreviewImage(spotData.previewImage);
    }
  }, [spotData]);

  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
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

    try {
      await dispatch(spotActions.modifySpot(spotData));

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
        <form className="spots-app" onSubmit={onSubmit}>
          <div>
            <h2>Update {name}</h2>
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
                <textarea
                  type="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Price ($):
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
                {previewImage && previewImage.length > 0 && (
                  <img src={previewImage} />
                )}
              </div>
            </div>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
};

export default EditSpotForm;
