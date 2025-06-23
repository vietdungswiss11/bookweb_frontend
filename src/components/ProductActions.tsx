import React, { useState } from "react";
import "./ProductActions.css";

interface ProductActionsProps {
  price: number;
  originalPrice?: number;
  stockQuantity?: number;
  onAddToCart?: (quantity: number) => void;
  onBuyNow?: (quantity: number) => void;
  onAddToWishlist?: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  price,
  originalPrice,
  stockQuantity = 10,
  onAddToCart,
  onBuyNow,
  onAddToWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart?.(quantity);
  };

  const handleBuyNow = () => {
    onBuyNow?.(quantity);
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    onAddToWishlist?.();
  };

  const renderStars = (rating: number = 4.5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <svg
                key={index}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-filled"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.4883 7.04234L12.3172 9.80984L13.2671 13.9302C13.3699 14.3705 13.199 14.8296 12.8333 15.0956C12.4676 15.3616 11.9782 15.3828 11.5909 15.1494L7.99719 12.9697L4.41125 15.1494C4.02394 15.3828 3.53452 15.3616 3.16882 15.0956C2.80312 14.8296 2.63223 14.3705 2.735 13.9302L3.68352 9.81406L0.511719 7.04234C0.168718 6.74652 0.0365809 6.27384 0.176449 5.84303C0.316317 5.41222 0.700908 5.1073 1.15227 5.06938L5.33305 4.70727L6.965 0.814766C7.13926 0.397124 7.54746 0.12514 8 0.12514C8.45254 0.12514 8.86074 0.397124 9.035 0.814766L10.6719 4.70727L14.8512 5.06938C15.3026 5.1073 15.6872 5.41222 15.8271 5.84303C15.9669 6.27384 15.8348 6.74652 15.4918 7.04234H15.4883Z"
                  fill="#009963"
                />
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <svg
                key={index}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-half"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.8188 5.8407C15.6795 5.41148 15.2972 5.107 14.8477 5.06727L10.6719 4.70727L9.035 0.814766C8.86074 0.397124 8.45254 0.12514 8 0.12514C7.54746 0.12514 7.13926 0.397124 6.965 0.814766L5.33305 4.70727L1.15227 5.06938C0.700908 5.1073 0.316317 5.41222 0.176449 5.84303C0.0365809 6.27384 0.168718 6.74652 0.511719 7.04234L3.68352 9.81406L2.73289 13.9302C2.63012 14.3705 2.80102 14.8296 3.16672 15.0956C3.53241 15.3616 4.02183 15.3828 4.40914 15.1494L7.99508 12.9697L11.5887 15.1494C11.9761 15.3828 12.4655 15.3616 12.8312 15.0956C13.1969 14.8296 13.3678 14.3705 13.265 13.9302L12.3151 9.80984L15.4862 7.04234C15.8292 6.74548 15.9603 6.27167 15.8188 5.8407ZM14.7486 6.19227L11.5775 8.95977C11.263 9.23335 11.1255 9.65843 11.2203 10.0644L12.173 14.1875L8.58219 12.0078C8.22504 11.7903 7.77637 11.7903 7.41922 12.0078L3.83328 14.1875L4.77969 10.0672C4.87447 9.66124 4.73702 9.23617 4.4225 8.96258L1.25 6.19648C1.24974 6.19438 1.24974 6.19226 1.25 6.19016L5.42938 5.82875C5.84523 5.7921 6.20659 5.52818 6.36805 5.1432L8 1.25563L9.63125 5.1432C9.79271 5.52818 10.1541 5.7921 10.5699 5.82875L14.75 6.19016C14.75 6.19016 14.75 6.19437 14.75 6.19508L14.7486 6.19227Z"
                  fill="#009963"
                />
              </svg>
            );
          } else {
            return (
              <svg
                key={index}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-empty"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.8188 5.8407C15.6795 5.41148 15.2972 5.107 14.8477 5.06727L10.6719 4.70727L9.035 0.814766C8.86074 0.397124 8.45254 0.12514 8 0.12514C7.54746 0.12514 7.13926 0.397124 6.965 0.814766L5.33305 4.70727L1.15227 5.06938C0.700908 5.1073 0.316317 5.41222 0.176449 5.84303C0.0365809 6.27384 0.168718 6.74652 0.511719 7.04234L3.68352 9.81406L2.73289 13.9302C2.63012 14.3705 2.80102 14.8296 3.16672 15.0956C3.53241 15.3616 4.02183 15.3828 4.40914 15.1494L7.99508 12.9697L11.5887 15.1494C11.9761 15.3828 12.4655 15.3616 12.8312 15.0956C13.1969 14.8296 13.3678 14.3705 13.265 13.9302L12.3151 9.80984L15.4862 7.04234C15.8292 6.74548 15.9603 6.27167 15.8188 5.8407ZM14.7486 6.19227L11.5775 8.95977C11.263 9.23335 11.1255 9.65843 11.2203 10.0644L12.173 14.1875L8.58219 12.0078C8.22504 11.7903 7.77637 11.7903 7.41922 12.0078L3.83328 14.1875L4.77969 10.0672C4.87447 9.66124 4.73702 9.23617 4.4225 8.96258L1.25 6.19648C1.24974 6.19438 1.24974 6.19226 1.25 6.19016L5.42938 5.82875C5.84523 5.7921 6.20659 5.52818 6.36805 5.1432L8 1.25563L9.63125 5.1432C9.79271 5.52818 10.1541 5.7921 10.5699 5.82875L14.75 6.19016C14.75 6.19016 14.75 6.19437 14.75 6.19508L14.7486 6.19227Z"
                  fill="#E8DECF"
                />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="product-actions">
      {/* Rating */}
      <div className="product-rating">
        {renderStars(4.5)}
        <span className="rating-text">4.5 (1,900 reviews)</span>
      </div>

      {/* Price */}
      <div className="product-price">
        <span className="current-price">${price.toFixed(2)}</span>
        {originalPrice && originalPrice > price && (
          <span className="original-price">${originalPrice.toFixed(2)}</span>
        )}
      </div>

      {/* Short Description */}
      <div className="product-short-description">
        <p>
          Available in paperback and digital formats. Fast shipping worldwide.
        </p>
      </div>

      {/* Stock Status */}
      <div className="stock-status">
        <span
          className={`stock-indicator ${stockQuantity > 0 ? "in-stock" : "out-of-stock"}`}
        >
          {stockQuantity > 0
            ? `In Stock (${stockQuantity} available)`
            : "Out of Stock"}
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity:</label>
        <div className="quantity-input">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="quantity-btn"
          >
            -
          </button>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(parseInt(e.target.value) || 1)
            }
            min="1"
            max={stockQuantity}
            className="quantity-field"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= stockQuantity}
            className="quantity-btn"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={handleAddToCart}
          disabled={stockQuantity === 0}
          className="btn btn-primary add-to-cart"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          disabled={stockQuantity === 0}
          className="btn btn-secondary buy-now"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToWishlist}
          className={`btn btn-outline wishlist-btn ${isInWishlist ? "active" : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8783 2.84853C15.3224 2.61896 14.7268 2.50208 14.1252 2.50208C13.5235 2.50208 12.9279 2.61896 12.372 2.84853C11.8161 3.0781 11.3108 3.41589 10.8852 3.84172L9.99976 4.72714L9.11434 3.84172C8.25267 2.98005 7.10618 2.50264 5.91434 2.50264C4.72251 2.50264 3.57602 2.98005 2.71434 3.84172C1.85267 4.7034 1.37526 5.84989 1.37526 7.04172C1.37526 8.23356 1.85267 9.38005 2.71434 10.2417L3.59976 11.1271L9.99976 17.5271L16.3998 11.1271L17.2852 10.2417C17.711 9.81609 18.0488 9.31075 18.2784 8.75488C18.5079 8.199 18.6248 7.6034 18.6248 7.00172C18.6248 6.40005 18.5079 5.80445 18.2784 5.24857C18.0488 4.6927 17.711 4.18736 17.2852 3.76172L17.3651 3.84172Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isInWishlist ? "currentColor" : "none"}
            />
          </svg>
          {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
