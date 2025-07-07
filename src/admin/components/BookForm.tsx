import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { Book, BookDTO } from "../types";
import "./BookForm.css";
import { getAllCategories } from '../../services/categoryService';
import { getAllBooks } from '../../services/bookService';

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
    categoryIds: [],
    images: [],
    isbn: "",
    publicationDate: "",
    sold: 0,
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
        categoryId: book.categoryId ?? 1,
        categoryIds: book.categories ? book.categories.map(cat => cat.id) : [],
        images: book.images || [],
        isbn: book.isbn || "",
        publicationDate: book.publicationDate || "",
        sold: book.sold ?? 0,
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
        categoryIds: [],
        images: [],
        isbn: "",
        publicationDate: "",
        sold: 0,
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

  const validateForm = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Tên sách là bắt buộc";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Tác giả là bắt buộc";
    }

    if (formData.originalPrice <= 0) {
      newErrors.originalPrice = "Giá gốc phải lớn hơn 0";
    }

    if (formData.price <= 0) {
      newErrors.price = "Giá bán phải lớn hơn 0";
    }

    if (formData.sold < 0) {
      newErrors.sold = "Số lượng không thể âm";
    }

    const isbnValue = formData.isbn || "";
    if (!isbnValue.trim()) {
      newErrors.isbn = "ISBN là bắt buộc";
    } else {
      // Kiểm tra ISBN duy nhất
      try {
        const allBooks = await getAllBooks();
        const isDuplicate = allBooks.books && allBooks.books.some((b: any) => b.isbn === isbnValue && (!book || b.id !== book.id));
        if (isDuplicate) {
          newErrors.isbn = "ISBN đã tồn tại, vui lòng nhập mã khác";
        }
      } catch (e) {
        // ignore
      }
    }

    // Kiểm tra ảnh
    if (imageFiles.length > 0) {
      for (let file of imageFiles) {
        if (file.size > 1 * 1024 * 1024) {
          newErrors.images = "Mỗi ảnh phải nhỏ hơn 1MB";
          break;
        }
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
      // Build object gửi lên API: categories là mảng object {id: ...}
      let submitData = {
        ...formData,
        categories: formData.categoryIds.map(id => ({ id })),
      };
      
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
      let newData = { ...prev };
      newData = {
        ...prev,
        [name]:
          name === "price" ||
            name === "sold" ||
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
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/upload/multi', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.urls) {
        const urls: string[] = data.urls;
        setFormData((prev) => ({ ...prev, images: urls.map((url, idx) => ({ id: 0, url, name: fileArr[idx].name })) }));
        setImagePreviews(urls);
      }
    } catch (e) {
      // handle error
    } finally {
      setUploading(false);
    }
  };

  if (!open) return <></>;

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
                className={errors.originalPrice ? "error" : ""}
              />
              {errors.originalPrice && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.originalPrice}
                </span>
              )}
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
              <label htmlFor="sold">Số lượng đã bán*</label>
              <input
                type="number"
                id="sold"
                name="sold"
                value={formData.sold}
                onChange={handleChange}
                className={errors.sold ? "error" : ""}
                placeholder="0"
                min="0"
              />
              {errors.sold && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.sold}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN *</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Nhập mã ISBN"
                className={errors.isbn ? "error" : ""}
              />
              {errors.isbn && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.isbn}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="publicationDate">Ngày xuất bản</label>
              <input
                type="date"
                id="publicationDate"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Danh mục</label>
              <div className="category-checkbox-group">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {categories.map((cat) => (
                  <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input
                      type="checkbox"
                      value={cat.id}
                      checked={formData.categoryIds.includes(cat.id)}
                      onChange={e => {
                        const checked = e.target.checked;
                        setFormData(prev => {
                          let newIds = prev.categoryIds || [];
                          if (checked) {
                            newIds = [...newIds, cat.id];
                          } else {
                            newIds = newIds.filter(id => id !== cat.id);
                          }
                          return { ...prev, categoryIds: newIds };
                        });
                      }}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
              </div>
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
              {errors.images && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.images}
                </span>
              )}
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
