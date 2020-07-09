import React, { Fragment, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../../../Store";
import RegisterForm from "../../forms/RegisterForm";

const Register = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <Fragment>
      {state.isLoggedIn ? (
        <Redirect to='/my-profile' />
      ) : (
        <Fragment>
          <div className='d-flex flex-column'>
            <div>
              <h2 className='display-6'>Create a customer account</h2>
            </div>
            <div>
              <RegisterForm />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Register;
