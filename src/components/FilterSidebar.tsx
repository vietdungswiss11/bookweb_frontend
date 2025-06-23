import React, { useState } from "react";
import "./FilterSidebar.css";
import { FilterState } from "./ProductListingPage";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
}) => {
  const [authorSearch, setAuthorSearch] = useState("");

  const categories = [
    { id: "fiction", name: "Fiction", icon: "📚" },
    { id: "thriller", name: "Thriller", icon: "📚" },
    { id: "romantic", name: "Romantic", icon: "📚" },
    { id: "sci-fi", name: "Sci-Fi", icon: "📚" },
    { id: "business", name: "Business", icon: "📚" },
    { id: "tech", name: "Tech", icon: "📚" },
    { id: "self-help", name: "Self-help", icon: "📚" },
  ];

  const languages = [
    { id: "vietnamese", name: "Vietnamese" },
    { id: "english", name: "English" },
    { id: "chinese", name: "Chinese" },
  ];

  const ratings = [
    { id: 5, name: "5 stars" },
    { id: 4, name: "4 stars & up" },
    { id: 3, name: "3 stars & up" },
  ];

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "bestseller", label: "Best Sellers" },
    { value: "rating", label: "Highest Rated" },
  ];

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
    onFilterChange({ categories: newCategories });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ rating: filters.rating === rating ? 0 : rating });
  };

  const handleLanguageChange = (languageId: string) => {
    const newLanguages = filters.language.includes(languageId)
      ? filters.language.filter((id) => id !== languageId)
      : [...filters.language, languageId];
    onFilterChange({ language: newLanguages });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({ priceRange: [min, max] });
  };

  return (
    <div className="filter-sidebar">
      {/* Category Tags */}
      <div className="filter-section category-tags">
        <div className="category-pills">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`category-pill ${filters.categories.includes(category.id) ? "active" : ""}`}
            >
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.25 0.875H2.625C1.24429 0.875 0.125 1.99429 0.125 3.375V16.5C0.125 16.8452 0.404822 17.125 0.75 17.125H12C12.3452 17.125 12.625 16.8452 12.625 16.5C12.625 16.1548 12.3452 15.875 12 15.875H1.375C1.375 15.1846 1.93464 14.625 2.625 14.625H13.25C13.5952 14.625 13.875 14.3452 13.875 14V1.5C13.875 1.15482 13.5952 0.875 13.25 0.875ZM12.625 13.375H2.625C2.18605 13.3744 1.75477 13.49 1.375 13.7102V3.375C1.375 2.68464 1.93464 2.125 2.625 2.125H12.625V13.375Z"
                  fill="#1C170D"
                />
              </svg>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Author Search */}
      <div className="filter-section">
        <h3 className="filter-title">Author</h3>
        <div className="author-search">
          <input
            type="text"
            placeholder="Search for authors..."
            value={authorSearch}
            onChange={(e) => setAuthorSearch(e.target.value)}
            className="author-search-input"
          />
          <button className="author-search-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.5306 18.4694L14.8366 13.7762C17.6629 10.383 17.3204 5.36693 14.0591 2.38935C10.7978 -0.588237 5.77134 -0.474001 2.64867 2.64867C-0.474001 5.77134 -0.588237 10.7978 2.38935 14.0591C5.36693 17.3204 10.383 17.6629 13.7762 14.8366L18.4694 19.5306C18.7624 19.8237 19.2376 19.8237 19.5306 19.5306C19.8237 19.2376 19.8237 18.7624 19.5306 18.4694ZM1.75 8.5C1.75 4.77208 4.77208 1.75 8.5 1.75C12.2279 1.75 15.25 4.77208 15.25 8.5C15.25 12.2279 12.2279 15.25 8.5 15.25C4.77379 15.2459 1.75413 12.2262 1.75 8.5Z"
                fill="#A1824A"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h3 className="filter-title">Price Range</h3>
        <div className="price-range">
          <div className="price-slider">
            <div className="slider-track">
              <div
                className="slider-fill"
                style={{
                  left: `${(filters.priceRange[0] / 50) * 100}%`,
                  width: `${((filters.priceRange[1] - filters.priceRange[0]) / 50) * 100}%`,
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handlePriceRangeChange(
                  parseInt(e.target.value),
                  filters.priceRange[1],
                )
              }
              className="range-input range-min"
            />
            <input
              type="range"
              min="0"
              max="50"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceRangeChange(
                  filters.priceRange[0],
                  parseInt(e.target.value),
                )
              }
              className="range-input range-max"
            />
          </div>
          <div className="price-values">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filter-section">
        <div className="rating-filters">
          {ratings.map((rating) => (
            <label key={rating.id} className="rating-filter">
              <input
                type="checkbox"
                checked={filters.rating === rating.id}
                onChange={() => handleRatingChange(rating.id)}
                className="rating-checkbox"
              />
              <span className="rating-label">{rating.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Format Type */}
      <div className="filter-section">
        <div className="format-filters">
          <label className="format-filter">
            <input
              type="checkbox"
              checked={filters.format.length === 0}
              onChange={() => onFilterChange({ format: [] })}
              className="format-checkbox"
            />
            <span className="format-label">
              Format Type: Paperback, Hardcover, E-book
            </span>
          </label>
        </div>
      </div>

      {/* Language Filter */}
      <div className="filter-section">
        <div className="language-filters">
          {languages.map((language) => (
            <label key={language.id} className="language-filter">
              <input
                type="checkbox"
                checked={filters.language.includes(language.id)}
                onChange={() => handleLanguageChange(language.id)}
                className="language-checkbox"
              />
              <span className="language-label">{language.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="filter-section">
        <h3 className="filter-title">Sort by</h3>
        <div className="sort-dropdown">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
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
    </div>
  );
};

export default FilterSidebar;
