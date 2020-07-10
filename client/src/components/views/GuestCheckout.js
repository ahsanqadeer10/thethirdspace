import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Store";
import axios from "axios";
import CartItem from "../CartItem";
import Spinner from "../Spinner";

const GuestCheckout = () => {
  const [state, dispatch] = useContext(Context);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCartProducts = async () => {
      try {
        var productIds = [];
        state.cart.products.forEach((product) => {
          productIds = [...productIds, product.id];
        });
        const response = await axios.get("/api/products", {
          params: {
            filter: true,
            productIds: productIds,
          },
          cancelToken: source.token,
        });
        const fetchedCartProducts = response.data;
        var fetchedCartItems = [];
        state.cart.products.forEach((product) => {
          var object = fetchedCartProducts.filter((obj) => {
            return obj._id === product.id;
          });
          fetchedCartItems = [
            ...fetchedCartItems,
            {
              productKey: product.productKey,
              name: object[0].name,
              description: object[0].description,
              price: object[0].price,
              images: object[0].images,
              qty: product.qty,
            },
          ];
        });
        setCartItems(fetchedCartItems);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          // request cancelled
        } else {
          throw error;
        }
      }
    };

    fetchCartProducts();

    return () => {
      source.cancel();
    };
  }, ["/api/products/"]);

  const removeItemFromCart = async (productKey) => {
    await dispatch({
      type: "REMOVE_PRODUCT_FROM_CART",
      payload: { productKey: productKey },
    });
    window.location.reload();
  };

  return (
    <div>
      <div>Checkout</div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {cartItems.length > 0
            ? cartItems.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    item={item}
                    removeItemFromCart={removeItemFromCart}
                  />
                );
              })
            : "No Items in Cart!"}
        </div>
      )}
    </div>
  );
};

export default GuestCheckout;
