import React from "react";
import "./ReviewItem.css";
import { Review } from "./UserAccountPage";
import { useNavigate } from "react-router-dom";

interface ReviewItemProps {
  review: Review;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const bookTitle = review.book?.title || review.bookTitle || "(No title)";
  const image = review.book?.imageUrl || review.image || "https://placehold.co/56x56/c2a078/c2a078";
  const content = review.content || "";
  const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : "";
  const navigate = useNavigate();
  const handleClick = () => {
    if (review.book?.id) {
      navigate(`/product/${review.book.id}`);
    }
  };
  return (
    <div className="review-item" style={{ cursor: 'pointer' }} onClick={handleClick}>
      <div className="review-content">
        <img
          src={image}
          alt={bookTitle}
          className="review-image"
        />
        <div className="review-details">
          <div className="review-title">{bookTitle}</div>
          <div className="review-rating">{review.rating}/5 stars</div>
          {content && <div className="review-text">{content}</div>}
          {date && <div className="review-date">{date}</div>}
        </div>
      </div>
      <div className="review-arrow">
        <div className="arrow-container">
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="chevron-right"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.03062 9.53063L1.53063 17.0306C1.23757 17.3237 0.762431 17.3237 0.469375 17.0306C0.176318 16.7376 0.176318 16.2624 0.469375 15.9694L7.43969 9L0.469375 2.03062C0.176318 1.73757 0.176318 1.26243 0.469375 0.969375C0.762431 0.676319 1.23757 0.676319 1.53063 0.969375L9.03062 8.46937C9.17146 8.61005 9.25059 8.80094 9.25059 9C9.25059 9.19906 9.17146 9.38995 9.03062 9.53063Z"
              fill="#171412"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
