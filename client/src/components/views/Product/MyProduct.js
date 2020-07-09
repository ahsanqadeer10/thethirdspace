import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner";
import ProductImageCarousel from "../../ProductImageCarousel";
import arrayBufferToBase64 from "../../../utils/bufferToBase64";
import { Context } from "../../../Store";

const MyProduct = (props) => {
  const [state, dispatch] = useContext(Context);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "/api/products/" + props.match.params.id + "/view",
          {
            cancelToken: source.token,
          }
        );
        var fetchedProduct = response.data.product;
        if (!fetchedProduct) {
          setLoading(false);
        } else {
          if (fetchedProduct.images) {
            var productImages = fetchedProduct.images;
            for (let i = 0; i < productImages.length; i++) {
              var productImage = productImages[i];
              var base64Flag = "data:image/jpeg;base64,";
              var imageStr = arrayBufferToBase64(productImage.data.data);
              fetchedProduct.images[i] = base64Flag + imageStr;
            }
          }
          setProduct(fetchedProduct);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          // request cancelled
        } else {
          throw error;
        }
      }
    };

    fetchProduct();
    return () => {
      source.cancel();
    };
  }, ["/api/products/" + props.match.params.id + "/view"]);

  const deleteProduct = async (e) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "x-auth-token": state.user.token,
          "x-auth-id": state.user.id,
        },
      };
      const response = await axios.delete(
        "/api/products/" + product._id + "/delete",
        config
      );
      window.location.href = "/my-shop/";
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.errors);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : !product ? (
        "NO PRODUCT FOUND!"
      ) : (
        <div>
          <div style={{ width: "33%" }}>
            {product.images ? (
              <ProductImageCarousel width='200px' images={product.images} />
            ) : (
              "No images"
            )}
          </div>
          <div>{product.name}</div>
          <button
            type='button'
            className='btn btn-danger'
            data-toggle='modal'
            data-target='#deleteProductModal'
          >
            Delete
          </button>
          <div
            className='modal fade'
            id='deleteProductModal'
            tabindex='-1'
            role='dialog'
            aria-labelledby='deleteProductModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='deleteProductModalLabel'>
                    Confirmation
                  </h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  Are you sure you want to delete {product.name}?
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={(e) => {
                      deleteProduct(e);
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type='button' className='btn btn-light'>
            Edit
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default MyProduct;
