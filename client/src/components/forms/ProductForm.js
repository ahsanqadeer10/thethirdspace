import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Store";
import axios from "axios";
import { validateProduct } from "../../utils/validate";
import {
  displayValidationErrors,
  clearValidationErrors,
  displayResponseErrors,
  clearResponseErrors,
} from "../../utils/ErrorHandler";

const ProductForm = (props) => {
  const [state, dispatch] = useContext(Context);
  const [validationErrors, setValidationErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    clearValidationErrors(validationErrors);
    clearResponseErrors();
    setValidationErrors({});

    const formData = new FormData(e.target);

    var errors = validateProduct({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
    });
    if (Object.keys(errors).length > 0) {
      // display errors
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
        const response = await axios.post(
          `/api/shops/${props.shop._id}/products/`,
          formData,
          config
        );
        console.log(response.data.product);
        window.location.href = "/my-profile";
      } catch (error) {
        displayResponseErrors(error);
      }
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={(e) => onSubmit(e)}
        noValidate
        encType='multipart/form-data'
      >
        <div className='form-group'>
          <label htmlFor='inputName'>Product Name</label>
          <input
            type='text'
            className='form-control'
            id='inputName'
            name='name'
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='inputDescription'>Description</label>
          <input
            type='text'
            className='form-control'
            id='inputDescription'
            name='description'
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='inputPrice'>Price</label>
          <input
            type='number'
            className='form-control'
            id='inputPrice'
            name='price'
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='inputStock'>Stock</label>
          <input
            type='number'
            className='form-control'
            id='inputStock'
            name='stock'
          ></input>
        </div>
        <div className='form-group'>
          {" "}
          <div className='custom-file'>
            <input
              type='file'
              multiple='multiple'
              id='inputImages'
              className='form-control custom-file-input'
              name='images'
            />
            <label htmlFor='inputImages' class='custom-file-label'>
              Upload Images
            </label>
          </div>
        </div>
        <div className='form-group'>
          <Link to='/my-profile' className='btn btn-danger'>
            Go Back
          </Link>
          <button type='submit' className='btn btn-primary'>
            Add to Shop
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default ProductForm;
