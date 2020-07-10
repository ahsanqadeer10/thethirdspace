import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { validateShop } from "../../utils/validate";
import {
  displayValidationErrors,
  clearValidationErrors,
  displayResponseErrors,
  clearResponseErrors,
} from "../../utils/ErrorHandler";
import { Context } from "../../Store";
import defaultLogo from "../../images/logo.png";
import axios from "axios";

const EditShopForm = (props) => {
  const [state, dispatch] = useContext(Context);
  const [previewImage, setPreviewImage] = useState(props.shop.image);
  const [validationErrors, setValidationErrors] = useState({});

  const resetFormFields = () => {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type.toLowerCase() === "text") {
        inputs[i].value = inputs[i].defaultValue;
      }
    }
  };

  const resetLogo = () => {
    setPreviewImage(props.shop.image);
    var imageInput = (document.getElementById("inputShopImage").value = "");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    clearValidationErrors(validationErrors);
    clearResponseErrors();
    setValidationErrors({});

    var errors = validateShop({
      shopName: formData.get("shopName"),
      shopDescription: formData.get("shopDescription"),
      shopAddress: formData.get("shopAddress"),
    });
    if (Object.keys(errors).length > 0) {
      // display errors;
      setValidationErrors(errors);
      displayValidationErrors(errors);
    } else {
      try {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            "x-auth-token": state.user.token,
            "x-auth-id": state.user.id,
            "x-auth-type": state.user.type,
          },
        };
        const response = await axios.put(
          `/api/shops/${props.shop._id}`,
          formData,
          config
        );
        window.location.href = "/my-profile";
      } catch (error) {
        displayResponseErrors(error);
      }
    }
  };

  const deleteLogo = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": state.user.token,
          "x-auth-id": state.user.id,
          "x-auth-type": state.user.type,
        },
      };
      const response = await axios.delete(
        `/api/shops/${props.shop._id}/delete-logo`,
        config
      );
      setPreviewImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const fileInputGroup = (
    <div className='form-group'>
      <div class='custom-file'>
        <input
          type='file'
          class='custom-file-input'
          id='inputShopImage'
          name='shopImage'
          onChange={(e) => {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
          }}
        ></input>
        <label class='custom-file-label' for='inputShopImage'>
          Browse
        </label>
      </div>
    </div>
  );

  return (
    <Fragment>
      <form
        noValidate
        encType='multipart/form-data'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='d-flex flex-row flex-wrap'>
          <div className='p-2' style={{ width: "300px" }}>
            <div className='form-group'>
              <label htmlFor='inputShopName'>Shop Name</label>
              <input
                type='text'
                className='form-control'
                id='inputShopName'
                name='shopName'
                defaultValue={props.shop.name}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='inputShopDesc'>Tell us about your Shop</label>
              <input
                type='text'
                className='form-control'
                id='inputShopDesc'
                name='shopDescription'
                defaultValue={props.shop.description}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='inputShopAddress'>Address</label>
              <input
                type='text'
                className='form-control'
                id='inputShopAddress'
                name='shopAddress'
                defaultValue={props.shop.address}
              ></input>
            </div>
            <div className='form-group'>
              <button
                type='button'
                className='btn btn-sm btn-warning'
                onClick={resetFormFields}
              >
                Reset Details
              </button>
            </div>
          </div>
          <div className='p-2' style={{ width: "300px" }}>
            {!previewImage ? (
              <Fragment>
                <img src={defaultLogo} className='img-fluid' />
                {fileInputGroup}
              </Fragment>
            ) : (
              <Fragment>
                <img src={previewImage} className='img-fluid' />
                {fileInputGroup}
                <button
                  type='button'
                  class='btn btn-warning btn-sm'
                  onClick={resetLogo}
                >
                  Reset Logo
                </button>
                <button
                  type='button'
                  class='btn btn-danger btn-sm'
                  onClick={deleteLogo}
                >
                  Delete Logo
                </button>
              </Fragment>
            )}
          </div>
        </div>
        <div className='form-group'>
          <Link to='/my-profile' className='btn btn-danger'>
            Go Back
          </Link>
          <button type='submit' className='btn btn-primary'>
            Save Changes
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EditShopForm;
