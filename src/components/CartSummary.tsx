import React from "react";
import "./CartSummary.css";
import { CartData } from "./ShoppingCartPage";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  cartData: CartData;
  onProceedToCheckout: () => void;
}

// Helper để format số tiền an toàn
const formatMoney = (value: number | undefined) => typeof value === 'number' ? value.toFixed(2) : '0.00';

const CartSummary: React.FC<CartSummaryProps> = ({
  cartData,
  onProceedToCheckout,
}) => {
  const navigate = useNavigate();

  return (
    <div className="cart-summary">
      <div className="summary-content">
        {/* Summary Rows */}
        <div className="summary-rows">
          <div className="summary-row">
            <span className="summary-label">Subtotal</span>
            <span className="summary-value">
              {typeof cartData.subtotal === 'number'
                ? cartData.subtotal.toLocaleString('vi-VN') + ' đ'
                : '0 đ'}
            </span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Estimated Tax</span>
            <span className="summary-value">${formatMoney(cartData?.tax)}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Shipping</span>
            <span className="summary-value">
              {typeof cartData.shipping === 'number'
                ? cartData.shipping.toLocaleString('vi-VN') + ' đ'
                : '0 đ'}
            </span>
          </div>

          {cartData?.couponDiscount && cartData.couponDiscount > 0 && (
            <div className="summary-row discount-row">
              <span className="summary-label">
                Discount ({cartData.couponCode})
              </span>
              <span className="summary-value discount">
                -${formatMoney(cartData.couponDiscount)}
              </span>
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span className="summary-label total-label">Total</span>
            <span className="summary-value total-value">
              {typeof cartData.total === 'number'
                ? cartData.total.toLocaleString('vi-VN') + ' đ'
                : '0 đ'}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="checkout-section">
          <button onClick={() => navigate('/checkout')} className="checkout-btn">
            Proceed to Checkout
          </button>

          <div className="payment-methods">
            <span className="payment-text">We accept:</span>
            <div className="payment-icons">
              <div className="payment-icon cod">COD</div>
              <div className="payment-icon momo">MOMO</div>
              <div className="payment-icon vnpay">VNPAY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
