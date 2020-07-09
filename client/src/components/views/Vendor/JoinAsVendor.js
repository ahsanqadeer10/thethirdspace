import React, { Fragment, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../../../Store";
import VendorForm from "../../forms/VendorForm";

const JoinAsVendor = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <Fragment>
      {state.isLoggedIn && state.user.type == "vendor" ? (
        <Redirect to='/my-profile' />
      ) : (
        <Fragment>
          <div className='d-flex flex-column'>
            <div>
              <h2 className='display-6'>
                Register your business with <strong>The Third Space</strong>
              </h2>
            </div>
            <div>
              <VendorForm />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default JoinAsVendor;
