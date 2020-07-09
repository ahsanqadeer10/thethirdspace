import React, { useState, useContext, Fragment } from "react";
import { Context } from "../../Store";
import axios from "axios";
import { validateVendor, validateShop } from "../../utils/validate";
import {
  displayValidationErrors,
  clearValidationErrors,
  displayResponseErrors,
  clearResponseErrors,
} from "../../utils/ErrorHandler";

function VendorForm() {
  const [state, dispatch] = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    shopName: "",
    shopDescription: "",
    shopAddress: "",
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

    var vendorDataErrors = validateVendor({
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
    });
    var shopDataErrors = validateShop({
      shopName: formData.shopName,
      shopDescription: formData.shopDescription,
      shopAddress: formData.shopAddress,
    });
    var errors = { ...vendorDataErrors, ...shopDataErrors };

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
        const response = await axios.post("/api/vendors/", formData, config);
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

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)} noValidate className='form-md'>
        <div className='d-flex flex-row flex-wrap'>
          <div className='section'>
            <h4>1</h4>
            <div className='form-group'>
              <label htmlFor='inputName'>Your Name</label>
              <input
                type='text'
                className='form-control'
                id='inputName'
                name='name'
                value={formData.name}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='inputPhone'>Phone Number</label>
              <div className='input-group mb-3'>
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
                  aria-describedby='basic-addon1'
                  value={formData.phone}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='inputPassword'>Password</label>
              <input
                type='password'
                className='form-control'
                id='inputPassword'
                name='password'
                value={formData.password}
                onChange={(e) => onChange(e)}
              ></input>
              <p className='text-muted' style={{ fontSize: "0.8em" }}>
                Password should be atleast 8 characters long.
              </p>
            </div>
          </div>

          <div className='section'>
            <h4>2</h4>
            <div className='form-group'>
              <label htmlFor='inputShopName'>Shop Name</label>
              <input
                type='text'
                className='form-control'
                id='inputShopName'
                name='shopName'
                value={formData.shopName}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='inputShopDesc'>Shop Description</label>
              <input
                type='text'
                className='form-control'
                id='inputShopDesc'
                name='shopDescription'
                value={formData.shopDescription}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='inputShopAddress'>Address</label>
              <input
                type='text'
                className='form-control'
                id='inputShopAddress'
                name='shopAddress'
                value={formData.shopAddress}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-one'>
            Join
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default VendorForm;
