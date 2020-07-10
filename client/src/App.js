import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/views/Home";

import Register from "./components/views/Customer/Register";
import JoinAsVendor from "./components/views/Vendor/JoinAsVendor";
import Login from "./components/views/Login";

import MyProfile from "./components/views/MyProfile";

import Checkout from "./components/views/Checkout";

import EditShop from "./components/views/Shop/EditShop";
import ViewShops from "./components/views/Shop/ViewShops";
import ViewShop from "./components/views/Shop/ViewShop";

import AddProduct from "./components/views/Product/AddProduct";

import MyProduct from "./components/views/Product/MyProduct";

import ViewProducts from "./components/views/Product/ViewProducts";
import ViewProduct from "./components/views/Product/ViewProduct";
import PrivateRoute from "./components/routes/PrivateRoute";
import VendorOnlyRoute from "./components/routes/VendorOnlyRoute";
import Store from "./Store";

const App = () => {
  return (
    <Store>
      <Router>
        <Fragment>
          <Navbar />
          <div id='main'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/join-as-vendor' component={JoinAsVendor} />
              <Route exact path='/login' component={Login} />

              <Route exact path='/checkout' component={Checkout} />

              <PrivateRoute exact path='/my-profile' component={MyProfile} />
              <VendorOnlyRoute
                exact
                path='/my-profile/my-shop/edit'
                component={EditShop}
              />

              <VendorOnlyRoute
                exact
                path='/my-profile/my-shop/products/add'
                component={AddProduct}
              />

              <VendorOnlyRoute
                exact
                path='/my-profile/my-shop/products/:id'
                component={MyProduct}
              />

              <Route exact path='/shops' component={ViewShops} />
              <Route exact path='/shops/:name' component={ViewShop} />

              <Route exact path='/products' component={ViewProducts} />

              <Route exact path='/products/:id/view' component={ViewProduct} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Store>
  );
};

export default App;
