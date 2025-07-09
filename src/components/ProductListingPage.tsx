import React, { useState, useEffect } from "react";
import "./ProductListingPage.css";
import Breadcrumbs from "./Breadcrumbs";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Header, Footer } from "./index";
import CategoryGrid from "./CategoryGrid";
import {
  getAllBooks,
  searchBooks,
  getBooksOnSale,
} from "../services/bookService";
import {
  getAllCategories,
  getBooksByCategoryId,
} from "../services/categoryService";
import { CategorySection } from "./index";

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
  { value: "relevance", label: "Mặc định (ID tăng dần)" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "bestseller", label: "Best Sellers" },
  { value: "sale", label: "Sale" },
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
        sortBy = "price";
        sortDir = "asc";
      } else if (filters.sortBy === "price_high") {
        sortBy = "price";
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
      // Nếu có searchQuery thì gọi searchBooks, ngược lại gọi getAllBooks
      let fetchBooks;
      if (filters.sortBy === "sale") {
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
    { label: "Home", href: "/" },
    { label: "All Books", href: "/category/tat-ca" },
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

  // Danh mục đồng bộ với CategoryGrid
  const categoryBanners = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=310&h=210&fit=crop",
      title: "Trở lại trường học cùng Fahasa",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=310&h=210&fit=crop",
      title: "Chương trình Manga Fest 2025",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=310&h=210&fit=crop",
      title: "Mỗi trang sách là một chuyến phiêu lưu",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=310&h=210&fit=crop",
      title: "Expand your world, one page at a time!",
    },
  ];

  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/\u0300|\u0301|\u0303|\u0309|\u0323|\u02C6|\u0306|\u031B/g, "")
      .replace(
        /[\u00C0-\u00C3\u00C8-\u00CA\u00CC-\u00CD\u00D2-\u00D5\u00D9-\u00DA\u00DD\u00E0-\u00E3\u00E8-\u00EA\u00EC-\u00ED\u00F2-\u00F5\u00F9-\u00FA\u00FD\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0]/g,
        "",
      )
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };
  const toUrlFriendly = (str: string) =>
    removeVietnameseTones(str.toLowerCase());

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
