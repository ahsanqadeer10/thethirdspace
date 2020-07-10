import React, { useContext, Fragment } from "react";
import { Context } from "../../Store";
import PrivateRoute from "../routes/PrivateRoute";
import VendorOnlyRoute from "../routes/VendorOnlyRoute";
import CustomerAccount from "../views/Customer/CustomerAccount";
import VendorAccount from "../views/Vendor/VendorAccount";

function MyAccount() {
  const state = useContext(Context);

  return (
    <Fragment>
      {state[0].user.type === "vendor" ? (
        <VendorOnlyRoute component={VendorAccount} />
      ) : (
        <PrivateRoute component={CustomerAccount} />
      )}
    </Fragment>
  );
}

export default MyAccount;
