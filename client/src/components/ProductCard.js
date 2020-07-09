import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ProductImageCarousel from "../components/ProductImageCarousel";
import arrayBufferToBase64 from "../utils/bufferToBase64";

const ProductCard = (props) => {
  const product = props.product;
  const productLink = "/products/" + product._id + "/view";

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
            <button className='btn btn-success'>Add to Cart</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
