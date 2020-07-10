import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../ProductGrid";

function Home() {
  return (
    <Fragment>
      <div className='home-image'>
        <img
          src='https://images.unsplash.com/photo-1560464024-54e00d373791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80'
          alt='home-image'
        ></img>
        <div className='centered'>
          <h3 className='display-3'>The Third Space</h3>
          <Link to='/products' type='button' className='btn btn-light'>
            Start Shopping!
          </Link>
        </div>
      </div>
      <div></div>
    </Fragment>
  );
}

export default Home;
