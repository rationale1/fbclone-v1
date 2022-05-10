import { toast } from "react-toastify";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

import axios from "axios";
const url = `${process.env.REACT_APP_SERVER_URL}api/auth`;
// const url = `api/auth/`;

// Register Action
export const register = user => async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post(`${url}/register`, user, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));

    toast.success("Registered Successfully");
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response?.data.message,
    });

    toast.error(err.response?.data.message);
  }
};

// Login User
export const login = user => async dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post(`${url}/login`, user, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));

    toast.success("Signed In Successfully");
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response?.data.message,
    });

    toast.error(err.response?.data.message);
  }
};

export const logOut = () => dispatch => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });

  toast.success("Logged Out Successfully");
};
