import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./UserSpots.css";

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

    if (address.length > 30 || address.length < 5)
      errorArr.push(
        "address must be greater than 4 and less than 30 characters long"
      );
    if (city.length > 20 || city.length < 4)
      errorArr.push(
        "city must be greater than 3 and less than 20 characters long"
      );
    if (state.length > 20 || state.length < 2)
      errorArr.push(
        "State must be greater than 1 and less than 20 characters long"
      );
    if (country.length > 25 || country.length < 3)
      errorArr.push(
        "Country must be greater than 2 and less than 25 characters long"
      );
    if (isNaN(lat)) errorArr.push("Lat must be a number");
    if (isNaN(lng)) errorArr.push("Lng must be a number");
    if (name.length > 40 || name.length < 4)
      errorArr.push(
        "Name must be greater than 3 and less than 40 characters long"
      );
    if (description.length > 200 || description.length < 4)
      errorArr.push(
        "Description must be greater than 3 and less than 200 characters long"
      );
    if (isNaN(price)) errorArr.push("Price must be a number");
    if (previewImage.length > 250 || previewImage.length < 4)
      errorArr.push(
        "previewImage Url must be greater than 5 and less than 250 characters long"
      );
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
    <div
      style={{
        "margin-left": "200px",
        "margin-right": "200px",
      }}
    >
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid black",
          paddingBottom: "5px",
          marginLeft: "100px",
          marginRight: "100px",
          color: "green",
        }}
      >
        Create a New Listing
      </h2>
      {hasSubmitted && errors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form className="spots-app" onSubmit={handleSubmit}>
        <div className="form-padding">
          <label className="padding-label">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Address"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="City"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="State"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="Country"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            Latitude:
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              placeholder="Latitude"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            Longitude:
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              placeholder="Longitude"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            Description:
            <input
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Description"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
            Price: $
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="$ Price"
            />
          </label>
        </div>
        <div>
          <label className="padding-label">
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
        <input
          type="submit"
          style={{
            backgroundColor: "rgb(208, 46, 31)",
            color: "white",
            fontWeight: "bold",
            padding: "4px",
            width: "80px",
            marginTop: "8px",
          }}
        />
      </form>
    </div>
  );
};
export default SpotForm;
