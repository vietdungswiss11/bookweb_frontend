import React, { useState, useEffect } from "react";
import "./ProductListingPage.css";
import Breadcrumbs from "./Breadcrumbs";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

interface ProductListingPageProps {
  searchQuery?: string;
  category?: string;
  initialFilters?: FilterState;
}

export interface FilterState {
  categories: string[];
  authors: string[];
  priceRange: [number, number];
  rating: number;
  format: string[];
  language: string[];
  sortBy: string;
}

export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  format: string;
  language: string;
}

const ProductListingPage: React.FC<ProductListingPageProps> = ({
  searchQuery,
  category,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: category ? [category] : [],
    authors: [],
    priceRange: [0, 50],
    rating: 0,
    format: [],
    language: [],
    sortBy: "relevance",
    ...initialFilters,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [totalResults] = useState(2343);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate API call
    setLoading(true);

    // Sample product data - in real app this would come from API
    const sampleProducts: Product[] = [
      {
        id: "1",
        title: "The President's Daughter",
        author: "Bill Clinton and James Patterson",
        price: 15.99,
        image: "https://placehold.co/166x221/e8e8e8/e8e8e8",
        rating: 4.5,
        reviewCount: 1234,
        category: "Fiction",
        format: "Paperback",
        language: "English",
      },
      {
        id: "2",
        title: "The Last Thing He Told Me: A Novel",
        author: "Laura Dave",
        price: 12.99,
        image: "https://placehold.co/166x221/d4d4d4/d4d4d4",
        rating: 4.3,
        reviewCount: 987,
        category: "Fiction",
        format: "Hardcover",
        language: "English",
      },
      {
        id: "3",
        title: "Project Hail Mary: A Novel",
        author: "Andy Weir",
        price: 14.99,
        image: "https://placehold.co/166x221/c8c8c8/c8c8c8",
        rating: 4.7,
        reviewCount: 2156,
        category: "Sci-Fi",
        format: "E-book",
        language: "English",
      },
      {
        id: "4",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 13.99,
        image: "https://placehold.co/166x221/e0e0e0/e0e0e0",
        rating: 4.2,
        reviewCount: 1567,
        category: "Thriller",
        format: "Paperback",
        language: "English",
      },
      {
        id: "5",
        title: "The Paper Palace: A Novel",
        author: "Miranda Cowley Heller",
        price: 18.99,
        image: "https://placehold.co/166x221/d8d8d8/d8d8d8",
        rating: 4.0,
        reviewCount: 892,
        category: "Romantic",
        format: "Hardcover",
        language: "English",
      },
      {
        id: "6",
        title: "The Four Winds: A Novel",
        author: "Kristin Hannah",
        price: 16.99,
        image: "https://placehold.co/166x221/b8b8b8/b8b8b8",
        rating: 4.6,
        reviewCount: 1789,
        category: "Fiction",
        format: "Paperback",
        language: "English",
      },
      {
        id: "7",
        title: "Golden Girl",
        author: "Elin Hilderbrand",
        price: 17.99,
        image: "https://placehold.co/166x221/cccccc/cccccc",
        rating: 4.1,
        reviewCount: 654,
        category: "Fiction",
        format: "E-book",
        language: "English",
      },
      {
        id: "8",
        title: "The Night She Disappeared: A Novel",
        author: "Lisa Jewell",
        price: 19.99,
        image: "https://placehold.co/166x221/c0c0c0/c0c0c0",
        rating: 4.4,
        reviewCount: 1123,
        category: "Thriller",
        format: "Hardcover",
        language: "English",
      },
    ];

    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 500);
  }, [filters, currentPage]);

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
  ];

  if (searchQuery) {
    breadcrumbItems.push({ label: `Search results for "${searchQuery}"` });
  } else if (category) {
    breadcrumbItems.push(
      { label: "Categories", href: "/categories" },
      { label: category },
    );
  } else {
    breadcrumbItems.push({ label: "All Books" });
  }

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="product-listing-page">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="listing-container">
        <div className="listing-content">
          {/* Left Sidebar - Filters */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Right Side - Product Grid */}
          <div className="products-section">
            {/* Results Header */}
            <div className="results-header">
              <h1 className="results-title">
                Showing {totalResults.toLocaleString()} results
              </h1>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={products}
              loading={loading}
              onProductClick={(productId) =>
                console.log("Product clicked:", productId)
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
  );
};

export default ProductListingPage;
