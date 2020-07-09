import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../../Spinner";

const ViewShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchShops = async () => {
      try {
        const response = await axios.get("api/shops/", {
          cancelToken: source.token
        });
        setShops([...response.data.shops]);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          // request cancelled
        } else {
          throw error;
        }
      }
    };

    fetchShops();

    return () => {
      source.cancel();
    };
  }, ["api/shops/"]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : shops.length === 0 ? (
        <div>There are currently no shops available.</div>
      ) : (
        shops.map(shop => {
          var link = "shops/" + shop.name;
          return (
            <div>
              <a href={link}>{shop.name}</a>
            </div>
          );
        })
      )}
    </Fragment>
  );
};

export default ViewShops;
