import React, { useContext, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import wishlist_icon from "../Assets/wishlist.png";  // Import wishlist icon
import nav_dropdown from "../Assets/nav_dropdown.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, getTotalWishlistItems } = useContext(ShopContext);  // Now both are available
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar sticky">
      <Link to="/" onClick={() => setMenu("shop")} className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>FASHION CLUB</p>
      </Link>
      <img onClick={dropdown_toggle} className="nav-dropdown" src={nav_dropdown} alt="Dropdown" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/">Home</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens">Men</Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens">Women</Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids">Kids</Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/wishlist">
          <img src={wishlist_icon} alt="Wishlist" />
        </Link>
        <div className="nav-cart-count">{getTotalWishlistItems()}</div>  {/* Wishlist items count */}
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>  {/* Cart items count */}
      </div>
    </div>
  );
};

export default Navbar;
