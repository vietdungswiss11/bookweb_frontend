import React, { useState, useEffect } from "react";
import "./ProductListingPage.css";
import Breadcrumbs from "./Breadcrumbs";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Header, Footer } from "./index";
import {
  getAllBooks,
  searchBooks,
  getBooksOnSale,
} from "../services/bookService";
import {
  getAllCategories,
} from "../services/categoryService";

interface ProductListingPageProps {
  searchQuery?: string;
  category?: string;
  initialFilters?: FilterState;
  categories?: { id: string; name: string; icon?: string }[];
}

export interface FilterState {
  categories: string[];
  authors: string[];
  priceRange: [number, number] | null;
  rating: number;
  format: string[];
  language: string[];
  sortBy: string;
  bestSeller?: boolean;
  sale?: boolean;
}

export interface Product {
  id: string;
  title: string;
  author: string;
  discountPrice: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  sold: number;
  format: string;
  language: string;
}

const sortOptions = [
  { value: "relevance", label: "Mặc định" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

const ProductListingPage: React.FC<ProductListingPageProps> = ({
  searchQuery: propSearchQuery,
  category,
  initialFilters,
  categories: propCategories,
}) => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const location = useLocation();
  // Lấy searchQuery từ URL nếu có
  const urlSearchParams = new URLSearchParams(location.search);
  const searchQuery = urlSearchParams.get("keyword") || propSearchQuery || "";
  const [filters, setFilters] = useState<FilterState>({
    categories: categoryName ? [categoryName] : category ? [category] : [],
    authors: [],
    priceRange: null,
    rating: 0,
    format: [],
    language: [],
    sortBy: "relevance",
    bestSeller: false,
    sale: false,
    ...initialFilters,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);

  // Danh mục đồng bộ với CategoryGrid
  const sidebarCategories = categories;

  useEffect(() => {
    setLoading(true);
    getAllCategories().then((cats) => {
      setCategories(cats);
      // Map sortBy/sortDir theo filters.sortBy
      let sortBy = "id";
      let sortDir = "asc";
      if (filters.sortBy === "price_low") {
        sortBy = "discountPrice";
        sortDir = "asc";
      } else if (filters.sortBy === "price_high") {
        sortBy = "discountPrice";
        sortDir = "desc";
      } else if (filters.sortBy === "newest") {
        sortBy = "createdAt"; // hoặc trường ngày tạo thực tế của bạn
        sortDir = "desc";
      } else if (filters.sortBy === "bestseller") {
        sortBy = "sold"; // hoặc trường phù hợp với bestseller
        sortDir = "desc";
      } else if (filters.sortBy === "rating") {
        sortBy = "averageRating";
        sortDir = "desc";
      } else {
        sortBy = "id";
        sortDir = "asc";
      }
      const params: any = {
        page: currentPage - 1,
        size: itemsPerPage,
        sortBy,
        sortDir,
      };
      if (!isNaN(Number(categoryName))) {
        params.categoryId = Number(categoryName);
      }
      if (filters.priceRange) {
        params.minPrice = filters.priceRange[0];
        params.maxPrice = filters.priceRange[1];
      }
      if (filters.rating) {
        params.minRating = filters.rating;
      }
      // Nếu chọn Sale thì luôn gọi getBooksOnSale
      let fetchBooks;
      if (filters.sale) {
        fetchBooks = getBooksOnSale({
          page: currentPage - 1, // hoặc currentPage nếu backend bắt đầu từ 0
          size: itemsPerPage,
          sortBy,
          sortDir
      });
      } else if (filters.bestSeller) {
        fetchBooks = getAllBooks({ ...params, sortBy: 'sold', sortDir: 'desc' });
      } else if (filters.sortBy === "sale") {
        fetchBooks = getBooksOnSale();
      } else if (searchQuery) {
        fetchBooks = searchBooks({ keyword: searchQuery, ...params });
      } else {
        fetchBooks = getAllBooks(params);
      }

      fetchBooks
        .then((res) => {
          // Nếu là sale thì map dữ liệu khác nếu cần
          let items = res.books || res;
          setProducts(
            (items || []).map((item: any) => ({
              id: String(item.id),
              title: item.title,
              author: item.author,
              discountPrice: item.discountPrice ?? item.price ?? 0,
              originalPrice: item.originalPrice ?? item.oldPrice ?? 0,
              discountPercent:
                item.discountPercent ??
                (item.originalPrice && item.discountPrice
                  ? 1 - item.discountPrice / item.originalPrice
                  : 0),
              image:
                item.images && item.images.length > 0
                  ? item.images[0].url
                  : item.image || "https://placehold.co/166x221",
              rating: item.averageRating ?? item.rating,
              reviewCount: item.totalReviews ?? 0,
              category:
                item.categories && item.categories.length > 0
                  ? item.categories[0].name
                  : "",
              sold: item.sold ?? 0,
              format: item.format ?? "",
              language: item.language ?? "",
            })),
          );
          setTotalResults(res.totalItems || items.length || 0);
          setTotalPages(res.totalPages || 1);
          setLoading(false);
        })
        .catch(() => {
          setProducts([]);
          setTotalResults(0);
          setTotalPages(1);
          setLoading(false);
        });
    });
  }, [categoryName, filters, currentPage, searchQuery]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate breadcrumb items
  const breadcrumbItems: Array<{ label: string; href?: string }> = [
    { label: "Trang chủ", href: "/" },
    { label: "Tất cả sách", href: "/category/tat-ca" },
  ];

  // Nếu có categoryId là số, tìm tên danh mục active để thêm vào breadcrumbs
  let activeCategoryName = "";
  if (categoryName && !isNaN(Number(categoryName))) {
    const activeCat = categories.find(
      (cat: any) => String(cat.id) === categoryName,
    );
    if (activeCat) {
      activeCategoryName = activeCat.name;
      breadcrumbItems.push({ label: activeCat.name });
    }
  }

  if (searchQuery) {
    breadcrumbItems.push({ label: `Search results for "${searchQuery}"` });
  } else if (category) {
    breadcrumbItems.push(
      { label: "Categories", href: "/categories" },
      { label: category },
    );
  }

  return (
    <>
      <Header />
      <div className="product-listing-page">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="listing-container">
          <div className="listing-content">
            {/* Left Sidebar - Filters */}
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={sidebarCategories}
              activeCategoryId={categoryName}
            />

            {/* Right Side - Product Grid */}
            <div className="products-section">
              {/* Results Header */}
              <div className="results-header">
                <h1 className="results-title">
                  Showing {totalResults.toLocaleString()} results
                </h1>
                <div className="sort-dropdown">
                  <label htmlFor="sort-by">Sort by</label>
                  <select
                    id="sort-by"
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange({ sortBy: e.target.value })
                    }
                    className="sort-select"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="dropdown-arrow"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#A1824A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={products}
                loading={loading}
                onProductClick={(productId) =>
                  navigate(`/product/${productId}`)
                }
              />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductListingPage;
