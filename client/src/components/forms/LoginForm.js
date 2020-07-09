import React, { Fragment, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../Store";
import { validateLogin } from "../../utils/validate";
import {
  displayValidationErrors,
  clearValidationErrors,
  displayResponseErrors,
  clearResponseErrors,
} from "../../utils/ErrorHandler";

const LoginForm = (props) => {
  const [state, dispatch] = useContext(Context);
  const [enabledInput, setEnabledInput] = useState("phone");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    clearValidationErrors(validationErrors);
    clearResponseErrors();
    setValidationErrors({});

    const { email, phone, password } = formData;
    var body = null;
    if (enabledInput === "phone") {
      body = { phone: phone, password: password };
    } else {
      body = { email: email, password: password };
    }
    var errors = validateLogin(body);

    if (Object.keys(errors).length > 0) {
      // display errors
      setValidationErrors(errors);
      displayValidationErrors(errors);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post("/api/auth", body, config);
        const user = {
          ...response.data.user,
          token: response.headers["x-auth-token"],
        };
        await dispatch({ type: "LOAD_USER", payload: user });
      } catch (error) {
        displayResponseErrors(error);
        await dispatch({ type: "LOGIN_FAIL" });
      }
    }
  };

  const toggleEnabledInput = (e) => {
    var errors = validationErrors;
    delete errors[enabledInput];
    setValidationErrors(errors);

    if (enabledInput == "phone") {
      setEnabledInput("email");
    } else {
      setEnabledInput("phone");
    }
  };

  const phoneGroup = (
    <div className='form-group'>
      <label htmlFor='inputPhone'>Phone</label>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text' id='basic-addon1'>
            +92
          </span>
        </div>
        <input
          type='number'
          className='form-control'
          id='inputPhone'
          name='phone'
          value={formData.phone}
          aria-describedby='basic-addon1'
          onChange={(e) => onChange(e)}
        ></input>
      </div>
    </div>
  );
  const emailGroup = (
    <div className='form-group'>
      <label htmlFor='inputEmail'>Email</label>
      <input
        type='email'
        className='form-control'
        id='inputEmail'
        name='email'
        value={formData.email}
        onChange={(e) => onChange(e)}
      ></input>
    </div>
  );

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        noValidate
        className='form-md'
      >
        <div className='form-group'>
          <button
            type='button'
            className='btn form-input-switch'
            onClick={(e) => toggleEnabledInput(e)}
          >
            Click here to sign in with{" "}
            {enabledInput === "phone" ? "Email" : "Phone"}
          </button>
        </div>

        {enabledInput === "phone" ? phoneGroup : emailGroup}

        <div className='form-group' style={{ width: "300px" }}>
          <label htmlFor='inputPassword'>Password</label>
          <input
            type='password'
            className='form-control mb-2'
            id='inputPassword'
            name='password'
            value={formData.password}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className='form-group'>
          {" "}
          <button type='submit' className='btn btn-one'>
            Login
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default LoginForm;
