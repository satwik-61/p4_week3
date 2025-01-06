import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./Wishlist.css";
import wishlistIcon from "../Components/Assets/wishlist.png";

const Wishlist = () => {
  const { wishlistItems, addToCart, removeFromWishlist } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState({});

  const handleSizeChange = (itemId, size) => {
    setSelectedSize((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const handleAddToCart = (item, size) => {
    if (size) {
      addToCart(item.id, size);
    }
  };

  return (
    <div className="wishlist">
      <header className="wishlist-header">
        <div className="icons-container">
          <img
            src={wishlistIcon}
            alt="Wishlist Icon"
            className="wishlist-icon"
          />
        </div>
        <h1>Your Wishlist</h1>
      </header>
      <div className="wishlist-items">
        {wishlistItems && wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img
                src={item.image}
                alt={item.name}
                className="wishlist-item-image"
              />
              <div className="wishlist-item-details">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.new_price}</p>
                <div>
                  <label htmlFor={`size-${item.id}`}>Size:</label>
                  <select
                    id={`size-${item.id}`}
                    onChange={(e) => handleSizeChange(item.id, e.target.value)}
                    value={selectedSize[item.id] || ""}
                  >
                    <option value="">Select size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <div className="wishlist-item-actions">
                  <button
                    onClick={() =>
                      handleAddToCart(item, selectedSize[item.id])
                    }
                    disabled={!selectedSize[item.id]} // Disable if no size selected
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-wishlist-message">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
