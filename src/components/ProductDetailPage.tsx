import React from "react";
import "./ProductDetailPage.css";
import Breadcrumbs from "./Breadcrumbs";
import ProductActions from "./ProductActions";

interface ProductDetailPageProps {
  productId?: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  // Sample product data - in real app this would come from API
  const product = {
    id: productId || "1",
    title:
      "The Power of a Plant: A Teacher's Odyssey to Grow Healthy Minds and Schools",
    author: "Stephen Ritz",
    publishedDate: "May 2, 2017",
    publisher: "Rodale Books; Illustrated edition (May 2, 2017)",
    price: 12.99,
    pageCount: 192,
    isbn: "978-1623368647",
    rating: 4.5,
    totalReviews: 1900,
    description:
      "The Power of a Plant gloriously celebrates teacher Stephen Ritz whose story has made him one of our nation's most influential educators. His book inspires readers' lives by learning, cultivating, and sharing the thought that growing healthy minds and schools is possible. Ritz's journey shows how much a seed can do to inspire change. Are you ready to start something new?",
    images: [
      "https://placehold.co/472x300/8B7355/8B7355",
      "https://placehold.co/236x300/7A9B57/7A9B57",
      "https://placehold.co/236x300/D4B896/D4B896",
      "https://placehold.co/472x200/6B8E4A/6B8E4A",
      "https://placehold.co/236x200/8FA663/8FA663",
    ],
    authorBio:
      "Stephen Ritz is a South Bronx educator and administrator who believes that students shouldn't have to leave their neighborhoods to live, learn, and earn in a better one. Stephen and his students have grown over 50,000 pounds of vegetables in the Bronx while generating extraordinary academic performance. His work has been featured by major networks and has inspired audiences globally.",
  };

  const reviews = [
    {
      id: 1,
      userName: "Anna",
      date: "March 10, 2023",
      rating: 5,
      avatar: "https://placehold.co/40x40/E8DECF/E8DECF",
      comment:
        "The Power of a Plant is a beautifully told life story of a teacher who has inspired his students and his community. I loved reading about the transformation and the motivation one teacher has to make the world a better place.",
      likes: 12,
      dislikes: 1,
    },
    {
      id: 2,
      userName: "Michael",
      date: "February 20, 2023",
      rating: 4.5,
      avatar: "https://placehold.co/40x40/D1BA94/D1BA94",
      comment:
        "Stephen Ritz's story is a great reminder of the importance of education and the potential of every child. Stephen shares his story in a way that is both inspiring and practical. A must-read for anyone who enjoys stories of hope and resilience.",
      likes: 8,
      dislikes: 0,
    },
  ];

  const relatedBooks = [
    {
      id: 1,
      title: "The Tree of Life",
      author: "Jane Goodall",
      image: "https://placehold.co/176x235/8B7355/8B7355",
    },
    {
      id: 2,
      title: "Roots of Change",
      author: "Alex Smith",
      image: "https://placehold.co/176x235/6B4423/6B4423",
    },
    {
      id: 3,
      title: "The Green Journey",
      author: "Lisa Green",
      image: "https://placehold.co/176x235/7A9B57/7A9B57",
    },
    {
      id: 4,
      title: "Seeds of Hope",
      author: "John Doe",
      image: "https://placehold.co/176x235/C4A373/C4A373",
    },
    {
      id: 5,
      title: "Branching Out",
      author: "Sarah Brown",
      image: "https://placehold.co/176x235/8B7355/8B7355",
    },
    {
      id: 6,
      title: "Leaf by Leaf",
      author: "Emily White",
      image: "https://placehold.co/176x235/D4B896/D4B896",
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 55, width: 187 },
    { stars: 4, percentage: 30, width: 102 },
    { stars: 3, percentage: 10, width: 34 },
    { stars: 2, percentage: 3, width: 10 },
    { stars: 1, percentage: 2, width: 7 },
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <svg
                key={index}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-filled"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.3203 7.93594L13.7969 11.0109L14.8523 15.5891C14.9665 16.0784 14.7766 16.5885 14.3703 16.884C13.964 17.1796 13.4202 17.2031 12.9898 16.9438L8.99687 14.5219L5.0125 16.9438C4.58216 17.2031 4.03836 17.1796 3.63203 16.884C3.22569 16.5885 3.03581 16.0784 3.15 15.5891L4.20391 11.0156L0.679688 7.93594C0.298576 7.60724 0.151757 7.08205 0.307166 6.60337C0.462575 6.12469 0.889898 5.78589 1.39141 5.74375L6.03672 5.34141L7.85 1.01641C8.04363 0.55236 8.49718 0.250156 9 0.250156C9.50282 0.250156 9.95637 0.55236 10.15 1.01641L11.9688 5.34141L16.6125 5.74375C17.114 5.78589 17.5413 6.12469 17.6967 6.60337C17.8521 7.08205 17.7053 7.60724 17.3242 7.93594H17.3203Z"
                  fill="#009963"
                />
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <svg
                key={index}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-half"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6875 6.60078C17.5328 6.12387 17.108 5.78556 16.6086 5.74141L11.9688 5.34141L10.15 1.01641C9.95637 0.55236 9.50282 0.250156 9 0.250156C8.49718 0.250156 8.04363 0.55236 7.85 1.01641L6.03672 5.34141L1.39141 5.74375C0.889898 5.78589 0.462575 6.12469 0.307166 6.60337C0.151757 7.08205 0.298576 7.60724 0.679688 7.93594L4.20391 11.0156L3.14766 15.5891C3.03347 16.0784 3.22335 16.5885 3.62968 16.884C4.03602 17.1796 4.57982 17.2031 5.01016 16.9438L8.99453 14.5219L12.9875 16.9438C13.4178 17.2031 13.9616 17.1796 14.368 16.884C14.7743 16.5885 14.9642 16.0784 14.85 15.5891L13.7945 11.0109L17.318 7.93594C17.6991 7.60609 17.8448 7.07963 17.6875 6.60078ZM16.4984 6.99141L12.975 10.0664C12.6255 10.3704 12.4728 10.8427 12.5781 11.2937L13.6367 15.875L9.64688 13.4531C9.25004 13.2115 8.75152 13.2115 8.35469 13.4531L4.37031 15.875L5.42188 11.2969C5.52719 10.8458 5.37447 10.3735 5.025 10.0695L1.5 6.99609C1.49971 6.99376 1.49971 6.9914 1.5 6.98906L6.14375 6.5875C6.60581 6.54677 7.00732 6.25353 7.18672 5.82578L9 1.50625L10.8125 5.82578C10.9919 6.25353 11.3934 6.54677 11.8555 6.5875L16.5 6.98906C16.5 6.98906 16.5 6.99375 16.5 6.99453L16.4984 6.99141Z"
                  fill="#009963"
                />
              </svg>
            );
          } else {
            return (
              <svg
                key={index}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-empty"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6875 6.60078C17.5328 6.12387 17.108 5.78556 16.6086 5.74141L11.9688 5.34141L10.15 1.01641C9.95637 0.55236 9.50282 0.250156 9 0.250156C8.49718 0.250156 8.04363 0.55236 7.85 1.01641L6.03672 5.34141L1.39141 5.74375C0.889898 5.78589 0.462575 6.12469 0.307166 6.60337C0.151757 7.08205 0.298576 7.60724 0.679688 7.93594L4.20391 11.0156L3.14766 15.5891C3.03347 16.0784 3.22335 16.5885 3.62968 16.884C4.03602 17.1796 4.57982 17.2031 5.01016 16.9438L8.99453 14.5219L12.9875 16.9438C13.4178 17.2031 13.9616 17.1796 14.368 16.884C14.7743 16.5885 14.9642 16.0784 14.85 15.5891L13.7945 11.0109L17.318 7.93594C17.6991 7.60609 17.8448 7.07963 17.6875 6.60078ZM16.4984 6.99141L12.975 10.0664C12.6255 10.3704 12.4728 10.8427 12.5781 11.2937L13.6367 15.875L9.64688 13.4531C9.25004 13.2115 8.75152 13.2115 8.35469 13.4531L4.37031 15.875L5.42188 11.2969C5.52719 10.8458 5.37447 10.3735 5.025 10.0695L1.5 6.99609C1.49971 6.99376 1.49971 6.9914 1.5 6.98906L6.14375 6.5875C6.60581 6.54677 7.00732 6.25353 7.18672 5.82578L9 1.50625L10.8125 5.82578C10.9919 6.25353 11.3934 6.54677 11.8555 6.5875L16.5 6.98906C16.5 6.98906 16.5 6.99375 16.5 6.99453L16.4984 6.99141Z"
                  fill="#D1BA94"
                />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Books", href: "/books" },
    { label: "Education", href: "/books/education" },
    { label: product.title },
  ];

  return (
    <div className="product-detail-page">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="product-content-container">
        {/* Product Main Section - Two Column Layout */}
        <div className="product-main-section">
          {/* Left Column - Images and Details */}
          <div className="product-left-column">
            {/* Product Header */}
            <div className="product-header">
              <div className="product-main-info">
                <h1 className="product-title">{product.title}</h1>
                <p className="product-author-date">
                  By {product.author} | Published {product.publishedDate}
                </p>
              </div>
            </div>

            {/* Product Description */}
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Product Gallery */}
            <div className="product-gallery">
              <div className="gallery-grid">
                <div className="gallery-row">
                  <img
                    src={product.images[0]}
                    alt="Product main"
                    className="gallery-image large"
                  />
                  <img
                    src={product.images[1]}
                    alt="Product view 2"
                    className="gallery-image medium"
                  />
                  <img
                    src={product.images[2]}
                    alt="Product view 3"
                    className="gallery-image medium"
                  />
                </div>
                <div className="gallery-row">
                  <img
                    src={product.images[3]}
                    alt="Product view 4"
                    className="gallery-image large"
                  />
                  <img
                    src={product.images[4]}
                    alt="Product view 5"
                    className="gallery-image medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Actions */}
          <div className="product-right-column">
            <div className="product-actions-wrapper">
              <ProductActions
                price={product.price}
                originalPrice={product.price + 5}
                stockQuantity={15}
                onAddToCart={(quantity) =>
                  console.log("Add to cart:", quantity)
                }
                onBuyNow={(quantity) => console.log("Buy now:", quantity)}
                onAddToWishlist={() => console.log("Add to wishlist")}
              />
            </div>
          </div>
        </div>

        {/* Book Details */}
        <section className="book-details-section">
          <h2 className="section-title">Book Details</h2>
          <div className="book-details">
            <div className="detail-row">
              <span className="detail-label">Publisher</span>
              <span className="detail-value">{product.publisher}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Price</span>
              <span className="detail-value">${product.price}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Page Count</span>
              <span className="detail-value">{product.pageCount} pages</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">ISBN</span>
              <span className="detail-value">{product.isbn}</span>
            </div>
          </div>
        </section>

        {/* About the Author */}
        <section className="author-section">
          <h2 className="section-title">About the Author</h2>
          <div className="author-content">
            <p>{product.authorBio}</p>
          </div>
        </section>

        {/* Ratings & Reviews */}
        <section className="ratings-section">
          <h2 className="section-title">Ratings & Reviews</h2>
          <div className="ratings-overview">
            <div className="rating-summary">
              <div className="rating-score">4.5</div>
              <div className="rating-stars">{renderStars(4.5)}</div>
              <div className="rating-count">
                {product.totalReviews.toLocaleString()} reviews
              </div>
            </div>

            <div className="rating-distribution">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="rating-bar-row">
                  <span className="rating-number">{item.stars}</span>
                  <div className="rating-bar-container">
                    <div
                      className="rating-bar-fill"
                      style={{ width: `${item.width}px` }}
                    />
                  </div>
                  <span className="rating-percentage">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="review-avatar"
                  />
                  <div className="review-user-info">
                    <div className="review-user-name">{review.userName}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
                <div className="review-comment">{review.comment}</div>
                <div className="review-actions">
                  <button className="review-action">
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.2812 5.25938C16.9252 4.85594 16.4131 4.62489 15.875 4.625H11.5V3.375C11.5 1.64911 10.1009 0.25 8.375 0.25C8.13818 0.24983 7.9216 0.383527 7.81563 0.595312L4.86406 6.5H1.5C0.809644 6.5 0.25 7.05964 0.25 7.75V14.625C0.25 15.3154 0.809644 15.875 1.5 15.875H14.9375C15.8827 15.8753 16.6803 15.1721 16.7984 14.2344L17.7359 6.73438C17.8032 6.20023 17.6375 5.66297 17.2812 5.25938ZM1.5 7.75H4.625V14.625H1.5V7.75ZM16.4953 6.57812L15.5578 14.0781C15.5184 14.3907 15.2526 14.6251 14.9375 14.625H5.875V7.27266L8.74297 1.53594C9.61946 1.71136 10.2502 2.48112 10.25 3.375V5.25C10.25 5.59518 10.5298 5.875 10.875 5.875H15.875C16.0544 5.87494 16.2252 5.95198 16.3439 6.08652C16.4626 6.22106 16.5177 6.40012 16.4953 6.57812Z"
                        fill="#A1824A"
                      />
                    </svg>
                    <span>{review.likes}</span>
                  </button>
                  <button className="review-action">
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.7359 9.26562L16.7984 1.76562C16.6803 0.827882 15.8827 0.124676 14.9375 0.125H1.5C0.809644 0.125 0.25 0.684644 0.25 1.375V8.25C0.25 8.94036 0.809644 9.5 1.5 9.5H4.86406L7.81563 15.4047C7.9216 15.6165 8.13818 15.7502 8.375 15.75C10.1009 15.75 11.5 14.3509 11.5 12.625V11.375H15.875C16.4132 11.3752 16.9256 11.1441 17.2817 10.7404C17.6378 10.3368 17.8032 9.79964 17.7359 9.26562ZM4.625 8.25H1.5V1.375H4.625V8.25ZM16.3438 9.91328C16.2259 10.0489 16.0547 10.1262 15.875 10.125H10.875C10.5298 10.125 10.25 10.4048 10.25 10.75V12.625C10.2502 13.5189 9.61946 14.2886 8.74297 14.4641L5.875 8.72734V1.375H14.9375C15.2526 1.37489 15.5184 1.60929 15.5578 1.92188L16.4953 9.42188C16.519 9.59995 16.4636 9.77949 16.3438 9.91328Z"
                        fill="#A1824A"
                      />
                    </svg>
                    <span>{review.dislikes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Books */}
        <section className="related-books-section">
          <h2 className="section-title">Related Books</h2>
          <div className="related-books-grid">
            <div className="related-books-row">
              {relatedBooks.slice(0, 5).map((book) => (
                <div key={book.id} className="related-book-item">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="related-book-image"
                  />
                  <div className="related-book-info">
                    <div className="related-book-title">{book.title}</div>
                    <div className="related-book-author">By {book.author}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="related-books-row">
              <div className="related-book-item">
                <img
                  src={relatedBooks[5].image}
                  alt={relatedBooks[5].title}
                  className="related-book-image"
                />
                <div className="related-book-info">
                  <div className="related-book-title">
                    {relatedBooks[5].title}
                  </div>
                  <div className="related-book-author">
                    By {relatedBooks[5].author}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
