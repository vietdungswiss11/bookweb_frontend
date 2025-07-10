import React, { useState, useEffect } from "react";
import "./ShoppingCartPage.css";
import Breadcrumbs from "./Breadcrumbs";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useCartApi } from "../hooks/useCartApi";
import AuthModal from "./AuthModal";

export interface CartItemData {
  id: string;
  book: {
    id: string;
    title: string;
    author: string;
    discountPrice: number;
    originalPrice: number;
    discountPercent: number;
    images?: { url: string }[];
  };
  quantity: number;
  totalPrice: number;
}

export interface CartData {
  items: CartItemData[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
}

// Helper để format số tiền an toàn
const formatMoney = (value: number | undefined) =>
  typeof value === "number" ? value.toFixed(2) : "0.00";

const ShoppingCartPage: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const {
    cart,
    loading,
    updateCartItem,
    removeCartItem,
    clearCart,
    fetchCart,
  } = useCartApi(userId || "");
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) fetchCart();
  }, [fetchCart, userId]);

  if (!userId) {
    return (
      <AuthModal open={true} onClose={() => (window.location.href = "/")} />
    );
  }

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeCartItem(itemId);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || !cart) return;
    // Simulate coupon validation
    setTimeout(() => {
      let discount = 0;
      if (couponCode.toLowerCase() === "save10") {
        discount = cart.subtotal * 0.1; // 10% discount
      } else if (couponCode.toLowerCase() === "free5") {
        discount = 5; // $5 off
      }
      // Chỉ hiển thị, kh��ng update lên server vì API chưa hỗ trợ coupon
      // Nếu muốn lưu coupon lên server, cần bổ sung API
      alert(
        discount > 0
          ? `Áp dụng mã giảm giá thành công: -${discount}`
          : "Invalid coupon code",
      );
    }, 500);
  };

  const handleProceedToCheckout = () => {
    // Navigate to checkout page
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Giỏ hàng" },
  ];

  if (loading && !cart) {
    return (
      <div className="shopping-cart-page">
        <Header />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="cart-loading">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-page">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="cart-container">
        <div className="cart-content">
          {/* Cart Title */}
          <div className="cart-header">
            <h1 className="cart-title">Shopping Cart</h1>
          </div>

          {cart && cart.items && cart.items.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="cart-items-section">
                {cart.items.map((item: any) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    loading={loading}
                  />
                ))}
              </div>

              {/* Cart Actions */}
              <div className="cart-actions">
                <div className="cart-select-all">
                  <button className="select-all-btn">
                    <div className="checkbox-icon">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.5 0H1.5C0.671573 0 0 0.671573 0 1.5V16.5C0 17.3284 0.671573 18 1.5 18H16.5C17.3284 18 18 17.3284 18 16.5V1.5C18 0.671573 17.3284 0 16.5 0ZM16.5 16.5H1.5V1.5H16.5V16.5Z"
                          fill="#171412"
                        />
                      </svg>
                    </div>
                  </button>
                  <div className="cart-summary-info">
                    <div className="items-count">{cart.items.length} items</div>
                    <div className="subtotal-text">
                      Subtotal: ${formatMoney(cart?.subtotal)}
                    </div>
                  </div>
                </div>
                <button className="save-for-later-btn">Save for later</button>
              </div>

              {/* Coupon Code */}
              <div className="coupon-section">
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="apply-coupon-btn"
                    disabled={!couponCode.trim() || loading}
                  >
                    Apply
                  </button>
                </div>
                {cart.couponDiscount && cart.couponDiscount > 0 && (
                  <div className="coupon-applied">
                    <span>
                      Coupon "{cart.couponCode}" applied: -$
                      {cart.couponDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              <CartSummary
                cartData={{
                  ...cart,
                  subtotal: cart.totalPrice,
                  tax: 0,
                  shipping: 15000,
                  total: (cart.totalPrice || 0) + 15000,
                }}
                onProceedToCheckout={handleProceedToCheckout}
              />

              {/* Continue Shopping */}
              <div className="continue-shopping">
                <button
                  onClick={handleContinueShopping}
                  className="continue-shopping-btn"
                >
                  ← Continue Shopping
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <div className="empty-cart-content">
                <div className="empty-cart-icon">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 8C8 5.79086 9.79086 4 12 4H52C54.2091 4 56 5.79086 56 8V56C56 58.2091 54.2091 60 52 60H12C9.79086 60 8 58.2091 8 56V8Z"
                      fill="#F5F2F0"
                    />
                    <path
                      d="M24 24H40M24 32H36M24 40H32"
                      stroke="#8A7361"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h2>Your cart is empty</h2>
                <p>Add some books to get started!</p>
                <button
                  onClick={handleContinueShopping}
                  className="shop-now-btn"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
