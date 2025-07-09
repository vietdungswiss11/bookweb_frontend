import React, { useState, useRef } from "react";
import './FlashSale.css';
import { useNavigate } from "react-router-dom";
import { getBooksOnSale } from '../services/bookService';

interface SaleBook {
  id: string;
  title: string;
  image: string;
  discountPrice: number;
  originalPrice: number;
  discountPercent: number;
  sold: number;
  total: number;
  progressColor?: string;
  images: any[];
}

const CARD_WIDTH = 280;
const VISIBLE = 5;

const FlashSale: React.FC = () => {
  const [saleBooks, setSaleBooks] = useState<SaleBook[]>([]);
  const [currentScroll, setCurrentScroll] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    getBooksOnSale().then((data) => {
      // Giả sử API trả về mảng sách, cần map về đúng SaleBook
      const mapped = (data.books || data).map((book: any) => ({
        id: book.id,
        title: book.title,
        image: book.image,
        discountPrice: book.discountPrice ?? book.price ?? 0,
        originalPrice: book.originalPrice ?? book.oldPrice ?? 0,
        discountPercent: book.discountPercent ?? (book.originalPrice && book.discountPrice ? (1 - book.discountPrice / book.originalPrice) : 0),
        sold: book.sold ?? 0,
        total: book.total ?? 20,
        progressColor: 'progress-red',
        images: book.images || [],
      }));
      setSaleBooks(mapped);
    });
  }, []);

  const scrollBooks = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = scrollContainerRef.current.clientWidth;
    let newScrollPosition =
      direction === 'right'
        ? currentScroll + scrollAmount
        : currentScroll - scrollAmount;

    const maxScroll =
      scrollContainerRef.current.scrollWidth -
      scrollContainerRef.current.clientWidth;

    newScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScroll));
    setCurrentScroll(newScrollPosition);
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${currentScroll}px)`;
    }
  }, [currentScroll]);

  // Countdown giả lập
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 28, seconds: 36 });
  React.useEffect(() => {
    const endTime = Date.now() + (59 * 60 + 36) * 1000; // Start from 28:36
    const timer = setInterval(() => {
      const timeLeft = endTime - Date.now();
      if (timeLeft > 0) {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown({ hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showScrollButtons = saleBooks.length > VISIBLE;

  return (
    <div className="flash-sale-container">
      <div className="flash-sale-content">
        <div className="flash-sale-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span className="flash-sale-title">FLASH SALE</span>
            <div className="flash-sale-countdown">
              <span className="flash-sale-countdown-label">Kết thúc trong</span>
              <div className="flash-sale-countdown-box">{String(countdown.hours).padStart(2, '0')}</div>
              <span style={{ color: 'black', fontWeight: 700 }}>:</span>
              <div className="flash-sale-countdown-box">{String(countdown.minutes).padStart(2, '0')}</div>
              <span style={{ color: 'black', fontWeight: 700 }}>:</span>
              <div className="flash-sale-countdown-box">{String(countdown.seconds).padStart(2, '0')}</div>
            </div>
          </div>
          <a href="#" className="flash-sale-viewall" onClick={e => { e.preventDefault(); navigate('/category/tat-ca'); }}>Xem tất cả →</a>
        </div>
        <div className="flash-sale-scroll" ref={scrollContainerRef}>
          {showScrollButtons && (
            <button
              onClick={() => scrollBooks('left')}
              disabled={currentScroll <= 0}
              className="flash-sale-btn left"
            >
              ‹
            </button>
          )}
          <div ref={scrollRef} className="flash-sale-books">
            {saleBooks.map((book) => {
              const percent = Math.round((book.sold / book.total) * 100);
              return (
                <div
                  key={book.id}
                  className="flash-sale-book-card"
                  onClick={() => navigate(`/product/${book.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={book.images && book.images.length > 0 ? book.images[0].url : book.image}
                    alt={book.title}
                    className="flash-sale-book-img"
                  />
                  <h3 className="flash-sale-book-title">{book.title}</h3>
                  <div className="flash-sale-book-prices">
                    <span className="flash-sale-book-price">{book.discountPrice.toLocaleString()} đ</span>
                    {book.originalPrice > book.discountPrice && <span className="flash-sale-book-oldprice">{book.originalPrice.toLocaleString()}</span>}
                    {book.discountPercent > 0 && <span className="flash-sale-book-discount">-{Math.round(book.discountPercent * 100)}%</span>}
                  </div>
                  <div className="flash-sale-progress-bg">
                    <div className="flash-sale-progress-bar" style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="flash-sale-book-sold">Đã bán {book.sold}</div>
                </div>
              );
            })}
          </div>
          {showScrollButtons && (
            <button
              onClick={() => scrollBooks('right')}
              disabled={
                !scrollContainerRef.current ||
                currentScroll >=
                scrollContainerRef.current.scrollWidth -
                scrollContainerRef.current.clientWidth
              }
              className="flash-sale-btn right"
            >
              ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;