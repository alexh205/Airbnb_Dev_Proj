import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import { Redirect } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <b>
          <i
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid black",
              
            }}
          >
            <div id="login-header" style={{ paddingBottom: "12px" }}>
              Login
            </div>
          </i>
        </b>
        <div>
          <label className="login-label-fields">
            Username or Email:
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="login-label-fields">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
