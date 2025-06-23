import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination">
      <div className="pagination-container">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn pagination-prev"
          aria-label="Previous page"
        >
          <svg
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.64797 12.227C6.86776 12.4468 6.86776 12.8032 6.64797 13.023C6.42818 13.2428 6.07182 13.2428 5.85203 13.023L0.227031 7.39797C0.121407 7.29246 0.0620575 7.14929 0.0620575 7C0.0620575 6.85071 0.121407 6.70754 0.227031 6.60203L5.85203 0.977031C6.07182 0.757239 6.42818 0.757239 6.64797 0.977031C6.86776 1.19682 6.86776 1.55318 6.64797 1.77297L1.42023 7L6.64797 12.227Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="pagination-numbers">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="pagination-dots">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`pagination-number ${currentPage === page ? "active" : ""}`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn pagination-next"
          aria-label="Next page"
        >
          <svg
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.77297 7.39797L1.14797 13.023C0.928177 13.2428 0.571823 13.2428 0.352031 13.023C0.132239 12.8032 0.132239 12.4468 0.352031 12.227L5.57977 7L0.352031 1.77297C0.132239 1.55318 0.132239 1.19682 0.352031 0.977031C0.571823 0.757239 0.928177 0.757239 1.14797 0.977031L6.77297 6.60203C6.87859 6.70754 6.93794 6.85071 6.93794 7C6.93794 7.14929 6.87859 7.29246 6.77297 7.39797Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
