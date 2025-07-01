import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { Book, BookDTO } from "../types";
import "./BookForm.css";

interface BookFormProps {
  open: boolean;
  book?: BookDTO | null;
  onClose: () => void;
  onSave: (book: Book) => Promise<void>;
}

const BookForm: React.FC<BookFormProps> = ({ open, book, onClose, onSave }) => {
  const [formData, setFormData] = useState<Book>({
    title: "",
    author: "",
    price: 0,
    description: "",
    categoryId: 1,
    imageUrl: "",
    stockQuantity: 0,
    isbn: "",
    publishedDate: "",
    publisher: "",
    language: "Tiếng Việt",
    pages: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        price: book.price,
        description: book.description || "",
        categoryId: book.categoryId,
        imageUrl: book.imageUrl || "",
        stockQuantity: book.stockQuantity,
        isbn: book.isbn || "",
        publishedDate: book.publishedDate || "",
        publisher: book.publisher || "",
        language: book.language || "Tiếng Việt",
        pages: book.pages || 0,
      });
    } else {
      setFormData({
        title: "",
        author: "",
        price: 0,
        description: "",
        categoryId: 1,
        imageUrl: "",
        stockQuantity: 0,
        isbn: "",
        publishedDate: "",
        publisher: "",
        language: "Tiếng Việt",
        pages: 0,
      });
    }
    setErrors({});
  }, [book, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Tên sách là bắt buộc";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Tác giả là bắt buộc";
    }

    if (formData.price <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    }

    if (formData.stockQuantity < 0) {
      newErrors.stockQuantity = "Số lượng không thể âm";
    }

    if (formData.pages && formData.pages < 0) {
      newErrors.pages = "Số trang không thể âm";
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
      console.error("Error saving book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "stockQuantity" ||
        name === "pages" ||
        name === "categoryId"
          ? Number(value) || 0
          : value,
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
      <div className="modal-content book-form-modal">
        <div className="modal-header">
          <h2>{book ? "Chỉnh sửa sách" : "Thêm sách mới"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Tên sách *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "error" : ""}
                placeholder="Nhập tên sách"
              />
              {errors.title && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.title}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="author">Tác giả *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={errors.author ? "error" : ""}
                placeholder="Nhập tên tác giả"
              />
              {errors.author && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.author}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="price">Giá *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? "error" : ""}
                placeholder="0"
                min="0"
                step="1000"
              />
              {errors.price && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.price}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Số lượng *</label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className={errors.stockQuantity ? "error" : ""}
                placeholder="0"
                min="0"
              />
              {errors.stockQuantity && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.stockQuantity}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Nhập mã ISBN"
              />
            </div>

            <div className="form-group">
              <label htmlFor="publisher">Nhà xuất bản</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Nhập nhà xuất bản"
              />
            </div>

            <div className="form-group">
              <label htmlFor="publishedDate">Ngày xuất bản</label>
              <input
                type="date"
                id="publishedDate"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pages">Số trang</label>
              <input
                type="number"
                id="pages"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                className={errors.pages ? "error" : ""}
                placeholder="0"
                min="0"
              />
              {errors.pages && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.pages}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="language">Ngôn ngữ</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
                <option value="Deutsch">Deutsch</option>
                <option value="中文">中文</option>
                <option value="日本語">日本語</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="categoryId">Danh mục</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value={1}>Văn học</option>
                <option value={2}>Khoa học</option>
                <option value={3}>Lịch sử</option>
                <option value={4}>Kỹ thuật</option>
                <option value={5}>Kinh tế</option>
                <option value={6}>Nghệ thuật</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="imageUrl">URL hình ảnh</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Mô tả</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Nhập mô tả sách"
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
                  {book ? "Cập nhật" : "Tạo mới"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
