import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { useCartApi } from "../hooks/useCartApi";
import { createOrder, OrderRequest } from "../services/orderService";
import AuthModal from "./AuthModal";
import { getAddresses, AddressPayload } from "../services/addressService";

interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { cart, loading, fetchCart } = useCartApi(userId || "");

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [bankType, setBankType] = useState("momo");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<AddressPayload[]>([]);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      fetchCart();
      getAddresses(userId).then(data => {
        setAddresses(data);
        setSelectedAddressIdx(0);
      });
    }
  }, [fetchCart, userId]);

  if (!userId) {
    return <AuthModal open={true} onClose={() => navigate("/")} />;
  }

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof ShippingAddress)[] = [
      "fullName",
      "phone",
      "address",
      "city",
    ];

    for (const field of requiredFields) {
      if (!shippingAddress[field].trim()) {
        setOrderError(`Vui lòng nhập ${getFieldLabel(field)}`);
        return false;
      }
    }

    if (!/^[0-9]{10,11}$/.test(shippingAddress.phone.replace(/\s/g, ""))) {
      setOrderError("Số điện thoại không hợp lệ");
      return false;
    }

    return true;
  };

  const getFieldLabel = (field: keyof ShippingAddress): string => {
    const labels = {
      fullName: "họ tên",
      phone: "số điện thoại",
      address: "địa chỉ",
      city: "thành phố",
      district: "quận/huyện",
      ward: "phường/xã",
    };
    return labels[field];
  };

  const handlePlaceOrder = async () => {
    setOrderError(null);

    if (!cart || !cart.items || cart.items.length === 0) {
      setOrderError("Giỏ hàng trống");
      return;
    }

    if (addresses.length === 0) {
      setOrderError("Bạn cần thêm địa chỉ giao hàng trong tài khoản!");
      return;
    }

    setOrderLoading(true);

    try {
      const finalPaymentMethod =
        paymentMethod === "bank" ? bankType : paymentMethod;

      const selectedAddress = addresses[selectedAddressIdx];

      const orderData: OrderRequest = {
        userId: userId!,
        paymentMethod: finalPaymentMethod,
        shippingAddress: {
          fullName: selectedAddress.recipientName,
          phone: selectedAddress.phoneNumber,
          address: selectedAddress.addressLine,
          city: "",
          district: "",
          ward: "",
        },
        items: cart.items.map((item: any) => ({
          bookId: item.book.id,
          quantity: item.quantity,
          price: item.book.discountPrice,
        })),
        totalAmount: (cart.totalPrice || 0) + 15000, // Add shipping fee
        shippingFee: 15000,
        couponCode: cart.couponCode,
        couponDiscount: cart.couponDiscount || 0,
      };

      const orderResponse = await createOrder(orderData);

      // Handle different payment methods
      if (finalPaymentMethod === "momo" || finalPaymentMethod === "vnpay") {
        if (orderResponse.paymentUrl) {
          // Redirect to payment gateway
          window.location.href = orderResponse.paymentUrl;
        } else {
          setOrderError("Không thể tạo liên kết thanh toán. Vui lòng thử lại.");
        }
      } else {
        // COD or manual bank transfer - redirect to success page
        navigate(`/order-success/${orderResponse.id}`);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      setOrderError("Đặt hàng thất bại. Vui lòng thử lại sau.");
    } finally {
      setOrderLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Giỏ hàng", href: "/cart" },
    { label: "Thanh toán" },
  ];

  const shippingFee = 15000;
  const total = (cart?.totalPrice || 0) + shippingFee;

  if (loading && !cart) {
    return (
      <div className="checkout-page">
        <Header />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="checkout-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <Header />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="empty-cart-checkout">
          <h2>Giỏ hàng trống</h2>
          <p>Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
          <button onClick={() => navigate("/")} className="back-to-shop-btn">
            Quay lại mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="checkout-container">
        <div className="checkout-content">
          <h1 className="checkout-title">Thanh toán đơn hàng</h1>

          <div className="checkout-sections">
            {/* Shipping Address Section */}
            <div className="checkout-section">
              <h2 className="section-title">Chọn địa chỉ giao hàng</h2>
              {addresses.length === 0 ? (
                <div>Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ trong trang cá nhân.</div>
              ) : (
                <div className="address-list">
                  {addresses.map((addr, idx) => (
                    <label key={idx} style={{ display: 'block', marginBottom: 8 }}>
                      <input
                        type="radio"
                        name="shippingAddress"
                        value={idx}
                        checked={selectedAddressIdx === idx}
                        onChange={() => setSelectedAddressIdx(idx)}
                      />
                      {addr.recipientName} - {addr.phoneNumber} - {addr.addressLine}
                    </label>
                  ))}
                  <button onClick={() => navigate('/account/addresses')} style={{ marginTop: 8 }}>
                    Quản lý địa chỉ
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method Section */}
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              bankType={bankType}
              onBankTypeChange={setBankType}
            />

            {/* Order Summary Section */}
            <div className="checkout-section">
              <h2 className="section-title">Thông tin đơn hàng</h2>
              <div className="order-items">
                {cart.items.map((item: any) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img
                        src={item.book.images?.[0]?.url || "/default-book.png"}
                        alt={item.book.title}
                      />
                    </div>
                    <div className="item-info">
                      <h4 className="item-title">{item.book.title}</h4>
                      <p className="item-author">Tác giả: {item.book.author}</p>
                      <div className="item-quantity">
                        Số lượng: {item.quantity}
                      </div>
                    </div>
                    <div className="item-price">
                      {(item.book.discountPrice * item.quantity).toLocaleString(
                        "vi-VN",
                      )}{" "}
                      đ
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Tạm tính:</span>
                  <span>{cart.totalPrice?.toLocaleString("vi-VN")} đ</span>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span>{shippingFee.toLocaleString("vi-VN")} đ</span>
                </div>
                {cart.couponDiscount && cart.couponDiscount > 0 && (
                  <div className="summary-row discount">
                    <span>Giảm giá ({cart.couponCode}):</span>
                    <span>
                      -{cart.couponDiscount.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                )}
                <div className="summary-total">
                  <span>Tổng cộng:</span>
                  <span>{total.toLocaleString("vi-VN")} đ</span>
                </div>
              </div>
            </div>

            {/* Order Error */}
            {orderError && (
              <div className="order-error">
                <p>{orderError}</p>
              </div>
            )}

            {/* Place Order Button */}
            <div className="place-order-section">
              <button
                onClick={handlePlaceOrder}
                disabled={orderLoading}
                className="place-order-btn"
              >
                {orderLoading ? "Đang xử lý..." : "Đặt hàng"}
              </button>

              <p className="order-note">
                Bằng cách đặt hàng, bạn đồng ý với{" "}
                <a href="/terms">Điều khoản sử dụng</a> và{" "}
                <a href="/privacy">Chính sách bảo mật</a> của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
