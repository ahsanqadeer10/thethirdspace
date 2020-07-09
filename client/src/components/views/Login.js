import React, { Fragment, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../../Store";
import LoginForm from "../forms/LoginForm";

const Login = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <Fragment>
      {state.isLoggedIn ? (
        <Redirect to='/my-profile' />
      ) : (
        <Fragment>
          <div className='d-flex flex-column'>
            <div>
              <h2 className='display-6'>Sign-in to your account</h2>
            </div>
            <div>
              <LoginForm />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
