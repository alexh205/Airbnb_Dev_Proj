import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";

const SpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errorArr = [];

    address && errorArr.push(),
      city && errorArr.push(),
      state && errorArr.push(),
      country && errorArr.push(),
      lat && errorArr.push(),
      lng && errorArr.push(),
      name && errorArr.push(),
      description && errorArr.push(),
      price && errorArr.push(),
      previewImage && errorArr.push(),
      setErrors(errorArr);
  }, [
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
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (errors.length) return alert("Cannot Submit");

    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setLat("");
    setLng("");
    setName("");
    setDescription("");
    setPrice("");
    setPreviewImage("");
    setErrors([]);
    setHasSubmitted(false);

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

    try {
      await dispatch(spotActions.addNewSpot(spot));
      history.push(`/`);
    } catch (res) {
      setErrors([]);
      const data = await res.json();
      if (data && data.message) setErrors(data.errors);
    }
  };

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
              required
              placeholder="Name"
            />
            <p> {errors.name}</p>
          </label>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Address"
            />
          </label>
          <label>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="City"
            />
          </label>
          <label>
            State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="State"
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="Country"
            />
          </label>
          <label>
            Latitude:
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              placeholder="Latitude"
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              placeholder="Longitude"
            />
          </label>
          <label>
            Description:
            <input
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Description"
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="$ Price"
            />
          </label>
          <label>
            Preview Image:
            <input
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
              placeholder="url"
            />
          </label>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
export default SpotForm;
