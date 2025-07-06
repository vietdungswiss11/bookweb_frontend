import React from "react";
import { X } from "lucide-react";
import { Category } from "../types";
import "./CategoryDetailModal.css";

interface CategoryDetailModalProps {
  open: boolean;
  category: Category | null;
  onClose: () => void;
}

const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  open,
  category,
  onClose,
}) => {
  if (!open || !category) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content category-detail-modal">
        <div className="modal-header">
          <h2>Chi tiết danh mục</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="category-detail-content">
          <div className="detail-section">
            <div className="detail-group">
              <label>ID:</label>
              <span>{category.id}</span>
            </div>
            <div className="detail-group">
              <label>Tên danh mục:</label>
              <span>{category.name}</span>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailModal;
