import axios from "axios";
import { toast } from "react-toastify";

// Set token in the Headers
const config = getState => {
  const {
    auth: { userInfo },
  } = getState();

  return {
    headers: {
      "Content-Type": "Application/json" || "multipart/form-data",
      authorization: `Bearer ${userInfo.token}`,
    },
  };
};

// Send Error Message.
const errorMessage = error => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;

  return message;
};

export const fetchPosts = () => async (dispatch, getState) => {
  dispatch({ type: "FETCH_REQUEST" });
  try {
    const url = "/api/posts/timeline/all";

    const { data } = await axios.get(url, config(getState));

    const newData = data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });

    dispatch({ type: "FETCH_REQUEST_SUCCESS", payload: newData });
  } catch (error) {
    dispatch({ type: "FETCH_REQUEST_FAIL", payload: errorMessage(error) });
  }
};

export const createPost = post => async (dispatch, getState) => {
  dispatch({ type: "FETCH_REQUEST" });
  try {
    const url = `/api/posts`;

    const { data } = await axios.post(url, post, config(getState));

    dispatch({ type: "CREATE_POST", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_REQUEST_FAIL", payload: errorMessage(error) });
  }
};

export const removePost = id => async (dispatch, getState) => {
  dispatch({ type: "DELETE_REQUEST" });
  try {
    const url = `/api/posts`;

    const { data } = await axios.delete(`${url}/${id}`, config(getState));

    dispatch({ type: "DELETE_POST", payload: data });

    toast.success("Post Deleted Successfully");
  } catch (error) {
    dispatch({ type: "DELETE_REQUEST_FAIL", payload: errorMessage(error) });
  }
};

export const fetchSinglePost = id => async dispatch => {
  dispatch({ type: "FETCH_REQUEST" });
  try {
    const url = `/api/posts/profile/${id}`;

    const { data } = await axios.get(url);

    dispatch({ type: "FETCH_SINGLE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_REQUEST_FAIL", payload: errorMessage(error) });
  }
};
