import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { Book, BookDTO } from "../types";
import "./BookForm.css";
import { getAllCategories } from '../../services/categoryService';

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
    originalPrice: 0,
    discountPercent: 0,
    discountPrice: 0,
    description: "",
    categoryId: 1,
    images: [],
    stockQuantity: 0,
    isbn: "",
    publishedDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice ?? 0,
        discountPercent: book.discountPercent ?? 0,
        discountPrice: book.discountPrice ?? book.price ?? 0,
        description: book.description || "",
        categoryId: book.categoryId,
        images: book.images || [],
        stockQuantity: book.stockQuantity,
        isbn: book.isbn || "",
        publishedDate: book.publishedDate || "",
      });
      if (book.images) {
        setImagePreviews(book.images.map(img => img.url));
      }
    } else {
      setFormData({
        title: "",
        author: "",
        price: 0,
        originalPrice: 0,
        discountPercent: 0,
        discountPrice: 0,
        description: "",
        categoryId: 1,
        images: [],
        stockQuantity: 0,
        isbn: "",
        publishedDate: "",
      });
      setImagePreviews([]);
    }
    setErrors({});
  }, [book, open]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategories();
        if (Array.isArray(res)) setCategories(res);
        else if (res.data && Array.isArray(res.data)) setCategories(res.data);
      } catch (e) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

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
      let submitData = { ...formData };
      // Nếu images là mảng object
      if (submitData.images && submitData.images.length > 0) {
        if (typeof submitData.images[0] === 'string') {
          submitData.imageUrl = submitData.images[0];
        } else if (submitData.images[0].url) {
          submitData.imageUrl = submitData.images[0].url;
        }
      } else {
        submitData.imageUrl = undefined;
      }
      await onSave(submitData);
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
    setFormData((prev) => {
      let newData = {
        ...prev,
        [name]:
          name === "price" ||
            name === "stockQuantity" ||
            name === "categoryId" ||
            name === "originalPrice" ||
            name === "discountPercent"
            ? Number(value) || 0
            : value,
      };
      if (name === "originalPrice" || name === "discountPercent") {
        const discount = newData.originalPrice * (1 - newData.discountPercent);
        newData = {
          ...newData,
          discountPrice: Math.round(discount),
          price: Math.round(discount),
        };
      }
      return newData;
    });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const fileArr = Array.from(files);
    setImageFiles(fileArr);
    // Preview
    setImagePreviews(fileArr.map(f => URL.createObjectURL(f)));
    // Upload
    const formDataUpload = new FormData();
    fileArr.forEach(f => formDataUpload.append('files', f));
    try {
      const res = await fetch('http://localhost:8080/upload/multi', {
        method: 'POST',
        headers: {
          // 'Authorization': 'Bearer ...', // Nếu cần token thì truyền vào đây
        },
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.urls) {
        setFormData((prev) => ({ ...prev, images: data.urls }));
        setImagePreviews(data.urls);
      }
    } catch (e) {
      // handle error
    } finally {
      setUploading(false);
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
              <label htmlFor="originalPrice">Giá gốc *</label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountPercent">% Giảm giá</label>
              <input
                type="number"
                id="discountPercent"
                name="discountPercent"
                value={formData.discountPercent}
                onChange={handleChange}
                placeholder="0.2 cho 20%"
                min="0"
                max="1"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Giá sau giảm</label>
              <input
                type="number"
                value={formData.discountPrice}
                readOnly
                style={{ background: '#f5f5f5' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Số lượng đã bán*</label>
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
              <label htmlFor="categoryId">Danh mục</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                {categories.length === 0 && <option value={1}>Văn học</option>}
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="images">Hình ảnh</label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={uploading}
              />
              {uploading && <div>Đang upload...</div>}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {imagePreviews.map((url, idx) => (
                  <img key={idx} src={url} alt="preview" style={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />
                ))}
              </div>
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
