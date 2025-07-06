import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { Category, CategoryListResponse, PaginatedResponse } from "../types";
import { getAllCategories } from "../services/categoryService";
import "./CategoryForm.css";

interface CategoryFormProps {
  open: boolean;
  category?: Category | null;
  onClose: () => void;
  onSave: (category: { name: string }) => Promise<void>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  open,
  category,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
      });
    } else {
      setFormData({
        name: "",
      });
    }
    setErrors({});
  }, [category, open]);

  const validateForm = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên danh mục là bắt buộc";
    } else {
      // Kiểm tra tên danh mục duy nhất
      try {
        const response = await getAllCategories();
        let categories: Category[] = [];

        if ('categories' in response && Array.isArray(response.categories)) {
          categories = response.categories;
        } else if ('data' in response && Array.isArray(response.data)) {
          categories = response.data;
        } else if (Array.isArray(response)) {
          categories = response;
        }

        const isDuplicate = categories.some(
          (cat: Category) =>
            cat.name.toLowerCase() === formData.name.trim().toLowerCase() &&
            (!category || cat.id !== category.id),
        );
        if (isDuplicate) {
          newErrors.name = "Tên danh mục đã tồn tại, vui lòng nhập tên khác";
        }
      } catch (e) {
        // ignore error during validation
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(await validateForm())) {
      return;
    }

    setLoading(true);
    try {
      await onSave({ name: formData.name.trim() });
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      <div className="modal-content category-form-modal">
        <div className="modal-header">
          <h2>{category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="name">Tên danh mục *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
              placeholder="Nhập tên danh mục"
              autoFocus
            />
            {errors.name && (
              <span className="error-message">
                <AlertCircle size={16} />
                {errors.name}
              </span>
            )}
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
                  {category ? "Cập nhật" : "Tạo mới"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
