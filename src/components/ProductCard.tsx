import React from "react";
import "./ProductCard.css";
import { Product } from "./ProductListingPage";
import { useCart } from "../store/CartContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="card-stars">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <svg
                key={index}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-filled"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.6162 5.2817L9.23793 7.35738L9.88984 10.4476C9.95243 10.7779 9.8397 11.1222 9.58329 11.3217C9.32687 11.5212 8.97336 11.5371 8.69317 11.3619L5.99789 9.72478L3.30844 11.3619C3.02825 11.5371 2.67474 11.5212 2.41832 11.3217C2.16191 11.1222 2.04917 10.7779 2.11177 10.4476L2.76264 7.36055L0.38391 5.2817C0.151539 5.05989 0.0649357 4.71788 0.158837 4.40727C0.252738 4.09666 0.516181 3.88047 0.839202 3.85203L3.99979 3.53045L5.2575 0.611074C5.38445 0.29767 5.67309 0.0938599 6 0.0938599C6.32691 0.0938599 6.61555 0.29767 6.7425 0.611074L8.00021 3.53045L11.1608 3.85203C11.4838 3.88047 11.7473 4.09666 11.8412 4.40727C11.9351 4.71788 11.8485 5.05989 11.6161 5.2817H11.6162Z"
                  fill="#009963"
                />
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <svg
                key={index}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-half"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8656 4.40327C11.7596 4.09387 11.5101 3.87835 11.2031 3.85203L8.00021 3.53045L6.7425 0.611074C6.61555 0.29767 6.32691 0.0938599 6 0.0938599C5.67309 0.0938599 5.38445 0.29767 5.2575 0.611074L3.99979 3.53045L0.839202 3.85203C0.516181 3.88047 0.252738 4.09666 0.158837 4.40727C0.0649357 4.71788 0.151539 5.05989 0.38391 5.2817L2.76264 7.36055L2.11094 10.4476C2.04835 10.7779 2.16108 11.1222 2.4175 11.3217C2.67391 11.5212 3.02742 11.5371 3.30761 11.3619L5.99706 9.72478L8.69234 11.3619C9.07708 11.5371 9.49914 11.5212 9.81289 11.3217C10.1266 11.1222 10.2393 10.7779 10.1767 10.4476L9.52539 7.35738L11.9041 5.2817C12.2369 5.05454 12.3591 4.70596 12.2652 4.39327L11.8656 4.40327ZM11.0364 4.94421L8.65812 7.01989C8.4472 7.20751 8.35686 7.49382 8.4152 7.76829L9.06758 10.8594L6.37812 9.22266C6.16253 9.09827 5.89871 9.09827 5.68312 9.22266L2.99875 10.8594L3.65359 7.77046C3.71193 7.49599 3.62159 7.20968 3.41067 7.02194L1.03125 4.94648C1.03099 4.94578 1.03099 4.9451 1.03125 4.9444L4.23203 4.6218C4.50872 4.59407 4.74493 4.39613 4.82604 4.1274L6.08375 1.20844L7.34094 4.1274C7.42205 4.39613 7.65826 4.59407 7.93495 4.6218L11.1357 4.9444C11.1357 4.9444 11.1357 4.94577 11.1357 4.94632L11.0364 4.94421Z"
                  fill="#009963"
                />
              </svg>
            );
          } else {
            return (
              <svg
                key={index}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star-empty"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8656 4.40327C11.7596 4.09387 11.5101 3.87835 11.2031 3.85203L8.00021 3.53045L6.7425 0.611074C6.61555 0.29767 6.32691 0.0938599 6 0.0938599C5.67309 0.0938599 5.38445 0.29767 5.2575 0.611074L3.99979 3.53045L0.839202 3.85203C0.516181 3.88047 0.252738 4.09666 0.158837 4.40727C0.0649357 4.71788 0.151539 5.05989 0.38391 5.2817L2.76264 7.36055L2.11094 10.4476C2.04835 10.7779 2.16108 11.1222 2.4175 11.3217C2.67391 11.5212 3.02742 11.5371 3.30761 11.3619L5.99706 9.72478L8.69234 11.3619C9.07708 11.5371 9.49914 11.5212 9.81289 11.3217C10.1266 11.1222 10.2393 10.7779 10.1767 10.4476L9.52539 7.35738L11.9041 5.2817C12.2369 5.05454 12.3591 4.70596 12.2652 4.39327L11.8656 4.40327ZM11.0364 4.94421L8.65812 7.01989C8.4472 7.20751 8.35686 7.49382 8.4152 7.76829L9.06758 10.8594L6.37812 9.22266C6.16253 9.09827 5.89871 9.09827 5.68312 9.22266L2.99875 10.8594L3.65359 7.77046C3.71193 7.49599 3.62159 7.20968 3.41067 7.02194L1.03125 4.94648C1.03099 4.94578 1.03099 4.9451 1.03125 4.9444L4.23203 4.6218C4.50872 4.59407 4.74493 4.39613 4.82604 4.1274L6.08375 1.20844L7.34094 4.1274C7.42205 4.39613 7.65826 4.59407 7.93495 4.6218L11.1357 4.9444C11.1357 4.9444 11.1357 4.94577 11.1357 4.94632L11.0364 4.94421Z"
                  fill="#E8DECF"
                />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="product-card" onClick={onClick}>
      <div className="card-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="card-image"
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-author">by {product.author}</p>
        <div className="card-rating">
          {renderStars(product.rating)}
          <span className="rating-count">({product.reviewCount})</span>
        </div>
        <div className="card-price" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {product.originalPrice > product.discountPrice && (
              <span className="original-price">{product.originalPrice.toLocaleString('vi-VN')} đ</span>
            )}
            {product.discountPercent > 0 && (
              <span className="discount-percent">-{Math.round(product.discountPercent * 100)}%</span>
            )}
          </div>
          <span className="current-price">{product.discountPrice.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className="card-sold">
          Đã bán {product.sold}
        </div>
        <div className="card-actions">
          <button
            className="btn-add-cart"
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                title: product.title,
                author: product.author,
                price: product.discountPrice,
                image: product.image,
                quantity: 1,
              });
              navigate("/cart");
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4263 3.19931C15.3434 3.08406 15.2156 3.01665 15.0778 3.01666H3.79054L3.52437 1.13473C3.44165 0.606387 2.99045 0.222298 2.4579 0.222222H1.11111C0.854068 0.222222 0.647222 0.428952 0.647222 0.685889C0.647222 0.942825 0.854068 1.14956 1.11111 1.14956H2.37222L3.92273 11.0757C3.96173 11.3179 4.07609 11.5412 4.24635 11.7139C3.66663 12.3165 3.58515 13.2155 4.0397 13.8986C4.49426 14.5818 5.38306 14.8363 6.17481 14.4908C6.96657 14.1453 7.41539 13.2892 7.14518 12.4444H10.7437C10.6188 12.7047 10.5552 12.9894 10.5556 13.2778C10.5556 14.2032 11.3079 14.9556 12.2333 14.9556C13.1587 14.9556 13.9111 14.2032 13.9111 13.2778C13.9111 12.3524 13.1587 11.6 12.2333 11.6H5.77569C5.55053 11.6 5.35715 11.4586 5.31584 11.2364L5.1201 9.67778H13.0647C13.7811 9.67765 14.4046 9.13569 14.5041 8.4265L15.2485 3.65465C15.2707 3.50573 15.2309 3.35396 15.1374 3.23318L15.4263 3.19931ZM6.66667 13.2778C6.66667 13.6556 6.38387 13.9383 6.00611 13.9383C5.62834 13.9383 5.34556 13.6556 5.34556 13.2778C5.34556 12.9 5.62834 12.6172 6.00611 12.6172C6.38387 12.6172 6.66667 12.9 6.66667 13.2778ZM13.3889 13.2778C13.3889 13.6556 13.1061 13.9383 12.7283 13.9383C12.3506 13.9383 12.0678 13.6556 12.0678 13.2778C12.0678 12.9 12.3506 12.6172 12.7283 12.6172C13.1061 12.6172 13.3889 12.9 13.3889 13.2778ZM13.7444 8.09931C13.7073 8.30869 13.5318 8.46176 13.3205 8.46111H4.81569L4.11481 4.10889H14.3674L13.7444 8.09931Z"
                fill="currentColor"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
