import React from "react";

const CartItem = (props) => {
  return (
    <div className='d-flex flex-row'>
      <div>{props.item.name}</div>
      <div>{props.item.qty}</div>
      <div className='ml-auto'>
        <button
          onClick={(e) => props.removeItemFromCart(props.item.productKey)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
