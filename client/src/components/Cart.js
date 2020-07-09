import React, { useContext, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import CartItem from "./CartItem";

function Cart() {
  const [state, dispatch] = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    setCartItems(state.cart.products);
    setCartSize(state.cart.products.length);
  });

  const removeItemFromCart = async (productKey) => {
    console.log(productKey);
    await dispatch({
      type: "REMOVE_PRODUCT_FROM_CART",
      payload: { productKey: productKey },
    });
  };

  return (
    <Fragment>
      <Link data-toggle='modal' data-target='#cartModal'>
        <i className='fas fa-shopping-cart fa-lg'></i>{" "}
      </Link>

      <div
        class='modal fade'
        id='cartModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='cartModalTitle'
        aria-hidden='true'
      >
        <div
          class='modal-dialog modal-dialog-scrollable modal-dialog-centered'
          role='document'
        >
          <div
            class='modal-content d-flex flex-column'
            style={{ height: "60%" }}
          >
            <div className='d-flex flex-row'>
              <div>
                <h5 class='modal-title' id='cartModalTitle'>
                  MY CART
                </h5>
              </div>
              <div className='ml-auto'>
                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
            </div>

            <div>
              {cartItems.length > 0
                ? cartItems.map((item, index) => (
                    <CartItem
                      key={index}
                      item={item}
                      removeItemFromCart={removeItemFromCart}
                    />
                  ))
                : "No Items in Cart!"}
              <div className='d-flex flex-row'>
                <a href='/checkout'>Checkout</a>
              </div>
            </div>

            <div className='mt-auto'>
              <button type='button' data-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
