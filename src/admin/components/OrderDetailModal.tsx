import React from "react";
import {
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  Calendar,
  FileText,
  Truck,
} from "lucide-react";
import {
  OrderDTO,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
} from "../types/Order";
import "./OrderDetailModal.css";

interface OrderDetailModalProps {
  open: boolean;
  order: OrderDTO | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  open,
  order,
  onClose,
}) => {
  if (!open || !order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "Chưa có thông tin";
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      PENDING: { bg: "#fef3c7", text: "#92400e" },
      CONFIRMED: { bg: "#dbeafe", text: "#1e40af" },
      PROCESSING: { bg: "#e0e7ff", text: "#3730a3" },
      SHIPPED: { bg: "#fce7f3", text: "#be185d" },
      DELIVERED: { bg: "#dcfce7", text: "#166534" },
      CANCELLED: { bg: "#fef2f2", text: "#dc2626" },
      REFUNDED: { bg: "#f3f4f6", text: "#374151" },
    };
    return colors[status] || colors.PENDING;
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      PENDING: { bg: "#fef3c7", text: "#92400e" },
      PAID: { bg: "#dcfce7", text: "#166534" },
      FAILED: { bg: "#fef2f2", text: "#dc2626" },
      REFUNDED: { bg: "#f3f4f6", text: "#374151" },
    };
    return colors[status] || colors.PENDING;
  };

  const statusColor = getStatusColor(order.status || "Không rõ");
  const paymentColor = getPaymentStatusColor(order.paymentDTO?.status || "Không rõ");

  return (
    <div className="modal-overlay">
      <div className="modal-content order-detail-modal">
        <div className="modal-header">
          <div className="order-header-info">
            <h2>Chi tiết đơn hàng</h2>
            <div className="order-code-large">
              <Package size={20} />
              {order.orderNumber || order.id}
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="order-detail-content">
          <div className="order-status-section">
            <div className="status-cards">
              <div className="status-card">
                <div className="status-label">Trạng thái đơn hàng</div>
                <div
                  className="status-value"
                  style={{
                    backgroundColor: statusColor.bg,
                    color: statusColor.text,
                  }}
                >
                  {order.status || "Không rõ"}
                </div>
              </div>
              <div className="status-card">
                <div className="status-label">Trạng thái thanh toán</div>
                <div
                  className="status-value"
                  style={{
                    backgroundColor: paymentColor.bg,
                    color: paymentColor.text,
                  }}
                >
                  {order.paymentDTO?.status || "Không rõ"}
                </div>
              </div>
              <div className="status-card">
                <div className="status-label">Phương thức thanh toán</div>
                <div className="status-value">
                  {order.paymentDTO?.paymentMethod || "Không rõ"}
                </div>
              </div>
            </div>
          </div>

          <div className="order-detail-grid">
            <div className="detail-section">
              <h3>
                <User size={18} />
                Thông tin khách hàng
              </h3>
              <div className="customer-details">
                <div className="detail-row">
                  <span className="label">Họ tên:</span>
                  <span className="value">{order.userDTO?.name || "Không có"}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span className="value">{order.userDTO?.email || ""}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Số điện thoại:</span>
                  <span className="value">{order.userDTO?.phoneNumber || ""}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>
                <Truck size={18} />
                Địa chỉ giao hàng
              </h3>
              <div className="shipping-details">
                <div className="detail-row">
                  <span className="label">Người nhận:</span>
                  <span className="value">{order.addressDTO?.recipientName || ""}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Số điện thoại:</span>
                  <span className="value">{order.addressDTO?.phoneNumber || ""}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Địa chỉ:</span>
                  <span className="value">{order.addressDTO?.addressLine || ""}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>
                <Truck size={18} />
                Đơn vị vận chuyển
              </h3>
              <div className="shipping-provider-details">
                <div className="detail-row">
                  <span className="label">Đơn vị:</span>
                  <span className="value">{order.shippingDTO?.shippingProvider || ""}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Mã vận đơn:</span>
                  <span className="value">{order.shippingDTO?.shippingCode || ""}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Trạng thái:</span>
                  <span className="value">{order.shippingDTO?.status || ""}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>
                <Calendar size={18} />
                Thời gian
              </h3>
              <div className="timeline-details">
                <div className="detail-row">
                  <span className="label">Ngày tạo:</span>
                  <span className="value">
                    {formatDateTime(order.orderDate)}
                  </span>
                </div>
                {order.confirmedAt && (
                  <div className="detail-row">
                    <span className="label">Ngày xác nhận:</span>
                    <span className="value">
                      {formatDateTime(order.confirmedAt)}
                    </span>
                  </div>
                )}
                {order.shippedAt && (
                  <div className="detail-row">
                    <span className="label">Ngày giao vận:</span>
                    <span className="value">
                      {formatDateTime(order.shippedAt)}
                    </span>
                  </div>
                )}
                {order.deliveredAt && (
                  <div className="detail-row">
                    <span className="label">Ngày giao hàng:</span>
                    <span className="value">
                      {formatDateTime(order.deliveredAt)}
                    </span>
                  </div>
                )}
                {order.cancelledAt && (
                  <div className="detail-row">
                    <span className="label">Ngày hủy:</span>
                    <span className="value">
                      {formatDateTime(order.cancelledAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h3>
                <CreditCard size={18} />
                Thanh toán
              </h3>
              <div className="payment-summary">
                <div className="detail-row">
                  <span className="label">Tạm tính:</span>
                  <span className="value">
                    {formatCurrency(order.subtotal ?? 0)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Phí vận chuyển:</span>
                  <span className="value">
                    {formatCurrency(order.shippingFee ?? order.shippingDTO?.shippingFee ?? 0)}
                  </span>
                </div>
                {order.discount && order.discount > 0 && (
                  <div className="detail-row">
                    <span className="label">Giảm giá:</span>
                    <span className="value discount">
                      -{formatCurrency(order.discount)}
                    </span>
                  </div>
                )}
                <div className="detail-row total">
                  <span className="label">Tổng tiền:</span>
                  <span className="value">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="items-section">
            <h3>
              <Package size={18} />
              Sản phẩm đã đặt ({order.orderItems.length} sản phẩm)
            </h3>
            <div className="items-list">
              {order.orderItems.map((item, index) => (
                <div key={index} className="item-card">
                  <div className="item-image">
                    {item.book.images && item.book.images.length > 0 ? (
                      <img src={item.book.images[0]} alt={item.book.title} />
                    ) : item.book.imageUrl ? (
                      <img src={item.book.imageUrl} alt={item.book.title} />
                    ) : (
                      <div className="no-image">📚</div>
                    )}
                  </div>
                  <div className="item-info">
                    <h4 className="item-title">{item.book.title}</h4>
                    <p className="item-author">Tác giả: {item.book.author || ""}</p>
                    <div className="item-details">
                      <span className="item-price">
                        {formatCurrency(item.price)}
                      </span>
                      <span className="item-quantity">x {item.quantity}</span>
                      <span className="item-total">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(order.notes || order.cancelReason) && (
            <div className="notes-section">
              <h3>
                <FileText size={18} />
                Ghi chú
              </h3>
              {order.notes && (
                <div className="note-item">
                  <span className="note-label">Ghi chú đơn hàng:</span>
                  <p className="note-content">{order.notes}</p>
                </div>
              )}
              {order.cancelReason && (
                <div className="note-item">
                  <span className="note-label">Lý do hủy:</span>
                  <p className="note-content">{order.cancelReason}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
