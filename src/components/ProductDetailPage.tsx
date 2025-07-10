import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailPage.css";
import Breadcrumbs from "./Breadcrumbs";
import ProductActions from "./ProductActions";
import { getBookById, getRelatedBooks } from "../services/bookService";
import { useCartApi } from "../hooks/useCartApi";
import {
  getReviewsByBookId,
  createReview,
  updateReview,
  deleteReview,
} from "../services/reviewService";
import Header from "./Header";
import Footer from "./Footer";

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

interface ReviewDTO {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
  user: { id: number; name: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { bookId } = useParams<{ bookId: string }>();
  console.log("Component render, bookId param:", bookId);
  const [selectedRatingFilter, setSelectedRatingFilter] =
    useState<string>("all");
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { addToCart } = useCartApi(userId || "");
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [relatedBooks, setRelatedBooks] = useState<any[]>([]);
  const [editingReview, setEditingReview] = useState<ReviewDTO | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    console.log("useEffect run, bookId:", bookId);
    if (bookId) {
      const realId = bookId.split("-").pop();
      const id = parseInt(realId || "", 10);
      console.log("Parsed realId:", realId, "Parsed id:", id);
      if (!isNaN(id)) {
        console.log("Calling getBookById with id:", id);
        getBookById(id).then((data) => {
          console.log("Data from getBookById:", data);
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setSelectedImage(data.images[0].url);
          } else {
            setSelectedImage("https://placehold.co/472x300");
          }
          getReviewsByBookId(id).then((data) =>
            setReviews(Array.isArray(data) ? data : []),
          );
          getRelatedBooks(id, 5).then((books) => {
            setRelatedBooks(
              Array.isArray(books) ? books.filter((b) => b.id !== id) : [],
            );
          });
        });
      }
    }
  }, [bookId]);

  useEffect(() => {
    if (userId) {
      const myReview = reviews.find((r) => r.user?.id?.toString() === userId);
      if (myReview) {
        setReviewContent(myReview.content);
        setReviewRating(myReview.rating);
      } else {
        setReviewContent("");
        setReviewRating(5);
      }
    }
  }, [reviews, userId]);

  if (!product) return <div>Loading...</div>;

  const ratingDistribution = [
    { stars: 5, count: 473, percentage: 71 },
    { stars: 4, count: 115, percentage: 17 },
    { stars: 3, count: 45, percentage: 7 },
    { stars: 2, count: 25, percentage: 4 },
    { stars: 1, count: 13, percentage: 2 },
  ];

  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const filteredReviews = safeReviews.filter((review) => {
    if (selectedRatingFilter === "all") return true;
    const filterNum = parseInt(selectedRatingFilter);
    return review.rating === filterNum;
  });

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="star-list">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index < fullStars ? "star star-full" : "star star-empty"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== "number" || isNaN(price)) return "N/A";
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tất cả sách", href: "/category/tat-ca" },
    { label: product.title },
  ];

  const handleAddToCart = () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    addToCart(product.id, quantity);
    alert("Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để mua hàng!");
      return;
    }
    addToCart(product.id, quantity);
    navigate("/cart");
  };

  const myReview = userId
    ? reviews.find((r) => r.user?.id?.toString() === userId)
    : null;

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("Bạn cần đăng nhập để đánh giá!");
      return;
    }
    const reviewDTO = {
      content: reviewContent,
      rating: reviewRating,
      book: { id: product.id },
    };
    if (myReview) {
      await updateReview(myReview.id, reviewDTO);
    } else {
      await createReview(reviewDTO);
    }
    getReviewsByBookId(product.id).then((data) =>
      setReviews(Array.isArray(data) ? data : []),
    );
    setEditingReview(null);
    setShowReviewForm(false);
  };

  const handleDeleteReview = async () => {
    if (myReview) {
      await deleteReview(myReview.id);
      getReviewsByBookId(product.id).then((data) =>
        setReviews(Array.isArray(data) ? data : []),
      );
      setEditingReview(null);
      setShowReviewForm(false);
    }
  };

  return (
    <>
      <Header />
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
                      Tác giả {product.author} | Xuất bản {product.publicationDate}
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
                    {(product.images && product.images.length > 0
                      ? product.images.map((img: any) => img.url)
                      : ["https://placehold.co/472x300"]
                    ).map((img: string, idx: number) => (
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
                    <a
                      href="#"
                      className="icon-social facebook"
                      title="Facebook"
                    ></a>
                    <a
                      href="#"
                      className="icon-social messenger"
                      title="Messenger"
                    ></a>
                    <a
                      href="#"
                      className="icon-social pinterest"
                      title="Pinterest"
                    ></a>
                    <a
                      href="#"
                      className="icon-social twitter"
                      title="Twitter"
                    ></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Actions */}
            <div className="product-right-column">
              <div className="product-actions-wrapper">
                <div className="product-price-row">
                  <span className="product-price">
                    {formatPrice(product.discountPrice)}
                  </span>
                  {product.originalPrice > product.discountPrice && (
                    <span className="product-original-price">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="product-discount-percent">
                      -{Math.round(product.discountPercent * 100)}%
                    </span>
                  )}
                </div>
                <div className="product-save">
                  Tiết kiệm{" "}
                  {formatPrice(
                    (product.originalPrice || 0) - (product.discountPrice || 0),
                  )}
                  {product.discountPercent > 0 && (
                    <> ({Math.round(product.discountPercent * 100)}%)</>
                  )}
                </div>
                <div className="product-rating-row">
                  {renderStars(product.rating)}
                  <span className="product-rating-value">{product.rating}</span>
                  <span className="product-rating-count">
                    ({product.totalReviews} đánh giá)
                  </span>
                </div>
                {typeof product.averageRating === "number" && (
                  <div className="average-rating">
                    Trung bình: {product.averageRating.toFixed(1)} / 5
                  </div>
                )}
                <div className="product-qty-row">
                  <label className="product-qty-label" htmlFor="product-qty">
                    Số lượng:
                  </label>
                  <input
                    id="product-qty"
                    type="number"
                    min="1"
                    max="15"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, Math.min(15, Number(e.target.value))),
                      )
                    }
                    className="product-qty-input"
                  />
                  <span className="product-qty-stock">
                    Đã bán {product.sold}
                  </span>
                </div>
                <button className="btn-add-cart" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </button>
                <button className="btn-buy" onClick={handleBuyNow}>
                  Mua ngay
                </button>
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
            <h2 className="section-title">Chi tiết sản phẩm</h2>
            <div className="book-details">
              <div className="detail-row">
                <span className="detail-label">Nhà xuất bản</span>
                <span className="detail-value">{product.publisher ? product.publisher : "Không có"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Giá bán</span>
                <span className="detail-value">
                  {formatPrice(product.discountPrice)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Giá gốc</span>
                <span className="detail-value">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tiết kiệm</span>
                <span className="detail-value">
                  {formatPrice(
                    (product.originalPrice || 0) - (product.discountPrice || 0),
                  )}{" "}
                  {product.discountPercent > 0 && (
                    <>({Math.round(product.discountPercent * 100)}%)</>
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Số trang</span>
                <span className="detail-value">{product.pageCount ? product.pageCount : "Chưa cập nhật "}</span>
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
            <h2 className="section-title">Tiểu sử về tác giả</h2>
            <div className="author-content">
              <p>{product.authorBio ? product.authorBio : "Tác giả sinh ra và lớn lên ở một làng quê nhỏ nông thôn và là một người đam mê viết lách, với mong muốn mãnh liệt"
               +" lan toả tri thức và truyền cảm hứng đến các độc giả qua từng trang sách"}</p>
            </div>
          </section>

          {/* Ratings & Reviews */}
          <section className="ratings-section">
            <h2 className="section-title">Ratings & Reviews</h2>
            <div className="ratings-overview">
              <div className="rating-summary">
                <div className="average-rating-number">
                  {typeof product.averageRating === "number"
                    ? product.averageRating.toFixed(1)
                    : "-"}
                </div>
                <div className="rating-count">
                  {product.totalReviews} reviews
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
                Tất cả ({reviews.length})
              </button>
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(
                  (review) => review.rating === rating,
                ).length;
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
              {/* Nếu đã đăng nhập, hiển thị nút viết/chỉnh sửa đánh giá */}
              {userId && (
                <div style={{ textAlign: "center", marginBottom: 18 }}>
                  <button
                    className="btn-review-toggle"
                    onClick={() => setShowReviewForm((v) => !v)}
                    style={{
                      background:
                        "linear-gradient(90deg, #e53935 60%, #ff7043 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 32px",
                      fontSize: 17,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(229, 57, 53, 0.10)",
                      marginBottom: 8,
                    }}
                  >
                    {myReview
                      ? showReviewForm
                        ? "Đóng"
                        : "Chỉnh sửa đánh giá"
                      : showReviewForm
                        ? "Đóng"
                        : "Viết đánh giá"}
                  </button>
                </div>
              )}
              {/* Form đánh giá chỉ hiển thị khi showReviewForm = true */}
              {userId && showReviewForm && (
                <form className="review-form" onSubmit={handleReviewSubmit}>
                  <div style={{ marginBottom: 8 }}>
                    <label>Đánh giá của bạn: </label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                    >
                      {[5, 4, 3, 2, 1].map((star) => (
                        <option key={star} value={star}>
                          {star} sao
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Nhập nhận xét của bạn..."
                    rows={3}
                    style={{ width: "100%", marginBottom: 8 }}
                    required
                  />
                  <div>
                    <button type="submit" className="btn-review-submit">
                      {myReview ? "Cập nhật đánh giá" : "Gửi đánh giá"}
                    </button>
                    {myReview && (
                      <button
                        type="button"
                        className="btn-review-delete"
                        style={{ marginLeft: 8, color: "red" }}
                        onClick={handleDeleteReview}
                      >
                        Xóa đánh giá
                      </button>
                    )}
                  </div>
                </form>
              )}
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id} className="review-item shopee-review">
                    <div className="review-header-row">
                      <span className="review-user-name">
                        {review.user?.name || "Ẩn danh"}
                      </span>
                      <span className="review-stars-row">
                        {renderStars(review.rating)}
                      </span>
                    </div>
                    <div className="review-date-quality-row">
                      <span className="review-date">{review.createdAt}</span>
                    </div>
                    <div className="review-comment">{review.content}</div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">Không có đánh giá nào.</div>
              )}
            </div>
          </section>

          {/* Related Books */}
          <section className="related-books-section">
            <h2 className="section-title">Related Books</h2>
            <div className="related-books-grid">
              {relatedBooks.map((book) => (
                <div
                  key={book.id}
                  className="related-book-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/product/${book.id}`)}
                >
                  <img
                    src={
                      book.images?.[0]?.url || "https://placehold.co/176x235"
                    }
                    alt={book.title}
                    className="related-book-image"
                  />
                  <div className="related-book-info">
                    <div className="related-book-title">{book.title}</div>
                    <div className="related-book-author">By {book.author}</div>
                    <div className="related-book-price">
                      {formatPrice(book.discountPrice)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
