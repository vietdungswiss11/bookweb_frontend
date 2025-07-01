import React from "react";
import { Eye, Edit, MoreHorizontal } from "lucide-react";
import { getRecentOrders } from "../services/mockData";
import "./RecentOrdersTable.css";

const RecentOrdersTable: React.FC = () => {
  const orders = getRecentOrders();

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "status-delivered";
      case "Đang xử lý":
        return "status-processing";
      case "Đã hủy":
        return "status-cancelled";
      default:
        return "status-processing";
    }
  };

  return (
    <div className="recent-orders-table">
      <div className="table-header">
        <div>
          <h3 className="table-title">Đơn hàng gần đây</h3>
          <p className="table-subtitle">Danh sách các đơn hàng mới nhất</p>
        </div>
        <button className="view-all-btn">Xem tất cả</button>
      </div>

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày tạo</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="table-row">
                <td className="order-id">#{order.id}</td>
                <td>
                  <div className="customer-info">
                    <div className="customer-avatar">
                      {order.customer.charAt(0)}
                    </div>
                    <span className="customer-name">{order.customer}</span>
                  </div>
                </td>
                <td className="order-date">{order.date}</td>
                <td className="order-amount">
                  {order.amount.toLocaleString("vi-VN")}₫
                </td>
                <td>
                  <span
                    className={`status-badge ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn view-btn"
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="action-btn edit-btn" title="Chỉnh sửa">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn more-btn" title="Thêm">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
