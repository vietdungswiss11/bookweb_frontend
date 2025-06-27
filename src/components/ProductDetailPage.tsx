import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailPage.css";
import Breadcrumbs from "./Breadcrumbs";
import ProductActions from "./ProductActions";
import { getBookById } from "../services/bookService";

interface ProductDetailPageProps {
  productId?: string;
}

interface Review {
  id: number;
  userName: string;
  date: string;
  rating: number;
  avatar: string;
  comment: string;
  likes: number;
  dislikes: number;
  verified: boolean;
  images?: string[];
}

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { bookId } = useParams<{ bookId: string }>();
  console.log("Component render, bookId param:", bookId);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<string>("all");
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect run, bookId:", bookId);
    if (bookId) {
      const realId = bookId.split('-').pop();
      const id = parseInt(realId || '', 10);
      console.log("Parsed realId:", realId, "Parsed id:", id);
      if (!isNaN(id)) {
        console.log("Calling getBookById with id:", id);
        getBookById(id).then((data) => {
          console.log("Data from getBookById:", data);
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setSelectedImage(data.images[0]);
          } else {
            setSelectedImage("https://placehold.co/472x300");
          }
        });
      }
    }
  }, [bookId]);

  if (!product) return <div>Loading...</div>;

  const allReviews: Review[] = [
    {
      id: 1,
      userName: "Minh Tuấn",
      date: "10 tháng 3, 2024",
      rating: 5,
      avatar: "https://placehold.co/40x40/E8DECF/E8DECF",
      comment: "Sức Mạnh Của Một Cây là một câu chuyện cuộc đời được kể một cách tuyệt đẹp về một giáo viên đã truyền cảm hứng cho học sinh và cộng đồng của mình. Tôi thích đọc về sự biến đổi và động lực mà một giáo viên có để làm cho thế giới trở nên tốt đẹp hơn.",
      likes: 24,
      dislikes: 2,
      verified: true
    },
    {
      id: 2,
      userName: "Thu Hương",
      date: "20 tháng 2, 2024",
      rating: 5,
      avatar: "https://placehold.co/40x40/D1BA94/D1BA94",
      comment: "Câu chuyện của Stephen Ritz là lời nhắc nhở tuyệt vời về tầm quan trọng của giáo dục và tiềm năng của mọi đứa trẻ. Stephen chia sẻ câu chuyện của mình theo cách vừa truyền cảm hứng vừa thực tế. Một cuốn sách phải đọc cho bất kỳ ai thích những câu chuyện về hy vọng và khả năng phục hồi.",
      likes: 18,
      dislikes: 0,
      verified: true
    },
    {
      id: 3,
      userName: "Đức Anh",
      date: "15 tháng 1, 2024",
      rating: 4,
      avatar: "https://placehold.co/40x40/C4A373/C4A373",
      comment: "Cuốn sách hay, nội dung bổ ích. Tác giả viết rất chân thành và có nhiều bài học quý giá. Tuy nhiên, một số phần hơi dài dòng.",
      likes: 12,
      dislikes: 1,
      verified: false
    },
    {
      id: 4,
      userName: "Lan Anh",
      date: "8 tháng 1, 2024",
      rating: 5,
      avatar: "https://placehold.co/40x40/8FA663/8FA663",
      comment: "Tuyệt vời! Đây là cuốn sách mọi người trong lĩnh vực giáo dục nên đọc. Rất truyền cảm hứng và thiết thực.",
      likes: 31,
      dislikes: 0,
      verified: true
    },
    {
      id: 5,
      userName: "Hoàng Nam",
      date: "28 tháng 12, 2023",
      rating: 4,
      avatar: "https://placehold.co/40x40/7A9B57/7A9B57",
      comment: "Nội dung tốt, cách trình bày dễ hiểu. Sản phẩm đóng gói cẩn thận, giao hàng nhanh.",
      likes: 8,
      dislikes: 0,
      verified: true
    },
    {
      id: 6,
      userName: "Mai Phương",
      date: "15 tháng 12, 2023",
      rating: 3,
      avatar: "https://placehold.co/40x40/6B8E4A/6B8E4A",
      comment: "Cuốn sách ổn, nhưng không như mong đợi. Một số ý tưởng hay nhưng chưa thực sự thuyết phục.",
      likes: 5,
      dislikes: 3,
      verified: false
    }
  ];

  const relatedBooks: Book[] = [
    {
      id: 1,
      title: "Cây Đời",
      author: "Jane Goodall",
      price: 250000,
      image: "https://placehold.co/176x235/8B7355/8B7355",
    },
    {
      id: 2,
      title: "Nguồn Gốc Thay Đổi",
      author: "Alex Smith",
      price: 320000,
      image: "https://placehold.co/176x235/6B4423/6B4423",
    },
    {
      id: 3,
      title: "Hành Trình Xanh",
      author: "Lisa Green",
      price: 280000,
      image: "https://placehold.co/176x235/7A9B57/7A9B57",
    },
    {
      id: 4,
      title: "Hạt Giống Hy Vọng",
      author: "John Doe",
      price: 350000,
      image: "https://placehold.co/176x235/C4A373/C4A373",
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 473, percentage: 71 },
    { stars: 4, count: 115, percentage: 17 },
    { stars: 3, count: 45, percentage: 7 },
    { stars: 2, count: 25, percentage: 4 },
    { stars: 1, count: 13, percentage: 2 },
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="star-list">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <span key={index} className="star star-full">★</span>;
          } else if (index === fullStars && hasHalfStar) {
            return <span key={index} className="star star-half">☆</span>;
          } else {
            return <span key={index} className="star star-empty">☆</span>;
          }
        })}
      </div>
    );
  };

  const filteredReviews = selectedRatingFilter === "all"
    ? allReviews
    : allReviews.filter(review => review.rating === parseInt(selectedRatingFilter));

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== "number" || isNaN(price)) return "N/A";
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
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
                  By {product.author} | Published {product.publicationDate}
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
                <img
                  src={selectedImage}
                  alt="Ảnh sản phẩm chính"
                  className="gallery-image large"
                />
                <div className="gallery-thumbnails">
                  {(product.images && product.images.length > 0 ? product.images : ["https://placehold.co/472x300"]).map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Ảnh sản phẩm ${idx + 1}`}
                      className={`gallery-thumbnail${selectedImage === img ? " active" : ""}`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
                <div className="gallery-social">
                  <span>Chia sẻ:</span>
                  <a href="#" className="icon-social facebook" title="Facebook"></a>
                  <a href="#" className="icon-social messenger" title="Messenger"></a>
                  <a href="#" className="icon-social pinterest" title="Pinterest"></a>
                  <a href="#" className="icon-social twitter" title="Twitter"></a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Actions */}
          <div className="product-right-column">
            <div className="product-actions-wrapper">
              <div className="product-price-row">
                <span className="product-price">{formatPrice(product.discountPrice)}</span>
                {product.originalPrice > product.discountPrice && (
                  <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
                )}
                {product.discountPercent > 0 && (
                  <span className="product-discount-percent">-{Math.round(product.discountPercent * 100)}%</span>
                )}
              </div>
              <div className="product-save">
                Tiết kiệm {formatPrice((product.originalPrice || 0) - (product.discountPrice || 0))}
                {product.discountPercent > 0 && (
                  <> ({Math.round(product.discountPercent * 100)}%)</>
                )}
              </div>
              <div className="product-rating-row">
                {renderStars(product.rating)}
                <span className="product-rating-value">{product.rating}</span>
                <span className="product-rating-count">({product.totalReviews} đánh giá)</span>
              </div>
              <div className="product-qty-row">
                <label className="product-qty-label" htmlFor="product-qty">Số lượng:</label>
                <input id="product-qty" type="number" min="1" max="15" defaultValue="1" className="product-qty-input" />
                <span className="product-qty-stock">Đã bán {product.sold}</span>
              </div>
              <button className="btn-add-cart" onClick={() => navigate('/cart')}>Thêm vào giỏ hàng</button>
              <button className="btn-buy">Mua ngay</button>
              <div className="product-status-row">
                <span>Tình trạng:</span>
                <span className="product-in-stock">Còn hàng</span>
              </div>
              <div className="product-status-row">
                <span>Giao hàng:</span>
                <span>Miễn phí</span>
              </div>
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
              <span className="detail-label">Giá bán</span>
              <span className="detail-value">{formatPrice(product.discountPrice)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Giá gốc</span>
              <span className="detail-value">{formatPrice(product.originalPrice)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Tiết kiệm</span>
              <span className="detail-value">{formatPrice((product.originalPrice || 0) - (product.discountPrice || 0))} {product.discountPercent > 0 && <>({Math.round(product.discountPercent * 100)}%)</>}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Page Count</span>
              <span className="detail-value">{product.pageCount} pages</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">ISBN</span>
              <span className="detail-value">{product.isbn}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Đã bán</span>
              <span className="detail-value">{product.sold}</span>
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
              <div className="rating-score">{product.rating}</div>
              <div className="rating-stars">{renderStars(product.rating)}</div>
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
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="rating-percentage">({item.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="rating-filter">
            <span className="filter-label">Lọc theo đánh giá:</span>
            <button
              className={`filter-btn${selectedRatingFilter === "all" ? " active" : ""}`}
              onClick={() => setSelectedRatingFilter("all")}
            >
              Tất cả ({allReviews.length})
            </button>
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = allReviews.filter(review => review.rating === rating).length;
              return (
                <button
                  key={rating}
                  className={`filter-btn${selectedRatingFilter === rating.toString() ? " active" : ""}`}
                  onClick={() => setSelectedRatingFilter(rating.toString())}
                >
                  {rating} Sao ({count})
                </button>
              );
            })}
          </div>

          {/* Reviews List */}
          <div className="reviews-list">
            {filteredReviews.map((review) => (
              <div key={review.id} className="review-item shopee-review">
                <div className="review-header-row">
                  <img src={review.avatar} alt={review.userName} className="review-avatar" />
                  <span className="review-user-name">{review.userName}</span>
                  <span className="review-stars-row">{renderStars(review.rating)}</span>
                </div>
                <div className="review-date-quality-row">
                  <span className="review-date">{review.date}</span>
                  <span className="review-quality">Chất lượng sản phẩm: <b>tốt</b></span>
                </div>
                <div className="review-highlight">Tính năng nổi bật: sạc, ko cần dùng pin, điều chỉnh được tốc độ chuột, dùng được cho cả đt và máy tính bảng</div>
                <div className="review-comment">{review.comment}</div>
                <div className="review-footer">
                  <span className="review-like">
                    <svg width="18" height="18" fill="#888"><path d="M9 16l-1.45-1.32C3.4 10.36 0 8.28 0 5.5 0 3.42 1.42 2 3.5 2c1.54 0 3.04.99 3.57 2.36h1.87C11.46 2.99 12.96 2 14.5 2 16.58 2 18 3.42 18 5.5c0 2.78-3.4 4.86-7.55 9.18L9 16z" /></svg>
                    {review.likes}
                  </span>
                </div>
              </div>
            ))}
            {filteredReviews.length === 0 && (
              <div className="no-reviews">Không có đánh giá nào với mức sao đã chọn.</div>
            )}
          </div>
        </section>

        {/* Related Books */}
        <section className="related-books-section">
          <h2 className="section-title">Related Books</h2>
          <div className="related-books-grid">
            {relatedBooks.map((book) => (
              <div key={book.id} className="related-book-item">
                <img
                  src={book.image}
                  alt={book.title}
                  className="related-book-image"
                />
                <div className="related-book-info">
                  <div className="related-book-title">{book.title}</div>
                  <div className="related-book-author">By {book.author}</div>
                  <div className="related-book-price">{formatPrice(book.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
