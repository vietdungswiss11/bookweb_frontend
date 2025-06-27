import React, { useState } from "react";
import "./ProductActions.css";

interface ProductActionsProps {
  discountPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  stockQuantity?: number;
  onAddToCart?: (quantity: number) => void;
  onBuyNow?: (quantity: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  discountPrice,
  originalPrice,
  discountPercent = 0,
  stockQuantity = 10,
  onAddToCart,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);

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
      <div className="price-wrapper">
        <span className="price">{discountPrice.toLocaleString('vi-VN')}đ</span>
        {originalPrice && originalPrice > discountPrice && <span className="original-price">{originalPrice.toLocaleString('vi-VN')}đ</span>}
        {discountPercent > 0 && <span className="discount-percent">-{Math.round(discountPercent * 100)}%</span>}
      </div>

      <div className="review-wrapper">
        {renderStars(4.5)}
        <span className="review-count">(120 đánh giá)</span>
      </div>

      <div className="quantity-selector">
        <label>Số lượng:</label>
        <div className="quantity-input">
          <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-</button>
          <input type="text" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= stockQuantity}>+</button>
        </div>
        <span className="stock-quantity">Chỉ còn {stockQuantity} sản phẩm</span>
      </div>

      <div className="button-group">
        <button className="btn-add-to-cart" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
        <button className="btn-buy-now" onClick={handleBuyNow}>
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
