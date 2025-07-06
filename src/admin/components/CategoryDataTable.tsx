import React from "react";
import { Edit, Trash2, Eye, Search } from "lucide-react";
import { Category } from "../types";
import "./CategoryDataTable.css";

interface CategoryDataTableProps {
  data: Category[];
  loading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onViewDetail: (category: Category) => void;
}

const CategoryDataTable: React.FC<CategoryDataTableProps> = ({
  data,
  loading = false,
  searchQuery = "",
  onSearchChange,
  onEdit,
  onDelete,
  onViewDetail,
}) => {
  if (loading) {
    return (
      <div className="category-table-container">
        <div className="category-table-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-table-container">
      {onSearchChange && (
        <div className="category-table-header">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên danh mục..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      <div className="category-table-wrapper">
        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>
                    <div className="category-name">
                      <span>{category.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn view"
                        onClick={() => onViewDetail(category)}
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => onEdit(category)}
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => onDelete(category)}
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryDataTable;
