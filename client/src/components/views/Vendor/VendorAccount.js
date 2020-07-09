import React, { useState, useContext, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../../Spinner";
import arrayBufferToBase64 from "../../../utils/bufferToBase64";
import { Context } from "../../../Store";
import MyShop from "../Shop/MyShop";

const VendorAccount = () => {
  const [state, dispatch] = useContext(Context);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("shop");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAccount = async () => {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
            "x-auth-token": state.user.token,
            "x-auth-id": state.user.id,
            "x-auth-type": state.user.type,
            cancelToken: source.token
          }
        };
        const response = await axios.get("/api/vendors/", config);
        var fetchedAccount = response.data.user;
        console.log(fetchedAccount);
        if (!fetchedAccount) {
          setLoading(false);
        } else {
          if (fetchedAccount.shop.image) {
            var base64Flag = "data:image/jpeg;base64,";
            var imageStr = arrayBufferToBase64(
              fetchedAccount.shop.image.data.data
            );
            fetchedAccount.shop.image = base64Flag + imageStr;
          }
          console.log(fetchedAccount.shop.products);
          if (fetchedAccount.shop.products.length > 0) {
            for (let i = 0; i < fetchedAccount.shop.products.length; i++) {
              var productImages = fetchedAccount.shop.products[i].images;
              for (let j = 0; j < productImages.length; j++) {
                var productImage = productImages[j];
                var base64Flag = "data:image/jpeg;base64,";
                var imageStr = arrayBufferToBase64(productImage.data.data);
                fetchedAccount.shop.products[i].images[j] =
                  base64Flag + imageStr;
              }
            }
          }
          setAccount(fetchedAccount);
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
    fetchAccount();
    return () => {
      source.cancel();
    };
  }, ["/api/vendors/"]);

  const switchTab = e => {
    var elements = document.getElementsByClassName("page-tab-group")[0]
      .children;
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].name === currentTab) {
        elements[i].classList.remove("active");
      }
      if (elements[i].name === e.target.name) {
        elements[i].classList.add("active");
        setCurrentTab(e.target.name);
      }
    }
  };

  return (
    <Fragment>
      {!account && loading ? (
        <Spinner />
      ) : !account && !loading ? (
        <div>NO ACCOUNT FOUND!</div>
      ) : (
        <Fragment>
          {/* <div className='d-flex flex-row flex-wrap text-center page-tab-row'>
            <div className='p-2 flex-fill'>SHOP</div>
            <div className='p-2 flex-fill'>SETTINGS</div>
          </div> */}
          <div className='d-flex flex-column'>
            <div
              className='btn-group page-tab-group'
              role='group'
              aria-label='Basic example'
            >
              <button
                type='button'
                className='btn active'
                name='shop'
                onClick={e => {
                  switchTab(e);
                }}
              >
                Shop
              </button>
              <button
                type='button'
                className='btn'
                name='orders'
                onClick={e => {
                  switchTab(e);
                }}
              >
                Orders
              </button>
              <button
                type='button'
                class='btn'
                name='settings'
                onClick={e => {
                  switchTab(e);
                }}
              >
                Settings
              </button>
            </div>
          </div>
          <div>
            {currentTab === "shop" ? (
              <MyShop shop={account.shop} />
            ) : currentTab === "orders" ? (
              "ORDERS"
            ) : currentTab === "settings" ? (
              "SETTINGS"
            ) : (
              "No Content"
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default VendorAccount;
