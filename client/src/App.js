import React from "react";
import "./StyleSheet/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header.js/Header";
import Home from "./pages/Home/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector(state => state.auth);

  return (
    <Router>
      <Header userInfo={userInfo} />
      <ToastContainer />

      <Switch>
        <Route exact path="/">
          {userInfo ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/profile/:id">
          {!userInfo ? <Redirect to="/login" /> : <Profile />}
        </Route>

        <Route path="/login">
          {userInfo ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/register">
          {userInfo ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
