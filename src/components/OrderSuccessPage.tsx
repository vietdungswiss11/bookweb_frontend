import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderSuccessPage.css";
import Header from "./Header";
import Footer from "./Footer";
import { getOrderById, OrderResponse } from "../services/orderService";

const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrder(orderId);
    }
  }, [orderId]);

  const loadOrder = async (id: string) => {
    try {
      const orderData = await getOrderById(id);
      setOrder(orderData);
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodText = (method: string): string => {
    switch (method) {
      case "cod":
        return "Thanh toán khi nhận hàng (COD)";
      case "momo":
        return "Ví MoMo";
      case "vnpay":
        return "VNPAY";
      case "manual":
        return "Chuyển khoản ngân hàng";
      default:
        return method;
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "PAID":
        return "Đã thanh toán";
      case "SHIPPED":
        return "Đang giao hàng";
      case "DELIVERED":
        return "Đã giao hàng";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "PENDING":
        return "#f59e0b";
      case "CONFIRMED":
        return "#3b82f6";
      case "PAID":
        return "#10b981";
      case "SHIPPED":
        return "#8b5cf6";
      case "DELIVERED":
        return "#059669";
      case "CANCELLED":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  if (loading) {
    return (
      <div className="order-success-page">
        <Header />
        <div className="order-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-success-page">
        <Header />
        <div className="order-not-found">
          <h2>Không tìm thấy đơn hàng</h2>
          <p>Đơn hàng bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <button onClick={() => navigate("/")} className="back-home-btn">
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <Header />

      <div className="order-success-container">
        <div className="order-success-content">
          {/* Success Icon and Message */}
          <div className="success-header">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#10b981" />
                <path
                  d="M20 32L28 40L44 24"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="success-title">Đặt hàng thành công!</h1>
            <p className="success-message">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng trong thời
              gian sớm nhất.
            </p>
          </div>

          {/* Order Details */}
          <div className="order-details">
            <div className="order-info-section">
              <h2>Thông tin đơn hàng</h2>
              <div className="order-info-grid">
                <div className="info-item">
                  <span className="info-label">Mã đơn hàng:</span>
                  <span className="info-value order-id">#{order.id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ngày đặt:</span>
                  <span className="info-value">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Trạng thái:</span>
                  <span
                    className="info-value status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phương thức thanh toán:</span>
                  <span className="info-value">
                    {getPaymentMethodText(order.paymentMethod)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Tổng tiền:</span>
                  <span className="info-value total-amount">
                    {order.totalAmount.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            {order.paymentMethod === "manual" && order.status === "PENDING" && (
              <div className="payment-instructions">
                <h3>Hướng dẫn thanh toán</h3>
                <div className="bank-transfer-info">
                  <p>Vui lòng chuyển khoản theo thông tin sau:</p>
                  <div className="bank-details">
                    <p>
                      <strong>Ngân hàng:</strong> Vietcombank (VCB)
                    </p>
                    <p>
                      <strong>Số tài khoản:</strong> 1234567890
                    </p>
                    <p>
                      <strong>Chủ tài khoản:</strong> CÔNG TY TNHH BOOKSTORE
                    </p>
                    <p>
                      <strong>Số tiền:</strong>{" "}
                      {order.totalAmount.toLocaleString("vi-VN")} đ
                    </p>
                    <p>
                      <strong>Nội dung:</strong> #{order.id} - [Họ tên của bạn]
                    </p>
                  </div>
                  <div className="qr-code-section">
                    <p>Ho���c quét mã QR để chuyển khoản:</p>
                    <div className="qr-code-placeholder">
                      <svg
                        width="150"
                        height="150"
                        viewBox="0 0 150 150"
                        fill="none"
                      >
                        <rect
                          width="150"
                          height="150"
                          fill="#f0f0f0"
                          stroke="#ddd"
                          strokeWidth="1"
                        />
                        <text
                          x="75"
                          y="80"
                          textAnchor="middle"
                          fontSize="14"
                          fill="#666"
                        >
                          QR Code
                        </text>
                      </svg>
                    </div>
                  </div>
                  <p className="payment-note">
                    Sau khi chuyển khoản, đơn hàng sẽ được xác nhận trong vòng
                    24 giờ.
                  </p>
                </div>
              </div>
            )}

            {order.paymentMethod === "cod" && (
              <div className="cod-instructions">
                <h3>Thông tin giao hàng</h3>
                <p>
                  Đơn hàng sẽ được giao đến địa chỉ của bạn trong 2-3 ngày làm
                  việc.
                </p>
                <p>Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng.</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="order-actions">
            <button
              onClick={() => navigate("/account")}
              className="view-orders-btn"
            >
              Xem đơn hàng của tôi
            </button>
            <button
              onClick={() => navigate("/")}
              className="continue-shopping-btn"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
