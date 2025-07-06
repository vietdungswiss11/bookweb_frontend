import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  Search,
  Shield,
  User as UserIcon,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { UserDTO } from "../types/User";
import "./UserDataTable.css";

interface UserDataTableProps {
  data: UserDTO[];
  loading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onEdit: (user: UserDTO) => void;
  onDelete: (user: UserDTO) => void;
  onViewDetail: (user: UserDTO) => void;
  onToggleStatus?: (user: UserDTO) => void;
}

const UserDataTable: React.FC<UserDataTableProps> = ({
  data,
  loading = false,
  searchQuery = "",
  onSearchChange,
  onEdit,
  onDelete,
  onViewDetail,
  onToggleStatus,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const getRoleBadge = (role: string) => {
    return (
      <span className={`role-badge role-${role.toLowerCase()}`}>
        {role === "ADMIN" ? <Shield size={12} /> : <UserIcon size={12} />}
        {role === "ADMIN" ? "Quản trị" : "Người dùng"}
      </span>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
        {isActive ? "Hoạt động" : "Tạm khóa"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="user-table-container">
        <div className="user-table-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      {onSearchChange && (
        <div className="user-table-header">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Thông tin cá nhân</th>
              <th>Liên hệ</th>
              <th>Vai trò</th>
              <th>Đăng nhập cuối</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <small className="user-id">ID: {user.id}</small>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="email">{user.email}</div>
                      <div className="phone">{user.phoneNumber}</div>
                    </div>
                  </td>
                  <td>
                    {user.roles && user.roles.length > 0
                      ? user.roles.map((role: any, idx: number) => (
                        <span key={role.id} className="role-badge">
                          {role.name.replace("ROLE_", "")}
                          {idx < user.roles.length - 1 ? ", " : ""}
                        </span>
                      ))
                      : <span style={{ color: '#aaa' }}>Không rõ</span>}
                  </td>
                  <td>
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleString("vi-VN")
                      : "-"}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn view"
                        onClick={() => onViewDetail(user)}
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => onEdit(user)}
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => onDelete(user)}
                        title="Xóa"
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

export default UserDataTable;
