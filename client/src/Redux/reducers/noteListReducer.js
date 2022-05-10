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
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAIL,
} from "../constants/notesConstants";

const initState = {
  notes: [],
  loading: null,
  error: null,
};

const noteListReducer = (state = initState, { type, payload, id }) => {
  switch (type) {
    case NOTE_LIST_REQUEST:
    case NOTE_CREATE_REQUEST:
    case NOTE_DELETE_REQUEST:
    case NOTE_UPDATE_REQUEST:
      return { ...state, loading: true };

    case NOTE_LIST_SUCCESS:
      return { ...state, loading: false, notes: payload };

    case NOTE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: [payload, ...state.notes],
      };

    case NOTE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: state.notes.filter(note => note._id !== payload),
      };

    case NOTE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: state.notes.map(note => (note._id === id ? payload : note)),
      };

    case NOTE_LIST_FAIL:
    case NOTE_CREATE_FAIL:
    case NOTE_DELETE_FAIL:
    case NOTE_UPDATE_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default noteListReducer;
