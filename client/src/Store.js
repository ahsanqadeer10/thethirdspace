import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const cartProducts = localStorage.getItem("cartProducts");

let initialState = {
  user: null,
  isLoggedIn: false,
  cart: {
    products: [],
  },
};

if (localStorage.cartProducts) {
  initialState = {
    ...initialState,
    cart: {
      products: JSON.parse(cartProducts),
    },
  };
}

if (localStorage.token) {
  let user = {
    id: localStorage.uId,
    type: localStorage.uType,
    token: localStorage.token,
  };
  initialState = {
    ...initialState,
    user,
    isLoggedIn: true,
  };
}

const Context = createContext(initialState);

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export { Context };
export default Store;
