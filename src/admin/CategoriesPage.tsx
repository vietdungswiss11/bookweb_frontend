import React, { useEffect, useState } from "react";
import { Plus, RefreshCw, AlertCircle, CheckCircle, X } from "lucide-react";
import { Category, CategoryListResponse, PaginatedResponse } from "./types";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  searchCategories,
} from "./services/categoryService";
import CategoryDataTable from "./components/CategoryDataTable";
import CategoryForm from "./components/CategoryForm";
import CategoryDetailModal from "./components/CategoryDetailModal";
import ConfirmDialog from "./components/ConfirmDialog";
import Pagination from "../components/Pagination";
import "./CategoriesPage.css";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchCategories(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        fetchCategories(1);
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

  const fetchCategories = async (page: number) => {
    setLoading(true);
    try {
      const response = await getAllCategories({
        page: page - 1,
        size: pageSize,
      });

      if ('categories' in response && Array.isArray(response.categories)) {
        setCategories(response.categories);
        setTotalPages(response.totalPages || 1);
      } else if ('data' in response && Array.isArray(response.data)) {
        setCategories(response.data);
        setTotalPages(response.totalPages || 1);
      } else if (Array.isArray(response)) {
        setCategories(response);
        setTotalPages(1);
      } else {
        setCategories([]);
        setTotalPages(1);
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      showToast("error", error.message || "Không thể tải danh sách danh mục");
      setCategories([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchCategories(1);
      setCurrentPage(1);
      return;
    }

    setLoading(true);
    try {
      const response = await searchCategories(searchQuery);
      if (Array.isArray(response)) {
        setCategories(response);
        setTotalPages(1);
      } else {
        setCategories([]);
        setTotalPages(1);
      }
    } catch (error: any) {
      console.error("Error searching categories:", error);
      showToast("error", error.message || "Không thể tìm kiếm danh mục");
      setCategories([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsConfirmOpen(true);
  };

  const handleViewDetail = (category: Category) => {
    setSelectedCategory(category);
    setIsDetailOpen(true);
  };

  const handleSaveCategory = async (categoryData: { name: string }) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, categoryData);
        showToast("success", "Cập nhật danh mục thành công");
      } else {
        await createCategory(categoryData);
        showToast("success", "Thêm danh mục mới thành công");
      }
      setIsFormOpen(false);
      fetchCategories(currentPage);
    } catch (error: any) {
      console.error("Error saving category:", error);
      showToast("error", error.message || "Không thể lưu thông tin danh mục");
      throw error; // Re-throw to keep form open
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    setDeleteLoading(true);
    try {
      await deleteCategory(selectedCategory.id);
      showToast("success", "Xóa danh mục thành công");
      setIsConfirmOpen(false);
      fetchCategories(currentPage);
    } catch (error: any) {
      console.error("Error deleting category:", error);
      showToast("error", error.message || "Không thể xóa danh mục");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    fetchCategories(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Quản lý danh mục</h1>
          <p className="page-subtitle">
            Quản lý danh sách danh mục sách trong hệ thống
          </p>
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
            Thêm danh mục mới
          </button>
        </div>
      </div>

      <div className="page-content">
        <CategoryDataTable
          data={categories}
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

      <CategoryForm
        open={isFormOpen}
        category={selectedCategory}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCategory}
      />

      <CategoryDetailModal
        open={isDetailOpen}
        category={selectedCategory}
        onClose={() => setIsDetailOpen(false)}
      />

      <ConfirmDialog
        open={isConfirmOpen}
        title="Xác nhận xóa danh mục"
        content={`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory?.name}"? Hành động này không thể hoàn tác.`}
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

export default CategoriesPage;
