import React, { createContext, useReducer } from "react";

// Initial state
const initState = {
  users: [
    { id: 1, name: "User One" },
    { id: 2, name: "User Two" },
    { id: 3, name: "User Three" },
    { id: 4, name: "User Four" },
  ],
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case "REMOVE_USER":
      const users = state.users.filter(user => user.id !== payload);

      return {
        ...state,
        users: users,
      };

    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, payload],
      };

    case "EDIT_USER":
      const editUser = state.users.map(user =>
        user.id === payload.id ? payload : user,
      );

      return {
        ...state,
        users: editUser,
      };

    default:
      return state;
  }
};

export const TodoContext = createContext();

// Provider Component
const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initState);

  const removeUser = id =>
    dispatch({
      type: "REMOVE_USER",
      payload: id,
    });

  const addUser = user =>
    dispatch({
      type: "ADD_USER",
      payload: user,
    });

  const editUser = user =>
    dispatch({
      type: "EDIT_USER",
      payload: user,
    });

  return (
    <TodoContext.Provider
      value={{ users: state.users, removeUser, addUser, editUser }}>
      {children}
    </TodoContext.Provider>
  );
};

export default GlobalContext;
