import React from "react";
import {
  X,
  Calendar,
  BookOpen,
  Globe,
  User,
  Hash,
  Building,
} from "lucide-react";
import { BookDTO } from "../types";
import "./BookDetailModal.css";

interface BookDetailModalProps {
  open: boolean;
  book: BookDTO | null;
  onClose: () => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({
  open,
  book,
  onClose,
}) => {
  if (!open || !book) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Không có thông tin";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryName = (categoryId: number) => {
    const categories: Record<number, string> = {
      1: "Văn học",
      2: "Khoa học",
      3: "Lịch sử",
      4: "Kỹ thuật",
      5: "Kinh tế",
      6: "Nghệ thuật",
    };
    return categories[categoryId] || "Khác";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content book-detail-modal">
        <div className="modal-header">
          <h2>Chi tiết sách</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="book-detail-content">
          <div className="book-detail-main">
            <div className="book-image-section">
              {book.imageUrl ? (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="book-cover"
                />
              ) : (
                <div className="no-image-placeholder">
                  <BookOpen size={48} />
                  <span>Không có hình ảnh</span>
                </div>
              )}
            </div>

            <div className="book-info-section">
              <div className="book-header">
                <h1 className="book-title">{book.title}</h1>
                <div className="book-meta">
                  <span className="book-id">ID: {book.id}</span>
                  <span
                    className={`stock-status ${book.stockQuantity > 0 ? "in-stock" : "out-of-stock"}`}
                  >
                    {book.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </div>
              </div>

              <div className="book-price">
                <span className="price-label">Giá bán:</span>
                <span className="price-value">{formatPrice(book.price)}</span>
              </div>

              <div className="book-details-grid">
                <div className="detail-item">
                  <div className="detail-label">
                    <User size={16} />
                    Tác giả
                  </div>
                  <div className="detail-value">{book.author}</div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <Hash size={16} />
                    Danh mục
                  </div>
                  <div className="detail-value">
                    {getCategoryName(book.categoryId)}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <BookOpen size={16} />
                    Số lượng
                  </div>
                  <div className="detail-value">{book.stockQuantity}</div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <Globe size={16} />
                    Ngôn ngữ
                  </div>
                  <div className="detail-value">
                    {book.language || "Không có thông tin"}
                  </div>
                </div>

                {book.isbn && (
                  <div className="detail-item">
                    <div className="detail-label">
                      <Hash size={16} />
                      ISBN
                    </div>
                    <div className="detail-value">{book.isbn}</div>
                  </div>
                )}

                {book.publisher && (
                  <div className="detail-item">
                    <div className="detail-label">
                      <Building size={16} />
                      Nhà xuất bản
                    </div>
                    <div className="detail-value">{book.publisher}</div>
                  </div>
                )}

                {book.pages && book.pages > 0 && (
                  <div className="detail-item">
                    <div className="detail-label">
                      <BookOpen size={16} />
                      Số trang
                    </div>
                    <div className="detail-value">{book.pages}</div>
                  </div>
                )}

                <div className="detail-item">
                  <div className="detail-label">
                    <Calendar size={16} />
                    Ngày xuất bản
                  </div>
                  <div className="detail-value">
                    {formatDate(book.publishedDate)}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <Calendar size={16} />
                    Ngày tạo
                  </div>
                  <div className="detail-value">
                    {formatDate(book.createdAt)}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <Calendar size={16} />
                    Cập nhật lần cuối
                  </div>
                  <div className="detail-value">
                    {formatDate(book.updatedAt)}
                  </div>
                </div>
              </div>

              {book.description && (
                <div className="book-description">
                  <h3>Mô tả</h3>
                  <p>{book.description}</p>
                </div>
              )}
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

export default BookDetailModal;
