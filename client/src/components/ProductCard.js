import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import ProductImageCarousel from "../components/ProductImageCarousel";
import arrayBufferToBase64 from "../utils/bufferToBase64";
import { Context } from "../Store";

const ProductCard = (props) => {
  const [state, dispatch] = useContext(Context);
  const product = props.product;
  const productLink = "/products/" + product._id + "/view";

  const addProductToCart = async (e) => {
    const productData = {
      id: product._id,
      name: product.name,
      qty: 1,
    };
    await dispatch({ type: "ADD_PRODUCT_TO_CART", payload: productData });
  };

  return (
    <Fragment>
      <div className='card-img'>
        {product.images.length > 0 ? (
          <ProductImageCarousel images={product.images} />
        ) : (
          "No images"
        )}
      </div>
      <div className='card-content'>
        <div className='d-flex flex-column'>
          <div className='card-title'>
            <Link to={productLink}>{product.name}</Link>
          </div>
          <div className='card-desc'>
            <p>{product.description}</p>
          </div>
          <div className='card-add-btn'>
            <button
              className='btn btn-success'
              onClick={(e) => addProductToCart(e)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
