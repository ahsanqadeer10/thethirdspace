// import React, { useState, useContext, useEffect, Fragment } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../../Spinner";
// import EditShopForm from "../../forms/EditShopForm";
// import ProductImageCarousel from "../../ProductImageCarousel";
// import arrayBufferToBase64 from "../../../utils/bufferToBase64";
// import { Context } from "../../../Store";

// const MyShop = () => {
//   const [state, dispatch] = useContext(Context);
//   const [myShop, setMyShop] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [editingLogo, setEditingLogo] = useState(false);
//   const [logo, setLogo] = useState(null);

//   useEffect(() => {
//     const source = axios.CancelToken.source();

//     const fetchMyShop = async () => {
//       try {
//         const response = await axios.get("/api/shops/my-shop", {
//           cancelToken: source.token,
//           params: { userId: state.user.id, userType: state.user.type },
//           headers: { "x-auth-token": state.user.token }
//         });
//         var fetchedShop = response.data.shop;
//         if (!fetchedShop) {
//           setLoading(false);
//         } else {
//           if (fetchedShop.image) {
//             var base64Flag = "data:image/jpeg;base64,";
//             var imageStr = arrayBufferToBase64(fetchedShop.image.data.data);
//             fetchedShop.image = base64Flag + imageStr;
//           }
//           if (fetchedShop.products.length > 0) {
//             for (let i = 0; i < fetchedShop.products.length; i++) {
//               var productImages = fetchedShop.products[i].images;
//               for (let j = 0; j < productImages.length; j++) {
//                 var productImage = productImages[j];
//                 var base64Flag = "data:image/jpeg;base64,";
//                 var imageStr = arrayBufferToBase64(productImage.data.data);
//                 fetchedShop.products[i].images[j] = base64Flag + imageStr;
//               }
//             }
//           }
//           setMyShop(fetchedShop);
//           setLogo(fetchedShop.image);

//           setLoading(false);
//         }
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           // request cancelled
//         } else {
//           throw error;
//         }
//       }
//     };

//     fetchMyShop();
//     return () => {
//       source.cancel();
//     };
//   }, ["/api/shops/my-shop/"]);

//   const enableEditing = e => {
//     setEditing(true);
//   };

//   const disableEditing = e => {
//     setEditing(false);
//   };

//   const changeLogo = e => {
//     const file = URL.createObjectURL(e.target.files[0]);
//     setLogo(file);
//   };

//   const updateLogo = async e => {
//     e.preventDefault();
//     const elem = document.getElementById("inputShopImage");
//     if (elem.files.length == 0) {
//       console.log("NO FILE UPLOADED");
//     } else {
//       try {
//         console.log("YES FILE UPLOADED");
//         const config = {
//           headers: {
//             "content-type": "multipart/form-data",
//             "x-auth-token": state.user.token,
//             "x-auth-id": state.user.id
//           }
//         };
//         const body = new FormData(e.target);
//         const response = await axios.put(
//           "/api/shops/my-shop/update-logo",
//           body,
//           config
//         );
//         setEditingLogo(false);
//         setMyShop(response.data.shop);
//       } catch (error) {
//         console.log(error.response.errors);
//       }
//     }
//   };

//   const removeLogo = async e => {
//     try {
//       const config = {
//         headers: {
//           "x-auth-token": state.user.token,
//           "x-auth-id": state.user.id
//         }
//       };
//       const response = await axios.put(
//         "/api/shops/my-shop/remove-logo",
//         {},
//         config
//       );
//       setLogo(null);
//       setMyShop(response.data.shop);
//     } catch (error) {
//       console.log(error.response.errors);
//     }
//   };

//   return (
//     <Fragment>
//       {!myShop && loading ? (
//         <Spinner />
//       ) : !myShop && !loading ? (
//         <div>NO SHOP FOUND!</div>
//       ) : (
//         <Fragment>
//           {!editing ? (
//             <div>
//               <div>
//                 {logo && !editingLogo ? (
//                   <Fragment>
//                     <img src={logo} style={{ width: "200px" }}></img>
//                     <button
//                       type='button'
//                       className='btn btn-primary'
//                       onClick={e => removeLogo(e)}
//                     >
//                       Remove Logo
//                     </button>
//                   </Fragment>
//                 ) : logo ? (
//                   <Fragment>
//                     <img src={logo} style={{ width: "200px" }}></img>
//                   </Fragment>
//                 ) : (
//                   <Fragment>
//                     <p>There is NO image</p>
//                   </Fragment>
//                 )}
//                 {editingLogo ? (
//                   <form onSubmit={e => updateLogo(e)}>
//                     <div className='form-group'>
//                       {" "}
//                       <div className='custom-file'>
//                         <label
//                           class='custom-file-label'
//                           htmlFor='inputShopImage'
//                         >
//                           Upload a logo
//                         </label>
//                         <input
//                           type='file'
//                           id='inputShopImage'
//                           className='form-control custom-file-input'
//                           name='shopImage'
//                           onChange={e => changeLogo(e)}
//                         />
//                       </div>
//                     </div>
//                     <button
//                       className='btn btn-warning'
//                       type='button'
//                       onClick={() => setEditingLogo(false)}
//                     >
//                       Exit Without Saving
//                     </button>
//                     <button type='submit' className='btn btn-primary'>
//                       Save Logo
//                     </button>
//                   </form>
//                 ) : (
//                   <Fragment>
//                     <button
//                       type='button'
//                       className='btn btn-primary'
//                       onClick={() => {
//                         setEditingLogo(true);
//                       }}
//                     >
//                       Update Logo
//                     </button>
//                   </Fragment>
//                 )}
//               </div>
//               <div>
//                 <h1>{myShop.name}</h1>
//                 <h6>{myShop.description}</h6>
//                 <h6>{myShop.address}</h6>
//                 <button
//                   type='button'
//                   className='btn btn-primary'
//                   onClick={e => enableEditing(e)}
//                 >
//                   Edit Shop Details
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <EditShopForm shop={myShop} disableEditing={disableEditing} />
//           )}

//           <div>
//             <div>MY PRODUCTS</div>
//             <Link
//               to='/my-shop/add-product'
//               className='btn btn-dark'
//               style={{ fontWeight: "300" }}
//             >
//               Add Product
//             </Link>
//             {myShop.products.length === 0 ? (
//               <div>No Products</div>
//             ) : (
//               myShop.products.map(product => {
//                 return (
//                   <div>
//                     {!product.images ? (
//                       <div>No product image.</div>
//                     ) : (
//                       <ProductImageCarousel
//                         width='200px'
//                         images={product.images}
//                       />
//                     )}
//                     <Link to={`my-shop/products/${product._id}`}>
//                       {product.name}
//                     </Link>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default MyShop;

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import defaultLogo from "../../../images/logo.png";
import ProductImageCarousel from "../../ProductImageCarousel";

export const MyShop = props => {
  return (
    <Fragment>
      <div className='d-flex flex row flex-wrap'>
        <div className='p-2'>
          {props.shop.image ? (
            <img src={props.shop.image} style={{ width: "250px" }}></img>
          ) : (
            <img src={defaultLogo} className='img-fluid'></img>
          )}
        </div>
        <div className='p-2'>
          <Link
            to={{
              pathname: "/my-profile/my-shop/edit",
              state: {
                shop: props.shop
              }
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
      <div>
        <div>
          <h1 className='display-4'>Inventory</h1>
        </div>
        <div>
          <Link
            to={{
              pathname: "/my-profile/my-shop/products/add",
              state: {
                shop: props.shop
              }
            }}
            className='btn btn-success btn-lg'
          >
            Add Product
          </Link>
        </div>
        <div className='d-flex flex-row flex-wrap'>
          {props.shop.products.length === 0 ? (
            <div className='p-2'>
              <h1 className='display-6'>No Products Added</h1>
            </div>
          ) : (
            props.shop.products.map(product => {
              return (
                <div className='p-2'>
                  {!product.images ? (
                    <div>No product image.</div>
                  ) : (
                    <ProductImageCarousel
                      width='200px'
                      images={product.images}
                    />
                  )}
                  <Link to='#' className='btn btn-link'>
                    {product.name}
                  </Link>
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
