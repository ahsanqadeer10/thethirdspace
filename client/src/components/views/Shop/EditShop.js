import React, { Fragment } from "react";
import EditShopForm from "../../forms/EditShopForm";

const EditShop = props => {
  return (
    <Fragment>
      <div className='d-flex flex-column align-items-center'>
        <div style={{ marginBottom: "20px" }}>
          <h3 className='display-6'>
            Edit <strong>{props.location.state.shop.name}</strong>
          </h3>
        </div>
        <div>
          <EditShopForm shop={props.location.state.shop} />
        </div>
      </div>
    </Fragment>
  );
};

export default EditShop;
