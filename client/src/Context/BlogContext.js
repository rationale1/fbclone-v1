import { createContext, useReducer } from "react";

const initState = {
  blogs: localStorage.getItem("blogs")
    ? JSON.parse(localStorage.getItem("blogs"))
    : [],
};

const reducer = (state, { type, payload }) => {
  let blogs;
  switch (type) {
    case "ADD_BLOG":
      blogs = [...state.blogs, payload];

      localStorage.setItem("blogs", JSON.stringify(blogs));
      return {
        ...state,
        blogs,
      };

    case "DELETE_BLOG":
      blogs = state.blogs.filter(blog => blog.id !== payload);

      localStorage.setItem("blogs", JSON.stringify(blogs));

      return { ...state, blogs };

    case "EDIT_BLOG":
      blogs = state.blogs.map(blog =>
        blog.id === payload.id ? payload : blog,
      );

      localStorage.setItem("blogs", JSON.stringify(blogs));
      return {
        ...state,
        blogs,
      };

    default:
      return state;
  }
};

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider
      value={{
        blogs: state.blogs,
        dispatch,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
