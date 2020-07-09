import React, { useContext, Fragment } from "react";
import { Context } from "../../Store";
import PrivateRoute from "../routes/PrivateRoute";
import GuestCheckout from "./GuestCheckout";
import RegisteredCheckout from "./RegisteredCheckout";

const Checkout = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <Fragment>
      {state.isLoggedIn ? (
        <PrivateRoute component={RegisteredCheckout} />
      ) : (
        <GuestCheckout />
      )}
    </Fragment>
  );
};

export default Checkout;
