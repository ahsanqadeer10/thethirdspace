import React, { useEffect, useState, Fragment } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import arrayBufferToBase64 from "../utils/bufferToBase64";
import Spinner from "./Spinner";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          cancelToken: source.token,
        });

        var fetchedProducts = [...response.data];

        fetchedProducts.forEach((product) => {
          console.log(product);
          if (product.images.length > 0) {
            var productImages = product.images;
            for (let i = 0; i < productImages.length; i++) {
              var productImage = productImages[i];
              var base64Flag = "data:image/jpeg;base64,";
              var imageStr = arrayBufferToBase64(productImage.data.data);
              product.images[i] = base64Flag + imageStr;
            }
          }
        });
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          // request cancelled
        } else {
          throw error;
        }
      }
    };

    fetchProducts();

    return () => {
      source.cancel();
    };
  }, ["/api/products/"]);

  return (
    <Fragment>
      <div
        className='d-flex flex-row align-items-end sort-bar'
        style={{ width: "100%" }}
      >
        <div class='text'>Sort by</div>
        <div>
          <select class='custom-select' id='sort-by'>
            <option value='Date Created' selected>
              Date
            </option>
          </select>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='d-flex flex-wrap'>
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className='d-flex flex-column align-items-center product-card'
              >
                <ProductCard key={product._id} product={product} />
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default ProductGrid;
