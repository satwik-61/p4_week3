import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product = {} } = props;
  const { addToCart, addToWishlist } = useContext(ShopContext);

  const {
    id = null,
    name = "No Name",
    image = "",
    images = [image, image, image, image],
    old_price = 0,
    new_price = 0,
    rating = 0,
    reviewCount = 0,
    description = "No description available.",
    category = "Unknown",
    tags = [],
  } = product;

  const [selectedSize, setSelectedSize] = useState("");
  const [userRating, setUserRating] = useState(rating);
  const [userReviewCount, setUserReviewCount] = useState(reviewCount);

  const handleStarClick = (index) => {
    const newRating = index + 1;
    if (newRating <= 5) {
      setUserRating(newRating);
      setUserReviewCount(newRating); // Update review count based on the rating selected
    }
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Thumbnail ${index + 1}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={image} alt={name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{name}</h1>

        <div className="productdisplay-right-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <img
              key={i}
              src={i < userRating ? star_icon : star_dull_icon}
              alt={i < userRating ? "star" : "dull star"}
              onClick={() => handleStarClick(i)}
              className="clickable-star"
            />
          ))}
          <p>({userReviewCount})</p> {/* Dynamically update review count */}
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${old_price}</div>
          <div className="productdisplay-right-price-new">${new_price}</div>
        </div>

        <div className="productdisplay-right-description">{description}</div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "selected" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => id && addToCart(id)}
          disabled={!id}
          className="add-to-cart"
        >
          ADD TO CART
        </button>

        <button
          onClick={() => id && addToWishlist(product)}
          disabled={!id}
          className="add-to-wishlist"
        >
          ADD TO WISHLIST
        </button>

        <p className="productdisplay-right-category">
          <span>Category:</span> {category}
        </p>
        <p className="productdisplay-right-tags">
          <span>Tags:</span> {tags.join(", ")}
        </p>
      </div>
    </div>
  );
};

ProductDisplay.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    old_price: PropTypes.number,
    new_price: PropTypes.number,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProductDisplay;
