import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../Store";
import { validateRegister } from "../../utils/validate";
import {
  displayValidationErrors,
  clearValidationErrors,
  displayResponseErrors,
  clearResponseErrors,
} from "../../utils/ErrorHandler";

const RegisterForm = (props) => {
  const [state, dispatch] = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
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

    var errors = validateRegister(formData);
    if (Object.keys(errors).length > 0) {
      // display errors
      setValidationErrors(errors);
      displayValidationErrors(errors);
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const response = await axios.post("/api/customers/", formData, config);
        const user = {
          ...response.data.user,
          token: response.headers["x-auth-token"],
        };
        await dispatch({ type: "LOAD_USER", payload: user });
      } catch (error) {
        displayResponseErrors(error);
        await dispatch({ type: "REGISTER_FAIL" });
      }
    }
  };

  function togglePassword() {
    console.log("togglePassword");
    var x = document.getElementById("inputPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

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
          <label htmlFor='inputName'>Name</label>
          <input
            type='text'
            className='form-control form-control-sm'
            id='inputName'
            name='name'
            value={formData.name}
            onChange={(e) => onChange(e)}
          ></input>
        </div>

        <div className='form-group'>
          <label htmlFor='inputPhone'>Phone</label>
          <div className='input-group '>
            <div className='input-group-prepend'>
              <span className='input-group-text' id='basic-addon1'>
                +92
              </span>
            </div>
            <input
              type='number'
              className='form-control form-control-sm'
              id='inputPhone'
              name='phone'
              value={formData.phone}
              aria-describedby='basic-addon1'
              onChange={(e) => onChange(e)}
            ></input>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='inputEmail'>Email</label>
          <input
            type='email'
            className='form-control form-control-sm'
            id='inputEmail'
            name='email'
            value={formData.email}
            onChange={(e) => onChange(e)}
          ></input>
        </div>

        <div className='form-group'>
          <label htmlFor='inputPassword'>Password</label>
          <input
            type='password'
            className='form-control form-control-sm'
            id='inputPassword'
            name='password'
            value={formData.password}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div class='form-group'>
          <input
            type='checkbox'
            onClick={() => togglePassword()}
            value='Show Password'
            id='togglePassword'
            style={{ marginRight: "10px" }}
          />
          <p style={{ display: "inline" }}>Show Password</p>
        </div>

        <div className='form-group'>
          {" "}
          <button type='submit' className='btn btn-one'>
            Register
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
