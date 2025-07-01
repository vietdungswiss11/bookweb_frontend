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
              <th>Avatar</th>
              <th>Thông tin cá nhân</th>
              <th>Liên hệ</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Đăng nhập cuối</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <div className="no-avatar">
                          <UserIcon size={20} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <small className="user-id">ID: {user.id}</small>
                      {user.dateOfBirth && (
                        <small className="user-dob">
                          Sinh: {formatDate(user.dateOfBirth)}
                        </small>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="email">{user.email}</div>
                      <div className="phone">{user.phoneNumber}</div>
                      {user.address && (
                        <div className="address" title={user.address}>
                          {user.address.length > 30
                            ? `${user.address.substring(0, 30)}...`
                            : user.address}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>
                    <div className="status-cell">
                      {getStatusBadge(user.isActive)}
                      {onToggleStatus && (
                        <button
                          className="toggle-status-btn"
                          onClick={() => onToggleStatus(user)}
                          title={
                            user.isActive
                              ? "Khóa tài khoản"
                              : "Kích hoạt tài khoản"
                          }
                        >
                          {user.isActive ? (
                            <ToggleRight size={16} className="toggle-on" />
                          ) : (
                            <ToggleLeft size={16} className="toggle-off" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                  <td>{formatDateTime(user.lastLoginAt)}</td>
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
