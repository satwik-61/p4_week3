import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

// Initialize cart with all product ids and set quantity to 0
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[all_product[index].id] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login user (example)
  const loginUser = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token); // Store token in localStorage
  };

  // Logout user
  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken"); // Remove token on logout
  };

  // Add to cart functionality
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  // Remove from cart functionality
  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  // Add to wishlist functionality
  const addToWishlist = (item) => {
    setWishlistItems((prev) => {
      if (!prev.some((wishlistItem) => wishlistItem.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  // Remove from wishlist functionality
  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Get the total amount in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  // Get the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // Get the total number of items in the wishlist
  const getTotalWishlistItems = () => {
    return wishlistItems.length;
  };

  // Context value to be shared
  const contextValue = {
    isAuthenticated,
    loginUser,
    logoutUser,
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    getTotalWishlistItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
