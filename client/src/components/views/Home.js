import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../ProductGrid";

function Home() {
  return (
    <Fragment>
      <h4 className='display-5'>
        Welcome to <strong>The Third Space</strong>
      </h4>
      <div className='d-flex flex-row justify-content-center'>
        <h4 className='display-5'>Featured Products</h4>
      </div>
      <div className='d-flex flex-row'>
        <ProductGrid />
      </div>
    </Fragment>
  );
}

export default Home;
