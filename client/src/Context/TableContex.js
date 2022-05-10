import React, { createContext, useReducer } from "react";

const initState = {
  tableData: [
    {
      id: 1,
      title: "Car",
      price: 10,
      company: "Toyota",
      info: "One of the best car",
      inCart: false,
      count: 1,
    },
    {
      id: 2,
      title: "Bike",
      price: 20,
      company: "Honda",
      info: "Good Bike",
      inCart: false,
      count: 1,
    },
  ],

  selectedData: null,
  editable: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_DATA":
      const addNew = [...state.tableData, payload];

      return {
        ...state,
        tableData: addNew,
      };

    case "DELETE_DATA":
      const filteredData = state.tableData.filter(data => data.id !== payload);
      return {
        ...state,
        tableData: filteredData,
      };

    case "EDIT_DATA":
      return {
        ...state,
        selectedData: payload,
        editable: true,
      };

    case "UPDATE_DATA":
      const updateData = state.tableData.map(data =>
        data.id === payload.id ? payload : data,
      );

      return {
        ...state,
        tableData: updateData,
        editable: false,
      };

    default:
      return state;
  }
};

export const ProductContex = createContext();

const TableContex = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const addData = data => dispatch({ type: "ADD_DATA", payload: data });

  const delData = id => dispatch({ type: "DELETE_DATA", payload: id });

  const editData = data => dispatch({ type: "EDIT_DATA", payload: data });

  const updataData = data => dispatch({ type: "UPDATE_DATA", payload: data });

  return (
    <ProductContex.Provider
      value={{ state, addData, delData, editData, updataData }}>
      {children}
    </ProductContex.Provider>
  );
};

export default TableContex;
