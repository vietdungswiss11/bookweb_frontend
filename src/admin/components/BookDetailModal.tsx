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
            <div className="book-image-gallery">
              {book.images && book.images.length > 0 ? (
                <>
                  <div className="main-image">
                    <img src={book.images[0].url} alt={book.title} style={{ width: 180, height: 240, objectFit: "cover", borderRadius: 8, border: '1px solid #eee' }} />
                  </div>
                  <div className="thumbnail-list" style={{ display: 'flex', marginTop: 8 }}>
                    {book.images.map((img, idx) => (
                      <img
                        key={img.id || idx}
                        src={img.url}
                        alt={img.name || book.title}
                        className="thumbnail"
                        style={{ width: 60, height: 80, objectFit: "cover", marginRight: 8, borderRadius: 4, border: '1px solid #eee' }}
                      />
                    ))}
                  </div>
                </>
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
              </div>

              <div className="book-prices" style={{ marginBottom: 16 }}>
                <div>Giá gốc: <span style={{ textDecoration: 'line-through', color: '#888' }}>{formatPrice(book.originalPrice)}</span></div>
                <div>Giá bán: <span style={{ color: '#1976d2', fontWeight: 600 }}>{formatPrice(book.discountPrice)}</span></div>
                <div>% Giảm: <span style={{ color: '#d32f2f' }}>{(book.discountPercent * 100).toFixed(0)}%</span></div>
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
                    {book.categories && book.categories.length > 0
                      ? book.categories.map(cat => cat.name).join(", ")
                      : "Khác"}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <BookOpen size={16} />
                    Số lượng bán
                  </div>
                  <div className="detail-value">{book.sold ?? 0}</div>
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

                <div className="detail-item">
                  <div className="detail-label">
                    <Calendar size={16} />
                    Ngày xuất bản
                  </div>
                  <div className="detail-value">
                    {formatDate(book.publicationDate)}
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
