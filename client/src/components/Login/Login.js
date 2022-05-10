import React from "react";
import Auth from "../../components/Auth/Auth";
import "./login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="loginLeft">
          <h3>
            Social<span>Media</span>
          </h3>

          <p>
            Connect with Friends and the world <br />
            around you on facebook
          </p>
        </div>

        <div className="loginRight">
          <div className="loginBox">
            <Auth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
