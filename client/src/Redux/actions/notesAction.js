import {
  NOTE_LIST_FAIL,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_CREATE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_SUCCESS,
} from "../constants/notesConstants";

import axios from "axios";

const url = `api/notes`;

export const listNotes = () => async (dispatch, getState) => {
  dispatch({ type: NOTE_LIST_REQUEST });
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(url, config);

    dispatch({ type: NOTE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: NOTE_LIST_FAIL, payload: message });
  }
};

export const createNote = note => async (dispatch, getState) => {
  dispatch({ type: NOTE_CREATE_REQUEST });
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(url, note, config);

    dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: NOTE_CREATE_FAIL, payload: message });
  }
};

export const removeNote = id => async (dispatch, getState) => {
  dispatch({ type: NOTE_DELETE_REQUEST });
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${url}/${id}`, config);

    dispatch({ type: NOTE_DELETE_SUCCESS, payload: id });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: NOTE_DELETE_FAIL, payload: message });
  }
};

export const updateNote = (id, updatedNote) => async (dispatch, getState) => {
  dispatch({ type: NOTE_UPDATE_REQUEST });
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${url}/${id}`, updatedNote, config);

    dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data, id });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: NOTE_UPDATE_FAIL, payload: message });
  }
};
