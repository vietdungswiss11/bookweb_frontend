import React from "react";
import "./CartSummary.css";
import { CartData } from "./ShoppingCartPage";

interface CartSummaryProps {
  cartData: CartData;
  onProceedToCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartData,
  onProceedToCheckout,
}) => {
  return (
    <div className="cart-summary">
      <div className="summary-content">
        {/* Summary Rows */}
        <div className="summary-rows">
          <div className="summary-row">
            <span className="summary-label">Subtotal</span>
            <span className="summary-value">
              ${cartData.subtotal.toFixed(2)}
            </span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Estimated Tax</span>
            <span className="summary-value">${cartData.tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Shipping</span>
            <span className="summary-value">
              {cartData.shipping === 0
                ? "Free"
                : `$${cartData.shipping.toFixed(2)}`}
            </span>
          </div>

          {cartData.couponDiscount && cartData.couponDiscount > 0 && (
            <div className="summary-row discount-row">
              <span className="summary-label">
                Discount ({cartData.couponCode})
              </span>
              <span className="summary-value discount">
                -${cartData.couponDiscount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span className="summary-label total-label">Total</span>
            <span className="summary-value total-value">
              ${cartData.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="checkout-section">
          <button onClick={onProceedToCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>

          <div className="payment-methods">
            <span className="payment-text">We accept:</span>
            <div className="payment-icons">
              <div className="payment-icon visa">VISA</div>
              <div className="payment-icon mastercard">MC</div>
              <div className="payment-icon paypal">PP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
