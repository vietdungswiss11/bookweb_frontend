import React from "react";
import {
  X,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  Shield,
  Clock,
  UserCheck,
} from "lucide-react";
import { UserDTO } from "../types/User";
import "./UserDetailModal.css";

interface UserDetailModalProps {
  open: boolean;
  user: UserDTO | null;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  open,
  user,
  onClose,
}) => {
  if (!open || !user) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Không có thông tin";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "Chưa đăng nhập";
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleInfo = (role: string) => {
    return role === "ADMIN"
      ? { label: "Quản trị viên", icon: Shield, color: "#f59e0b" }
      : { label: "Người dùng", icon: User, color: "#3b82f6" };
  };

  const getStatusInfo = (isActive: boolean) => {
    return isActive
      ? { label: "Hoạt động", color: "#10b981", bgColor: "#ecfdf5" }
      : { label: "Tạm khóa", color: "#ef4444", bgColor: "#fef2f2" };
  };

  const roleInfo = getRoleInfo(user.role);
  const statusInfo = getStatusInfo(user.isActive);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="modal-overlay">
      <div className="modal-content user-detail-modal">
        <div className="modal-header">
          <h2>Chi tiết người dùng</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="user-detail-content">
          <div className="user-detail-main">
            <div className="user-profile-section">
              <div className="user-avatar-large">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="no-avatar-placeholder">
                    <User size={48} />
                  </div>
                )}
              </div>

              <div className="user-basic-info">
                <h1 className="user-name">{user.name}</h1>
                <div className="user-meta">
                  <span className="user-id">ID: {user.id}</span>
                  <div
                    className="role-badge"
                    style={{
                      color: roleInfo.color,
                      backgroundColor: `${roleInfo.color}20`,
                    }}
                  >
                    <RoleIcon size={16} />
                    {roleInfo.label}
                  </div>
                  <div
                    className="status-badge"
                    style={{
                      color: statusInfo.color,
                      backgroundColor: statusInfo.bgColor,
                    }}
                  >
                    <UserCheck size={16} />
                    {statusInfo.label}
                  </div>
                </div>
              </div>
            </div>

            <div className="user-details-grid">
              <div className="detail-section">
                <h3>Thông tin liên hệ</h3>
                <div className="detail-items">
                  <div className="detail-item">
                    <div className="detail-label">
                      <Mail size={16} />
                      Email
                    </div>
                    <div className="detail-value">{user.email}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      <Phone size={16} />
                      Số điện thoại
                    </div>
                    <div className="detail-value">{user.phoneNumber}</div>
                  </div>

                  {user.address && (
                    <div className="detail-item">
                      <div className="detail-label">
                        <MapPin size={16} />
                        Địa chỉ
                      </div>
                      <div className="detail-value">{user.address}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h3>Thông tin cá nhân</h3>
                <div className="detail-items">
                  <div className="detail-item">
                    <div className="detail-label">
                      <Calendar size={16} />
                      Ngày sinh
                    </div>
                    <div className="detail-value">
                      {formatDate(user.dateOfBirth)}
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      <Calendar size={16} />
                      Ngày tạo tài khoản
                    </div>
                    <div className="detail-value">
                      {formatDate(user.createdAt)}
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      <Calendar size={16} />
                      Cập nhật lần cuối
                    </div>
                    <div className="detail-value">
                      {formatDate(user.updatedAt)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Hoạt động</h3>
                <div className="detail-items">
                  <div className="detail-item">
                    <div className="detail-label">
                      <Clock size={16} />
                      Đăng nhập lần cuối
                    </div>
                    <div className="detail-value">
                      {formatDateTime(user.lastLoginAt)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Trạng thái tài khoản</h3>
                <div className="account-status">
                  <div className="status-indicator">
                    <div
                      className="status-dot"
                      style={{ backgroundColor: statusInfo.color }}
                    ></div>
                    <span style={{ color: statusInfo.color }}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="status-description">
                    {user.isActive
                      ? "Tài khoản đang hoạt động bình thường và có thể truy cập hệ thống."
                      : "Tài khoản đã bị tạm khóa và không thể truy cập hệ thống."}
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default UserDetailModal;
