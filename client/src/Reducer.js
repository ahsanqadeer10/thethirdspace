const Reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      localStorage.setItem("uId", action.payload.id);
      localStorage.setItem("uType", action.payload.type);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isLoggedIn", true);
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "REGISTER_FAIL":
    case "LOGOUT":
      localStorage.removeItem("uId");
      localStorage.removeItem("uType");
      localStorage.removeItem("token");
      localStorage.setItem("isLoggedIn", false);
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case "ADD_PRODUCT_TO_CART":
      var cartProducts = state.cart.products;
      const currentSize = cartProducts.length;
      cartProducts = [
        ...cartProducts,
        { ...action.payload, productKey: currentSize },
      ];
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

      return {
        ...state,
        cart: {
          ...state.cart,
          products: cartProducts,
        },
      };
    case "REMOVE_PRODUCT_FROM_CART":
      var cartProducts = state.cart.products.filter(function (cartProduct) {
        return cartProduct.productKey !== action.payload.productKey;
      });
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      return {
        ...state,
        cart: {
          ...state.cart,
          products: cartProducts,
        },
      };
    default:
      return state;
  }
};

export default Reducer;
