import React, { Component, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../../Store";

const PrivateRoute = ({ component: Component }, ...rest) => {
  const [state, dispatch] = useContext(Context);
  return (
    <Route
      {...rest}
      render={props =>
        !state.isLoggedIn ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
