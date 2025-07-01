import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle, Package } from "lucide-react";
import {
  OrderDTO,
  OrderStatus,
  UpdateOrderStatusRequest,
  ORDER_STATUS_LABELS,
} from "../types/Order";
import "./StatusUpdateModal.css";

interface StatusUpdateModalProps {
  open: boolean;
  order: OrderDTO | null;
  onClose: () => void;
  onSave: (id: number, data: UpdateOrderStatusRequest) => Promise<void>;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  open,
  order,
  onClose,
  onSave,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("PENDING");
  const [notes, setNotes] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
      setNotes("");
      setCancelReason("");
      setError("");
    }
  }, [order, open]);

  const getAvailableStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
    const statusFlow: Record<OrderStatus, OrderStatus[]> = {
      PENDING: ["CONFIRMED", "CANCELLED"],
      CONFIRMED: ["PROCESSING", "CANCELLED"],
      PROCESSING: ["SHIPPED", "CANCELLED"],
      SHIPPED: ["DELIVERED", "CANCELLED"],
      DELIVERED: ["REFUNDED"],
      CANCELLED: [],
      REFUNDED: [],
    };

    return [currentStatus, ...(statusFlow[currentStatus] || [])];
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      PENDING: "#92400e",
      CONFIRMED: "#1e40af",
      PROCESSING: "#3730a3",
      SHIPPED: "#be185d",
      DELIVERED: "#166534",
      CANCELLED: "#dc2626",
      REFUNDED: "#374151",
    };
    return colors[status];
  };

  const validateForm = (): boolean => {
    if (!selectedStatus) {
      setError("Vui lòng chọn trạng thái");
      return false;
    }

    if (selectedStatus === "CANCELLED" && !cancelReason.trim()) {
      setError("Vui lòng nhập lý do hủy đơn hàng");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!order || !validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const updateData: UpdateOrderStatusRequest = {
        status: selectedStatus,
        notes: notes.trim() || undefined,
        cancelReason:
          selectedStatus === "CANCELLED" ? cancelReason.trim() : undefined,
      };

      await onSave(order.id, updateData);
      onClose();
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Không thể cập nhật trạng thái đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const isStatusChanged = order && selectedStatus !== order.status;
  const availableStatuses = order ? getAvailableStatuses(order.status) : [];

  if (!open || !order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content status-update-modal">
        <div className="modal-header">
          <div className="modal-title-section">
            <h2>Cập nhật trạng thái đơn hàng</h2>
            <div className="order-info">
              <Package size={16} />
              <span>{order.orderCode}</span>
              <span className="separator">•</span>
              <span>{order.customer.name}</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="status-update-form">
          <div className="current-status-section">
            <div className="current-status">
              <span className="label">Trạng thái hiện tại:</span>
              <span
                className="status-badge current"
                style={{
                  backgroundColor: `${getStatusColor(order.status)}20`,
                  color: getStatusColor(order.status),
                }}
              >
                {ORDER_STATUS_LABELS[order.status]}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Trạng thái mới *</label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
              className={error && !selectedStatus ? "error" : ""}
            >
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {ORDER_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
            {isStatusChanged && (
              <div className="status-preview">
                <span className="arrow">→</span>
                <span
                  className="status-badge preview"
                  style={{
                    backgroundColor: `${getStatusColor(selectedStatus)}20`,
                    color: getStatusColor(selectedStatus),
                  }}
                >
                  {ORDER_STATUS_LABELS[selectedStatus]}
                </span>
              </div>
            )}
          </div>

          {selectedStatus === "CANCELLED" && (
            <div className="form-group">
              <label htmlFor="cancelReason">Lý do hủy đơn hàng *</label>
              <textarea
                id="cancelReason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className={
                  error &&
                  selectedStatus === "CANCELLED" &&
                  !cancelReason.trim()
                    ? "error"
                    : ""
                }
                placeholder="Nhập lý do hủy đơn hàng..."
                rows={3}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="notes">Ghi chú (tùy chọn)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thêm ghi chú về việc cập nhật trạng thái..."
              rows={3}
            />
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="status-info">
            <div className="info-title">Thông tin cập nhật:</div>
            <ul className="info-list">
              {selectedStatus === "CONFIRMED" && (
                <li>Đơn hàng sẽ được xác nhận và chuyển sang xử lý</li>
              )}
              {selectedStatus === "PROCESSING" && (
                <li>Đơn hàng đang được chuẩn bị và đóng gói</li>
              )}
              {selectedStatus === "SHIPPED" && (
                <li>Đơn hàng đã được giao cho đơn vị vận chuyển</li>
              )}
              {selectedStatus === "DELIVERED" && (
                <li>Đơn hàng đã được giao thành công cho khách hàng</li>
              )}
              {selectedStatus === "CANCELLED" && (
                <li className="warning">
                  Đơn hàng sẽ bị hủy và không thể hoàn tác
                </li>
              )}
              {selectedStatus === "REFUNDED" && (
                <li>Đơn hàng đã được hoàn tiền cho khách hàng</li>
              )}
            </ul>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !isStatusChanged}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Cập nhật trạng thái
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
