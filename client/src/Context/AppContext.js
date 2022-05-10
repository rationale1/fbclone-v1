import { createContext, useReducer } from "react";

const initState = {
  budget: 2000,
  expenses: [
    { id: 1, name: "Shopping", cost: 50 },
    { id: 2, name: "Holiday", cost: 300 },
  ],
};

const reducer = (state, { type, payload }) => {
  const { expenses } = state;
  switch (type) {
    case "ADD_EXPENSES":
      return {
        ...state,
        expenses: [...expenses, payload],
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: expenses.filter(e => e.id !== payload),
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
        budget: state.budget,
        expenses: state.expenses,
        dispatch,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
