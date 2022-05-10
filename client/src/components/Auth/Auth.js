import React, { useState } from "react";
import "./auth.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../Redux/actions/authActions";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const Auth = ({ signup }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const history = useHistory();

  const [userData, setUserData] = useState({
      username: "",
      email: "",
      password: "",
    }),
    onChange = e =>
      setUserData(prev => ({ ...prev, [e.target.name]: e.target.value })),
    { username, email, password } = userData;

  const [file, setFile] = useState(null);
  const handleUpload = e => setFile(e.target.files[0]);

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profPic", file);

    if (signup) {
      // Dispatch Register
      dispatch(register(formData));

      history.push("/login");
    } else {
      // Dispatch Login
      dispatch(login({ email, password }));
    }
    history.push("/");

    setUserData({ username: "", email: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : null}

      {signup && (
        <input
          type="text"
          placeholder="Username"
          className="auth__input"
          name="username"
          value={userData.username}
          onChange={onChange}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="auth__input"
        name="email"
        value={userData.email}
        onChange={onChange}
      />

      <input
        type="password"
        placeholder="Password"
        className="auth__input"
        name="password"
        value={userData.password}
        onChange={onChange}
      />

      {signup && (
        <input
          type="file"
          accept=".png,.jpeg,.jpg"
          placeholder="Profile Picture"
          name="file"
          onChange={handleUpload}
        />
      )}

      <button type="submit" className="auth__btn">
        {signup ? "Sign Up" : "Log In"}
      </button>

      {!signup && <span className="auth__forgot">Forgot Password?</span>}

      <button type="button" className="auth__btn2">
        <Link to={`${signup ? "/login" : "/register"}`}>
          {signup ? "Log Into Account" : "Create a New Account"}
        </Link>
      </button>
    </form>
  );
};

export default Auth;
