import React, { useEffect, useState } from "react";
import { Plus, RefreshCw, AlertCircle, CheckCircle, X } from "lucide-react";
import { BookDTO, Book } from "./types";
import {
  createBook,
  updateBook,
  deleteBook,
} from "./services/bookService";
import {
  getAllBooks,
  getBookById,
  searchBooks,
} from "../services/bookService";
import DataTable from "./components/DataTable";
import BookForm from "./components/BookForm";
import BookDetailModal from "./components/BookDetailModal";
import ConfirmDialog from "./components/ConfirmDialog";
import Pagination from "../components/Pagination";
import "./BooksPage.css";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<BookDTO | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchBooks(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        fetchBooks(1);
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
    // eslint-disable-next-line
  }, [searchQuery]);

  const showToast = (type: "success" | "error", message: string) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const response = await getAllBooks({ page: page - 1, size: pageSize });
      if (Array.isArray(response.books)) {
        setBooks(response.books);
        setTotalPages(response.totalPages || 1);
      } else {
        setBooks([]);
        setTotalPages(1);
      }
    } catch (error: any) {
      console.error("Error fetching books:", error);
      showToast("error", error.message || "Không thể tải danh sách sách");
      setBooks([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchBooks(1);
      setCurrentPage(1);
      return;
    }

    setLoading(true);
    try {
      const response = await searchBooks({ keyword: searchQuery });
      setBooks(Array.isArray(response.books) ? response.books : []);
      setTotalPages(response.totalPages || 1);
    } catch (error: any) {
      console.error("Error searching books:", error);
      showToast("error", error.message || "Không thể tìm kiếm sách");
      setBooks([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedBook(null);
    setIsFormOpen(true);
  };

  const handleEdit = (book: BookDTO) => {
    setSelectedBook(book);
    setIsFormOpen(true);
  };

  const handleDelete = (book: BookDTO) => {
    setSelectedBook(book);
    setIsConfirmOpen(true);
  };

  const handleViewDetail = (book: BookDTO) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const handleSaveBook = async (bookData: Book) => {
    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, bookData);
        showToast("success", "Cập nhật sách thành công");
      } else {
        await createBook(bookData);
        showToast("success", "Thêm sách mới thành công");
      }
      setIsFormOpen(false);
      fetchBooks(currentPage);
    } catch (error: any) {
      console.error("Error saving book:", error);
      showToast("error", error.message || "Không thể lưu thông tin sách");
      throw error; // Re-throw to keep form open
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedBook) return;

    setDeleteLoading(true);
    try {
      await deleteBook(selectedBook.id);
      showToast("success", "Xóa sách thành công");
      setIsConfirmOpen(false);
      fetchBooks(currentPage);
    } catch (error: any) {
      console.error("Error deleting book:", error);
      showToast("error", error.message || "Không thể xóa sách");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    fetchBooks(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="books-page">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Quản lý sách</h1>
          <p className="page-subtitle">Quản lý danh sách sách trong hệ thống</p>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "spinning" : ""} />
            Làm mới
          </button>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={16} />
            Thêm sách mới
          </button>
        </div>
      </div>

      <div className="page-content">
        <DataTable
          data={books}
          loading={loading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetail={handleViewDetail}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <BookForm
        open={isFormOpen}
        book={selectedBook}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveBook}
      />

      <BookDetailModal
        open={isDetailOpen}
        book={selectedBook}
        onClose={() => setIsDetailOpen(false)}
      />

      <ConfirmDialog
        open={isConfirmOpen}
        title="Xác nhận xóa sách"
        content={`Bạn có chắc chắn muốn xóa sách "${selectedBook?.title}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        loading={deleteLoading}
        variant="danger"
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div className="toast-content">
              <div className="toast-icon">
                {toast.type === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              <span className="toast-message">{toast.message}</span>
            </div>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
