import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { Context } from "../../../Store";
import Spinner from "../../Spinner";
import ProductImageCarousel from "../../ProductImageCarousel";
import arrayBufferToBase64 from "../../../utils/bufferToBase64";

function ViewProduct(props) {
  const [state, dispatch] = useContext(Context);
  const [product, setProduct] = useState(null);
  const [orderQty, setOrderQty] = useState("1");
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
          if (fetchedProduct.images.length > 0) {
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
  }, ["/api/products/:id/view"]);

  const addProductToCart = async (e) => {
    const productData = {
      id: product._id,
      name: product.name,
      qty: parseInt(orderQty),
    };
    await dispatch({ type: "ADD_PRODUCT_TO_CART", payload: productData });
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {product ? (
            <div className='d-flex flex-row'>
              <div style={{ width: "50%" }}>
                {product.images.length > 0 ? (
                  <ProductImageCarousel images={product.images} />
                ) : (
                  "No images to show"
                )}
              </div>

              <div className='d-flex flex-column' style={{ padding: "0 50px" }}>
                <div style={{ fontSize: "2em" }}>{product.name}</div>
                <div>Rs. {product.price}</div>
                <div>{product.description}</div>
                <div>Number in stock: {product.stock}</div>
                <div>
                  <label for='quantity'>Quantity</label>
                  <input
                    type='number'
                    id='quantity'
                    name='quantity'
                    min='1'
                    defaultValue='1'
                    max={product.stock}
                    onChange={(e) => {
                      setOrderQty(e.target.value);
                    }}
                  ></input>
                  <button type='button' onClick={(e) => addProductToCart(e)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            "Product not found :("
          )}
        </Fragment>
      )}
    </Fragment>
    // <Fragment>
    //   {loading ? (
    //     <Spinner />
    //   ) : (
    //     <Fragment>
    //       {product ? (
    //         <div>Here goes the image</>
    //         <button
    //             onClick={(e) => addProductToCart(e)}
    //             className='btn btn-dark'
    //           >
    //             Add
    //           </button>
    //       ) : (
    //         "Product not found!"
    //       )}
    //     </Fragment>
    //   )}
    // </Fragment>
  );
}

export default ViewProduct;
