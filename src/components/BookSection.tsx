import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookSection.css";
import { Star } from 'lucide-react';
import { Sparkles } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  image: string;
  author?: string;
  price?: number | string;
  originalPrice?: number;
  discount?: number;
  rating?: number | string;
  soldCount?: number;
  discountPrice?: number;
  discountPercent?: number;
  sold?: number;
  images?: { url: string }[];
}

interface BookSectionProps {
  title: string;
  books: Book[] | Book[][];
  variant?: "recommended" | "new-releases";
  showScrollIndicator?: boolean;
}

const BookSection: React.FC<BookSectionProps> = ({
  title,
  books,
  variant = "recommended",
  showScrollIndicator = false,
}) => {
  const isNewReleases = variant === "new-releases";
  const navigate = useNavigate();

  // Hàm chuẩn hóa tên danh mục cho URL
  const toUrlFriendly = (str: string) =>
    str
      .normalize('NFD')
      .replace(/\u0300|\u0301|\u0303|\u0309|\u0323|\u02C6|\u0306|\u031B/g, '')
      .replace(/[\u00C0-\u00C3\u00C8-\u00CA\u00CC-\u00CD\u00D2-\u00D5\u00D9-\u00DA\u00DD\u00E0-\u00E3\u00E8-\u00EA\u00EC-\u00ED\u00F2-\u00F5\u00F9-\u00FA\u00FD\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-').toLowerCase();

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />)}
        {halfStar && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 fill-current" />)}
      </div>
    )
  }

  return (
    <section className={`book-section ${variant}`}>
      <div className="section-title-container" >
        <div className="section-title-sparkle">
          <Sparkles className="sparkle-icon" />
          <h2 className="section-title">{title}</h2>
          <Sparkles className="sparkle-icon" />
      </div>
        {title === 'Danh mục sản phẩm' && (
          <button
            className="see-all-btn"
            style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
            onClick={() => navigate('/category/tat-ca')}
          >
            Xem tất cả →
          </button>
        )}
      </div>

      <div className="books-container">
        {isNewReleases ? (
          <div className="new-releases-grid">
            {(books[0] as Book[]).map((book) => (
              <div key={book.id} className="new-release-card" onClick={() => navigate(`/product/${book.id}`)}>
                <div className="new-release-image-container">
                  <img src={book.images && book.images.length > 0 ? book.images[0].url : book.image || 'https://placehold.co/80x110'} alt={book.title} className="new-release-image" />
                </div>
                <div className="new-release-info">
                  <h3 className="new-release-title">{book.title}</h3>
                  <div className="new-release-price-container">
                    <span className="new-release-price">{(book.discountPrice ?? 0).toLocaleString('vi-VN')} đ</span>
                    {(book.discountPercent ?? 0) > 0 && (
                      <span className="new-release-discount">-{Math.round((book.discountPercent ?? 0) * 100)}%</span>
                    )}
                  </div>
                  {(book.originalPrice ?? 0) > (book.discountPrice ?? 0) && (
                    <span className="new-release-original-price">{(book.originalPrice ?? 0).toLocaleString('vi-VN')} đ</span>
                  )}
                  <div className="new-release-meta">
                    {book.rating && renderStars(Number(book.rating))}
                    <span className="new-release-sold">Đã bán {book.sold}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="books-scroll">
            {(books as Book[][]).flat().map((book) => (
              <div
                key={book.id}
                className="book-card"
                onClick={() => title === 'Danh mục sản phẩm' ? navigate(`/category/${book.id}`) : navigate(`/product/${book.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={book.images && book.images.length > 0 ? book.images[0].url : book.image || 'https://placehold.co/80x110'} alt={book.title} className="book-image" />
                <div className="book-info">
                  <div className="book-title">{book.title}</div>
                  {book.author && (
                    <div className="book-author">{book.author}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSection;
