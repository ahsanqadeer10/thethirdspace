import React, { Fragment, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../../Store";
import Cart from "../Cart";
import styles from "./navbarstyle.module.css";
import ttsLogo from "../../images/ttslogo.png";

const Navbar = (props) => {
  const [state, dispatch] = useContext(Context);
  const [showCart, setShowCart] = useState(false);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch({ type: "LOGOUT" });
    window.location.reload();
  };

  /* Set the width of the sidebar to 250px (show it) */
  function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
  }

  /* Set the width of the sidebar to 0 (hide it) */
  function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
  }

  const guestLinks = (
    <Fragment>
      <li>
        <NavLink to='/register'>Sign-Up</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Sign-In</NavLink>
      </li>
      <li>
        <NavLink to='/join-as-vendor' className={styles.registerBusiness}>
          Register Your Business
        </NavLink>
      </li>
    </Fragment>
  );

  const vendorLinks = (
    <Fragment>
      <li>
        <NavLink to='/my-profile'>
          {" "}
          <i class='far fa-user fa-lg'></i>
        </NavLink>
      </li>
      <li>
        <Link to='#!' onClick={(e) => logout(e)}>
          Sign-Out
        </Link>
      </li>
    </Fragment>
  );

  const customerLinks = (
    <Fragment>
      <li>
        <NavLink to='/my-profile'>
          {" "}
          <i class='far fa-user fa-lg'></i>
        </NavLink>
      </li>
      <li>
        <Link to='#!' onClick={(e) => logout(e)}>
          Sign-Out
        </Link>
      </li>
      <li>
        <NavLink to='/join-as-vendor' className={styles.registerBusiness}>
          Register Your Business
        </NavLink>
      </li>
    </Fragment>
  );

  const FirstNavLinks = (
    <Fragment>
      <li>
        <NavLink to='/products' activeClassName='active'>
          Products
        </NavLink>
      </li>
      <li>
        <span className={styles.dot}></span>
      </li>
      <li>
        <NavLink to='/shops' activeClassName='active'>
          Shops
        </NavLink>
      </li>
      <li>
        <span className={styles.dot}></span>
      </li>
      <li>
        <NavLink to='#' activeClassName='active'>
          Stories
        </NavLink>
      </li>
      <li>
        <span className={styles.dot}></span>
      </li>
      <li>
        <NavLink to='#' activeClassName='active'>
          About Us
        </NavLink>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <div className={styles.sidebar} id='sidebar'>
        <div className='d-flex flex-column'>
          <div className='align-self-end'>
            <Link to='#' className={styles.closeBtn} onClick={closeSidebar}>
              <i class='fas fa-times fa-2x'></i>
            </Link>
          </div>
          <div>
            <ul>{FirstNavLinks}</ul>
          </div>
          <div>
            {" "}
            <ul>
              <span className={styles.secondNav}></span>
              {state.isLoggedIn
                ? state.user.type === "customer"
                  ? customerLinks
                  : vendorLinks
                : guestLinks}
            </ul>
          </div>
        </div>
      </div>

      <header>
        <div
          className='d-flex flex-row justify-content-between align-items-end
      '
        >
          <div className='d-flex align-items-center'>
            <div>
              <Link className={styles.sidebarBtn} onClick={openSidebar}>
                <i class='fas fa-bars fa-lg' aria-hidden='true'></i>
              </Link>
            </div>
            <div>
              <NavLink to='/' className={styles.logo}>
                <img src={ttsLogo}></img>
              </NavLink>
            </div>
          </div>
          <div className='d-flex'>
            <ul>
              <li>
                <Cart />
              </li>
              <span className={styles.secondNav}>
                {state.isLoggedIn
                  ? state.user.type === "customer"
                    ? customerLinks
                    : vendorLinks
                  : guestLinks}
              </span>
            </ul>
          </div>
        </div>

        <div className='d-flex flex-row justify-content-center align-items-center'>
          <div className='d-flex'>
            <ul>
              <span className={styles.firstNav}>{FirstNavLinks}</span>
            </ul>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
