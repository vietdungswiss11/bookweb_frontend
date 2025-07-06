import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  Search,
  Package,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import {
  OrderDTO,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
} from "../types/Order";
import "./OrderDataTable.css";

interface OrderDataTableProps {
  data: OrderDTO[];
  loading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onViewDetail: (order: OrderDTO) => void;
  onUpdateStatus: (order: OrderDTO) => void;
  onDelete: (order: OrderDTO) => void;
}

const OrderDataTable: React.FC<OrderDataTableProps> = ({
  data,
  loading = false,
  searchQuery = "",
  onSearchChange,
  onViewDetail,
  onUpdateStatus,
  onDelete,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      PENDING: "status-pending",
      CONFIRMED: "status-confirmed",
      PROCESSING: "status-processing",
      SHIPPED: "status-shipped",
      DELIVERED: "status-delivered",
      CANCELLED: "status-cancelled",
      REFUNDED: "status-refunded",
    };

    return (
      <span
        className={`status-badge ${statusClasses[status] || "status-default"}`}
      >
        {ORDER_STATUS_LABELS[status as keyof typeof ORDER_STATUS_LABELS] ||
          status}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      PENDING: "payment-pending",
      PAID: "payment-paid",
      FAILED: "payment-failed",
      REFUNDED: "payment-refunded",
    };

    return (
      <span
        className={`payment-badge ${statusClasses[status] || "payment-default"}`}
      >
        {PAYMENT_STATUS_LABELS[status as keyof typeof PAYMENT_STATUS_LABELS] ||
          status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="order-table-container">
        <div className="order-table-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-table-container">
      {onSearchChange && (
        <div className="order-table-header">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, email..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      <div className="order-table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="order-code">
                      <Package size={16} />
                      <span>{order.id}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">
                        <User size={14} />
                        {order.userDTO ? order.userDTO.name : <span style={{ color: '#aaa' }}>Không có</span>}
                      </div>
                      <div className="customer-contact">
                        <small>{order.userDTO ? order.userDTO.email : ''}</small>
                        <small>{order.userDTO ? order.userDTO.phoneNumber : ''}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="order-amount">
                      
                      <span className="amount">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    {order.paymentDTO ? (
                      <>
                        <span>{order.paymentDTO.paymentMethod?.toUpperCase() || ''}</span>
                        <span style={{ marginLeft: 8 }}>{getPaymentStatusBadge(order.paymentDTO.status)}</span>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    <div className="order-date">
                      <Calendar size={14} />
                      <span>{order.orderDate ? formatDate(order.orderDate) : '-'}</span>
                      <small>{order.orderDate ? formatDateTime(order.orderDate) : ''}</small>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn view"
                        onClick={() => onViewDetail(order)}
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => onUpdateStatus(order)}
                        title="Cập nhật trạng thái"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => onDelete(order)}
                        title="Xóa đơn hàng"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDataTable;
