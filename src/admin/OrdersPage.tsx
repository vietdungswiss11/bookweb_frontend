import React, { useEffect, useState } from "react";
import {
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  X,
  Package,
  TrendingUp,
  Clock,
  DollarSign,
  Filter,
} from "lucide-react";
import {
  OrderDTO,
  UpdateOrderStatusRequest,
  OrderFilters,
  OrderStats,
  OrderStatus,
  PAYMENT_STATUS_LABELS,
  ORDER_STATUS_LABELS,
} from "./types/Order";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  searchOrders,
  getOrderStats,
} from "./services/orderService";
import OrderDataTable from "./components/OrderDataTable";
import OrderDetailModal from "./components/OrderDetailModal";
import StatusUpdateModal from "./components/StatusUpdateModal";
import ConfirmDialog from "./components/ConfirmDialog";
import "./OrdersPage.css";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<OrderFilters>({});
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0,
    todayOrders: 0,
  });

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        fetchOrders();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const showToast = (type: "success" | "error", message: string) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders({ filters });
      // Handle both paginated and non-paginated responses
      let orderList: OrderDTO[] = [];
      if (Array.isArray(response)) {
        orderList = response;
      } else if (response.data && Array.isArray(response.data)) {
        orderList = response.data;
      }

      setOrders(orderList);
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      showToast("error", error.message || "Không thể tải danh sách đơn hàng");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await getOrderStats();
      setStats(statsData);
    } catch (error: any) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchOrders();
      return;
    }

    setLoading(true);
    try {
      const response = await searchOrders(searchQuery);
      const orderList = Array.isArray(response) ? response : [];
      setOrders(orderList);
    } catch (error: any) {
      console.error("Error searching orders:", error);
      showToast("error", error.message || "Không thể tìm kiếm đơn hàng");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (order: OrderDTO) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (order: OrderDTO) => {
    setSelectedOrder(order);
    setIsStatusOpen(true);
  };

  const handleDelete = (order: OrderDTO) => {
    setSelectedOrder(order);
    setIsConfirmOpen(true);
  };

  const handleSaveStatus = async (
    id: number,
    data: UpdateOrderStatusRequest,
  ) => {
    try {
      await updateOrderStatus(id, data);
      showToast("success", "Cập nhật trạng thái đơn hàng thành công");
      setIsStatusOpen(false);
      fetchOrders();
      fetchStats();
    } catch (error: any) {
      console.error("Error updating order status:", error);
      showToast(
        "error",
        error.message || "Không thể cập nhật trạng thái đơn hàng",
      );
      throw error; // Re-throw to keep modal open
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrder) return;

    setDeleteLoading(true);
    try {
      await deleteOrder(selectedOrder.id);
      showToast("success", "Xóa đơn hàng thành công");
      setIsConfirmOpen(false);
      fetchOrders();
      fetchStats();
    } catch (error: any) {
      console.error("Error deleting order:", error);
      showToast("error", error.message || "Không thể xóa đơn hàng");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setFilters({});
    fetchOrders();
    fetchStats();
  };

  const handleFilterChange = (key: keyof OrderFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    // Trigger fetch with new filters
    setTimeout(() => fetchOrders(), 100);
  };

  const clearFilters = () => {
    setFilters({});
    fetchOrders();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(amount);
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Quản lý đơn hàng</h1>
          <p className="page-subtitle">
            Quản lý và theo dõi tất cả đơn hàng trong hệ thống
          </p>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Bộ lọc
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "spinning" : ""} />
            Làm mới
          </button>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Package size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Tổng đơn hàng</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon processing">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {stats.pending + stats.processing}
              </div>
              <div className="stat-label">Đang xử lý</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon delivered">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.delivered}</div>
              <div className="stat-label">Đã giao hàng</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon revenue">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <div className="stat-label">Doanh thu</div>
            </div>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Trạng thái đơn hàng</label>
              <select
                value={filters.status || ""}
                onChange={(e) =>
                  handleFilterChange("status", e.target.value || undefined)
                }
              >
                <option value="">Tất cả trạng thái</option>
                {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Trạng thái thanh toán</label>
              <select
                value={filters.paymentStatus || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "paymentStatus",
                    e.target.value || undefined,
                  )
                }
              >
                <option value="">Tất cả</option>
                {Object.entries(PAYMENT_STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Từ ngày</label>
              <input
                type="date"
                value={filters.startDate || ""}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value || undefined)
                }
              />
            </div>
            <div className="filter-group">
              <label>Đến ngày</label>
              <input
                type="date"
                value={filters.endDate || ""}
                onChange={(e) =>
                  handleFilterChange("endDate", e.target.value || undefined)
                }
              />
            </div>
            <div className="filter-actions">
              <button className="btn btn-secondary" onClick={clearFilters}>
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-content">
        <OrderDataTable
          data={orders}
          loading={loading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onViewDetail={handleViewDetail}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      </div>

      <OrderDetailModal
        open={isDetailOpen}
        order={selectedOrder}
        onClose={() => setIsDetailOpen(false)}
      />

      <StatusUpdateModal
        open={isStatusOpen}
        order={selectedOrder}
        onClose={() => setIsStatusOpen(false)}
        onSave={handleSaveStatus}
      />

      <ConfirmDialog
        open={isConfirmOpen}
        title="Xác nhận xóa đơn hàng"
        content={`Bạn có chắc chắn muốn xóa đơn hàng "${selectedOrder?.orderCode}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        loading={deleteLoading}
        variant="danger"
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div className="toast-content">
              <div className="toast-icon">
                {toast.type === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              <span className="toast-message">{toast.message}</span>
            </div>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
