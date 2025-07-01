import React from "react";
import { Edit, Trash2, Eye, Search } from "lucide-react";
import { BookDTO } from "../types";
import "./DataTable.css";

interface DataTableProps {
  data: BookDTO[];
  loading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onEdit: (book: BookDTO) => void;
  onDelete: (book: BookDTO) => void;
  onViewDetail: (book: BookDTO) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  loading = false,
  searchQuery = "",
  onSearchChange,
  onEdit,
  onDelete,
  onViewDetail,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="data-table-container">
        <div className="data-table-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      {onSearchChange && (
        <div className="data-table-header">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sách hoặc tác giả..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>
                    <div className="book-image">
                      {book.imageUrl ? (
                        <img src={book.imageUrl} alt={book.title} />
                      ) : (
                        <div className="no-image">📚</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="book-title">
                      <span>{book.title}</span>
                      {book.isbn && <small>ISBN: {book.isbn}</small>}
                    </div>
                  </td>
                  <td>{book.author}</td>
                  <td>{formatPrice(book.price)}</td>
                  <td>
                    <span
                      className={`stock-badge ${book.stockQuantity > 0 ? "in-stock" : "out-of-stock"}`}
                    >
                      {book.stockQuantity}
                    </span>
                  </td>
                  <td>{formatDate(book.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn view"
                        onClick={() => onViewDetail(book)}
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => onEdit(book)}
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => onDelete(book)}
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

export default DataTable;
