import React from "react";
import { AlertTriangle, X } from "lucide-react";
import "./ConfirmDialog.css";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: "danger" | "warning" | "info";
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  content,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  loading = false,
  variant = "danger",
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          iconColor: "#ef4444",
          confirmButtonClass: "btn-danger",
        };
      case "warning":
        return {
          iconColor: "#f59e0b",
          confirmButtonClass: "btn-warning",
        };
      case "info":
        return {
          iconColor: "#3b82f6",
          confirmButtonClass: "btn-info",
        };
      default:
        return {
          iconColor: "#ef4444",
          confirmButtonClass: "btn-danger",
        };
    }
  };

  const { iconColor, confirmButtonClass } = getVariantStyles();

  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-dialog">
        <div className="confirm-dialog-header">
          <div className="confirm-icon" style={{ color: iconColor }}>
            <AlertTriangle size={24} />
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="confirm-dialog-content">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{content}</p>
        </div>

        <div className="confirm-dialog-actions">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`btn ${confirmButtonClass}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Đang xử lý...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
