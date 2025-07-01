import React, { useEffect, useState } from "react";
import {
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  X,
  Users,
} from "lucide-react";
import { UserDTO, CreateUserRequest, UpdateUserRequest } from "./types/User";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  toggleUserStatus,
} from "./services/userService";
import UserDataTable from "./components/UserDataTable";
import UserForm from "./components/UserForm";
import UserDetailModal from "./components/UserDetailModal";
import ConfirmDialog from "./components/ConfirmDialog";
import "./UsersPage.css";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    admins: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        fetchUsers();
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

  const calculateStats = (userList: UserDTO[]) => {
    setStats({
      total: userList.length,
      active: userList.filter((user) => user.isActive).length,
      admins: userList.filter((user) => user.role === "ADMIN").length,
    });
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      // Handle both paginated and non-paginated responses
      let userList: UserDTO[] = [];
      if (Array.isArray(response)) {
        userList = response;
      } else if (response.data && Array.isArray(response.data)) {
        userList = response.data;
      }

      setUsers(userList);
      calculateStats(userList);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      showToast("error", error.message || "Không thể tải danh sách người dùng");
      setUsers([]);
      setStats({ total: 0, active: 0, admins: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchUsers();
      return;
    }

    setLoading(true);
    try {
      const response = await searchUsers(searchQuery);
      const userList = Array.isArray(response) ? response : [];
      setUsers(userList);
      calculateStats(userList);
    } catch (error: any) {
      console.error("Error searching users:", error);
      showToast("error", error.message || "Không thể tìm kiếm người dùng");
      setUsers([]);
      setStats({ total: 0, active: 0, admins: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: UserDTO) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (user: UserDTO) => {
    setSelectedUser(user);
    setIsConfirmOpen(true);
  };

  const handleViewDetail = (user: UserDTO) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const handleToggleStatus = async (user: UserDTO) => {
    setToggleLoading(user.id);
    try {
      await toggleUserStatus(user.id, !user.isActive);
      showToast(
        "success",
        `${user.isActive ? "Khóa" : "Kích hoạt"} tài khoản thành công`,
      );
      fetchUsers();
    } catch (error: any) {
      console.error("Error toggling user status:", error);
      showToast(
        "error",
        error.message || "Không thể thay đổi trạng thái tài khoản",
      );
    } finally {
      setToggleLoading(null);
    }
  };

  const handleSaveUser = async (
    userData: CreateUserRequest | UpdateUserRequest,
  ) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, userData as UpdateUserRequest);
        showToast("success", "Cập nhật người dùng thành công");
      } else {
        await createUser(userData as CreateUserRequest);
        showToast("success", "Thêm người dùng mới thành công");
      }
      setIsFormOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error("Error saving user:", error);
      showToast("error", error.message || "Không thể lưu thông tin người dùng");
      throw error; // Re-throw to keep form open
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setDeleteLoading(true);
    try {
      await deleteUser(selectedUser.id);
      showToast("success", "Xóa người dùng thành công");
      setIsConfirmOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error("Error deleting user:", error);
      showToast("error", error.message || "Không thể xóa người dùng");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    fetchUsers();
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Quản lý người dùng</h1>
          <p className="page-subtitle">
            Quản lý danh sách người dùng trong hệ thống
          </p>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "spinning" : ""} />
            Làm mới
          </button>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={16} />
            Thêm người dùng
          </button>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Tổng người dùng</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.active}</div>
              <div className="stat-label">Đang hoạt động</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon admin">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.admins}</div>
              <div className="stat-label">Quản trị viên</div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content">
        <UserDataTable
          data={users}
          loading={loading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetail={handleViewDetail}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      <UserForm
        open={isFormOpen}
        user={selectedUser}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveUser}
      />

      <UserDetailModal
        open={isDetailOpen}
        user={selectedUser}
        onClose={() => setIsDetailOpen(false)}
      />

      <ConfirmDialog
        open={isConfirmOpen}
        title="Xác nhận xóa người dùng"
        content={`Bạn có chắc chắn muốn xóa người dùng "${selectedUser?.name}"? Hành động này không thể hoàn tác.`}
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

export default UsersPage;
