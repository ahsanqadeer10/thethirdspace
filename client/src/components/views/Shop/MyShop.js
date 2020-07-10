import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import defaultLogo from "../../../images/logo.png";
import ProductImageCarousel from "../../ProductImageCarousel";

export const MyShop = (props) => {
  return (
    <Fragment>
      <div className='d-flex flex row flex-wrap'>
        <div className='p-2'>
          {props.shop.image ? (
            <img src={props.shop.image} style={{ width: "160px" }}></img>
          ) : (
            <img
              src={defaultLogo}
              className='img-fluid'
              style={{ width: "160px" }}
            ></img>
          )}
        </div>
        <div className='p-2'>
          <Link
            to={{
              pathname: "/my-profile/my-shop/edit",
              state: {
                shop: props.shop,
              },
            }}
            className='btn btn-secondary'
          >
            Edit Shop
          </Link>
          <div>
            <strong>Name: </strong> {props.shop.name}
          </div>
          <div>
            <strong>Description: </strong> {props.shop.description}
          </div>
          <div>
            <strong>Address: </strong> {props.shop.address}
          </div>
        </div>
      </div>
      <hr></hr>
      <div>
        <div className='d-flex flex-row justify-content-between align-items-end'>
          <div className='p-2'>
            <h1 className='display-5'>Inventory</h1>
          </div>
          <div className='p-2'>
            <Link
              to={{
                pathname: "/my-profile/my-shop/products/add",
                state: {
                  shop: props.shop,
                },
              }}
              className='btn btn-secondary'
            >
              Add Product
            </Link>
          </div>
        </div>

        <div className='d-flex flex-row flex-wrap'>
          {props.shop.products.length === 0 ? (
            <div className='p-2'>
              <h5 className='display-5'>No Products Added</h5>
            </div>
          ) : (
            props.shop.products.map((product) => {
              var myProductLink = `my-profile/my-shop/products/${product._id}`;
              return (
                <div
                  className='p-2'
                  style={{ width: "200px", fontSize: "0.9em" }}
                >
                  <div class='card'>
                    {product.images.length === 0 ? (
                      <div>No product image.</div>
                    ) : (
                      <ProductImageCarousel images={product.images} />
                    )}
                    <div class='card-body'>
                      <h5 class='card-title'>
                        <Link to={myProductLink} className='btn btn-link'>
                          {product.name}
                        </Link>
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default MyShop;
