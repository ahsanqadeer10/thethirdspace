import React, { useState, useContext, Fragment } from "react";
import { validateShop } from "../../utils/validate";
import { clearErrors, showErrors } from "../../utils/formErrors";
import { Context } from "../../Store";
import axios from "axios";

const EditShopForm = props => {
  const [state, dispatch] = useContext(Context);
  const [formData, setFormData] = useState({
    shopName: props.shop.name,
    shopDescription: props.shop.description,
    shopAddress: props.shop.address
  });
  const [formErrors, setFormErrors] = useState({});

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelEdits = e => {
    props.disableEditing(e);
  };

  const saveEdits = async e => {
    e.preventDefault();
    clearErrors(formErrors);
    setFormErrors({});

    var body = {};
    if (formData.shopName !== props.shop.name) {
      body = { ...body, name: formData.shopName };
    }
    if (formData.shopDescription !== props.shop.description) {
      body = { ...body, description: formData.shopDescription };
    }
    if (formData.shopAddress !== props.shop.address) {
      body = { ...body, address: formData.shopAddress };
    }

    if (Object.keys(body).length === 0) {
      console.log("nothing changed");
    } else {
      var errors = validateShop(formData);
      if (Object.keys(errors).length > 0) {
        // display errors;
        setFormErrors(errors);
        showErrors(errors);
      } else {
        const config = {
          headers: {
            "content-type": "application/json",
            "x-auth-token": state.user.token,
            "x-auth-id": state.user.id
          }
        };
        const response = await axios.put(
          "/api/shops/my-shop/update",
          body,
          config
        );
        window.location.href = "/my-shop";
      }
    }
  };

  return (
    <Fragment>
      <div id='alert-row' className='d-flex flex-row'></div>
      <form noValidate onSubmit={e => saveEdits(e)}>
        <div className='form-group'>
          <label htmlFor='inputShopName'>Shop Name</label>
          <input
            type='text'
            className='form-control'
            id='inputShopName'
            name='shopName'
            onChange={e => onChange(e)}
            value={formData.shopName}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='inputShopDesc'>Tell us about your Shop</label>
          <input
            type='text'
            className='form-control'
            id='inputShopDesc'
            name='shopDescription'
            onChange={e => onChange(e)}
            value={formData.shopDescription}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='inputShopAddress'>Address</label>
          <input
            type='text'
            className='form-control'
            id='inputShopAddress'
            name='shopAddress'
            onChange={e => onChange(e)}
            value={formData.shopAddress}
          ></input>
        </div>
        <div className='form-group'>
          <button
            type='button'
            className='btn btn-warning'
            onClick={e => cancelEdits(e)}
          >
            Exit without saving
          </button>
          <button type='submit' className='btn btn-primary'>
            Save changes
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EditShopForm;
