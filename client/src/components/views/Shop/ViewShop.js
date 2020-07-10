import React, { useState, useEffect, Fragment } from "react";
import Spinner from "../../Spinner";
import arrayBufferToBase64 from "../../../utils/bufferToBase64";
import axios from "axios";

const ViewShop = (props) => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchShop = async () => {
      try {
        const response = await axios.get(
          "/api/shops/" + props.match.params.name,
          {
            cancelToken: source.token,
          }
        );
        const fetchedShop = response.data.shop;
        if (!fetchedShop) {
          setLoading(false);
        } else {
          if (fetchedShop.image) {
            var base64Flag = "data:image/jpeg;base64,";
            var imageStr = arrayBufferToBase64(fetchedShop.image.data.data);
            fetchedShop.image = base64Flag + imageStr;
          }
          if (fetchedShop.products.length > 0) {
            for (let i = 0; i < fetchedShop.products.length; i++) {
              var productImages = fetchedShop.products[i].images;
              for (let j = 0; j < productImages.length; j++) {
                var productImage = productImages[j];
                var base64Flag = "data:image/jpeg;base64,";
                var imageStr = arrayBufferToBase64(productImage.data.data);
                fetchedShop.products[i].images[j] = base64Flag + imageStr;
              }
            }
          }
          setShop(fetchedShop);
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

    fetchShop();

    return () => {
      source.cancel();
    };
  }, ["api/shops/:name"]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : !shop ? (
        <div>Sorry. Shop not found.</div>
      ) : (
        <div>
          <div>
            <img src={shop.image}></img>
          </div>
          <div>
            <strong>Shop Name: </strong>
            {shop.name}
          </div>
          <div>
            <strong>Shop Description: </strong> {shop.description}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ViewShop;
