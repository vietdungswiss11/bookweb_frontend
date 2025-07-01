import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle, Eye, EyeOff } from "lucide-react";
import { UserDTO, CreateUserRequest, UpdateUserRequest } from "../types/User";
import "./UserForm.css";

interface UserFormProps {
  open: boolean;
  user?: UserDTO | null;
  onClose: () => void;
  onSave: (user: CreateUserRequest | UpdateUserRequest) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ open, user, onClose, onSave }) => {
  const [formData, setFormData] = useState<
    CreateUserRequest | UpdateUserRequest
  >({
    name: "",
    email: "",
    phoneNumber: "",
    role: "USER",
    address: "",
    dateOfBirth: "",
    avatar: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Edit mode
      setFormData({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isActive: user.isActive,
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || "",
        avatar: user.avatar || "",
      });
    } else {
      // Add mode
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        role: "USER",
        address: "",
        dateOfBirth: "",
        avatar: "",
      });
    }
    setErrors({});
    setShowPassword(false);
  }, [user, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Họ tên là bắt buộc";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (
      !/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ""))
    ) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    // Date of birth validation
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 13 || age > 120) {
        newErrors.dateOfBirth = "Tuổi phải từ 13 đến 120";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content user-form-modal">
        <div className="modal-header">
          <h2>{user ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Họ và tên *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
                placeholder="Nhập họ và tên"
              />
              {errors.name && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="Nhập địa chỉ email"
              />
              {errors.email && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Số điện thoại *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                className={errors.phoneNumber ? "error" : ""}
                placeholder="Nhập số điện thoại"
              />
              {errors.phoneNumber && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role">Vai trò</label>
              <select
                id="role"
                name="role"
                value={formData.role || "USER"}
                onChange={handleChange}
              >
                <option value="USER">Người dùng</option>
                <option value="ADMIN">Quản trị viên</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Ngày sinh</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                className={errors.dateOfBirth ? "error" : ""}
              />
              {errors.dateOfBirth && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.dateOfBirth}
                </span>
              )}
            </div>

            {user && (
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={(formData as UpdateUserRequest).isActive || false}
                    onChange={handleChange}
                  />
                  <span>Tài khoản hoạt động</span>
                </label>
              </div>
            )}

            <div className="form-group full-width">
              <label htmlFor="avatar">URL Avatar</label>
              <input
                type="url"
                id="avatar"
                name="avatar"
                value={formData.avatar || ""}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Nhập địa chỉ"
              />
            </div>
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
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {user ? "Cập nhật" : "Tạo mới"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
