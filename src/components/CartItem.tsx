import React from "react";
import "./CartItem.css";
import { CartItemData } from "./ShoppingCartPage";

interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  loading?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
  loading,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?",
      )
    ) {
      onRemove(item.id);
    }
  };

  return (
    <div className={`cart-item ${loading ? "loading" : ""}`}>
      <div className="cart-item-content">
        {/* Book Image */}
        <div className="cart-item-image">
          <img src={item.book.image} alt={item.book.title} loading="lazy" />
        </div>

        {/* Book Info */}
        <div className="cart-item-info">
          <h3 className="book-title">{item.book.title}</h3>
          <p className="book-price">${item.book.price.toFixed(2)}</p>
          <p className="book-author">By: {item.book.author}</p>
        </div>

        {/* Quantity Controls */}
        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || loading}
              className="quantity-btn quantity-decrease"
              aria-label="Decrease quantity"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8H12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value) || 1)
              }
              min="1"
              max="99"
              disabled={loading}
              className="quantity-input"
              aria-label="Quantity"
            />

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 99 || loading}
              className="quantity-btn quantity-increase"
              aria-label="Increase quantity"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 4V12M4 8H12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Item Total */}
          <div className="item-total">
            <span className="total-label">Total:</span>
            <span className="total-price">${item.totalPrice.toFixed(2)}</span>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            disabled={loading}
            className="remove-item-btn"
            aria-label="Remove item from cart"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 1.5C6.5 1.22386 6.72386 1 7 1H9C9.27614 1 9.5 1.22386 9.5 1.5V2H11.5C11.7761 2 12 2.22386 12 2.5C12 2.77614 11.7761 3 11.5 3H11V12.5C11 13.3284 10.3284 14 9.5 14H6.5C5.67157 14 5 13.3284 5 12.5V3H4.5C4.22386 3 4 2.77614 4 2.5C4 2.22386 4.22386 2 4.5 2H6.5V1.5ZM6 3V12.5C6 12.7761 6.22386 13 6.5 13H9.5C9.77614 13 10 12.7761 10 12.5V3H6ZM7 4.5C7.27614 4.5 7.5 4.72386 7.5 5V11C7.5 11.2761 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.2761 6.5 11V5C6.5 4.72386 6.72386 4.5 7 4.5ZM9 4.5C9.27614 4.5 9.5 4.72386 9.5 5V11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11V5C8.5 4.72386 8.72386 4.5 9 4.5Z"
                fill="currentColor"
              />
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
