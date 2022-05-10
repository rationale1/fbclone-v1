import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initState = {
  userInfo,
  loading: null,
  error: null,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { userInfo: payload, loading: false, error: null };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return { error: payload, loading: false };

    case USER_LOGOUT:
      return {
        userInfo: null,
      };

    default:
      return state;
  }
};

export default authReducer;
