import React from "react";

const CartItem = (props) => {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <div>
        <div>{props.item.name}</div>
        <div style={{ marginLeft: "5px" }}>{props.item.qty}</div>
      </div>

      <span className='badge badge-pill'>
        <button
          onClick={(e) => props.removeItemFromCart(props.item.productKey)}
        >
          Remove
        </button>
      </span>
    </li>
  );
};

export default CartItem;
