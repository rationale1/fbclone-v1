import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postsReducer from "./postsReducer";

const rooterReducers = combineReducers({
  auth: authReducer,
  postList: postsReducer,
});

export default rooterReducers;
