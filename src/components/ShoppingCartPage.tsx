import React, { useState, useEffect } from "react";
import "./ShoppingCartPage.css";
import Breadcrumbs from "./Breadcrumbs";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export interface CartItemData {
  id: string;
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
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

interface ShoppingCartPageProps {
  userId?: string;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({ userId }) => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // Sample cart data - in real app this would come from API
  const sampleCartData: CartData = {
    items: [
      {
        id: "1",
        book: {
          id: "book-1",
          title: "Dune",
          author: "Frank Herbert",
          price: 14.99,
          image: "https://placehold.co/70x93/8b7355/8b7355",
        },
        quantity: 1,
        totalPrice: 14.99,
      },
      {
        id: "2",
        book: {
          id: "book-2",
          title: "1984",
          author: "George Orwell",
          price: 9.99,
          image: "https://placehold.co/70x93/7a6b5d/7a6b5d",
        },
        quantity: 1,
        totalPrice: 9.99,
      },
      {
        id: "3",
        book: {
          id: "book-3",
          title: "Fahrenheit 451",
          author: "Ray Bradbury",
          price: 12.99,
          image: "https://placehold.co/70x93/9c8a7a/9c8a7a",
        },
        quantity: 1,
        totalPrice: 12.99,
      },
    ],
    subtotal: 37.97,
    tax: 3.0,
    shipping: 0,
    total: 40.97,
  };

  useEffect(() => {
    // Simulate API call to get cart data
    setLoading(true);
    setTimeout(() => {
      setCartData(sampleCartData);
      setLoading(false);
    }, 500);
  }, [sampleCartData]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (!cartData) return;

    // Simulate API call to update quantity
    setLoading(true);

    // Update local state immediately for better UX
    const updatedItems = cartData.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.book.price * newQuantity,
        };
      }
      return item;
    });

    const newSubtotal = updatedItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    const newTax = newSubtotal * 0.08; // 8% tax
    const newTotal = newSubtotal + newTax + cartData.shipping;

    setTimeout(() => {
      setCartData({
        ...cartData,
        items: updatedItems,
        subtotal: newSubtotal,
        tax: newTax,
        total: newTotal,
      });
      setLoading(false);
    }, 300);
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!cartData) return;

    setLoading(true);

    // Remove item from cart
    const updatedItems = cartData.items.filter((item) => item.id !== itemId);
    const newSubtotal = updatedItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    const newTax = newSubtotal * 0.08;
    const newTotal = newSubtotal + newTax + cartData.shipping;

    setTimeout(() => {
      setCartData({
        ...cartData,
        items: updatedItems,
        subtotal: newSubtotal,
        tax: newTax,
        total: newTotal,
      });
      setLoading(false);
    }, 300);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || !cartData) return;

    setLoading(true);

    // Simulate coupon validation
    setTimeout(() => {
      let discount = 0;
      if (couponCode.toLowerCase() === "save10") {
        discount = cartData.subtotal * 0.1; // 10% discount
      } else if (couponCode.toLowerCase() === "free5") {
        discount = 5; // $5 off
      }

      const newTotal =
        cartData.subtotal + cartData.tax + cartData.shipping - discount;

      setCartData({
        ...cartData,
        couponCode: discount > 0 ? couponCode : undefined,
        couponDiscount: discount,
        total: Math.max(0, newTotal),
      });
      setLoading(false);

      if (discount === 0) {
        alert("Invalid coupon code");
      }
    }, 500);
  };

  const handleProceedToCheckout = () => {
    // Navigate to checkout page
    console.log("Proceeding to checkout with cart:", cartData);
    // In real app: window.location.href = '/checkout' or router.push('/checkout')
  };

  const handleContinueShopping = () => {
    // Navigate back to product listing
    console.log("Continue shopping");
    // In real app: window.location.href = '/' or router.push('/')
  };

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shopping Cart" },
  ];

  if (loading && !cartData) {
    return (
      <div className="shopping-cart-page">
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
      <Breadcrumbs items={breadcrumbItems} />

      <div className="cart-container">
        <div className="cart-content">
          {/* Cart Title */}
          <div className="cart-header">
            <h1 className="cart-title">Shopping Cart</h1>
          </div>

          {cartData && cartData.items.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="cart-items-section">
                {cartData.items.map((item) => (
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
                    <div className="items-count">
                      {cartData.items.length} items
                    </div>
                    <div className="subtotal-text">
                      Subtotal: ${cartData.subtotal.toFixed(2)}
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
                {cartData.couponDiscount && cartData.couponDiscount > 0 && (
                  <div className="coupon-applied">
                    <span>
                      Coupon "{cartData.couponCode}" applied: -$
                      {cartData.couponDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              <CartSummary
                cartData={cartData}
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
    </div>
  );
};

export default ShoppingCartPage;
