import React, { Fragment } from "react";
import ProductForm from "../../forms/ProductForm";

const AddProduct = props => {
  return (
    <Fragment>
      <div className='d-flex flex-column align-items-center'>
        <div style={{ marginBottom: "20px" }}>
          <h3 className='display-6'>
            Add Product to <strong>{props.location.state.shop.name}</strong>
          </h3>
        </div>
        <div>
          <ProductForm shop={props.location.state.shop} />
        </div>
      </div>
    </Fragment>
  );
};

export default AddProduct;
