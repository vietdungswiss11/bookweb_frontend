import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Giới thiệu */}
          <div className="footer-section">
            <div className="footer-logo">
              <img
                src="/logoWeb.png"
                alt="BookZone logo"
                className="footer-logo-img"
              />
              <span className="footer-logo-text">BookZone</span>
            </div>
            <p className="footer-description">
              BookZone - Thế giới sách đa dạng với hàng nghìn đầu sách chất
              lượng. Nơi khơi nguồn tri thức và nuôi dưỡng đam mê đọc của bạn.
            </p>
            <a href="/" className="footer-home-link">
              Về trang chủ
            </a>
          </div>

          {/* Liên kết nhanh */}
          <div className="footer-section">
            <h3 className="footer-title">Liên kết nhanh</h3>
            <ul className="footer-links">
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li>
                <a href="/about">Giới thiệu</a>
              </li>
              <li>
                <a href="/bestsellers">Sách bán chạy</a>
              </li>
              <li>
                <a href="/category/tat-ca">Danh mục</a>
              </li>
              <li>
                <a href="/cart">Giỏ hàng</a>
              </li>

            </ul>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div className="footer-section">
            <h3 className="footer-title">Hỗ trợ khách hàng</h3>
            <ul className="footer-links">
              <li>
                <a href="/return-policy">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="/privacy-policy">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="/purchase-guide">Hướng dẫn mua hàng</a>
              </li>
              <li>
                <a href="/faq">Câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
            </ul>
          </div>

          {/* Kết nối & Mạng xã hội */}
          <div className="footer-section">
            <h3 className="footer-title">Kết nối với chúng tôi</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                <span>1900 1234</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <span>support@bookzone.vn</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="contact-icon"
                />
                <span>123 Đường Sách, Q.1, TP.HCM</span>
              </div>
            </div>
            <div className="footer-social">
              <a
                href="https://facebook.com/bookzone"
                className="social-link"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://instagram.com/bookzone"
                className="social-link"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 BookZone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
