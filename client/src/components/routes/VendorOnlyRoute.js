import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../../Store";

const VendorOnlyRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useContext(Context);
  return (
    <Route
      {...rest}
      render={props =>
        !state.isLoggedIn ? (
          <Redirect to='/login' />
        ) : state.user.type === "vendor" ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default VendorOnlyRoute;
