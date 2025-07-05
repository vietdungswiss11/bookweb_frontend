import React from "react";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import './Header.css';
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <header className="header">
        <div className="header-main">
          <div className="header-left">
            <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              {/* Logo icon sách nhỏ và chữ BookStore */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon"><rect x="3" y="4" width="18" height="16" rx="2" fill="#2563eb" /><rect x="6" y="7" width="12" height="2" rx="1" fill="#fff" /><rect x="6" y="11" width="8" height="2" rx="1" fill="#fff" /></svg>
              <span className="logo-text">BookStore</span>
            </div>
            <SearchBar />
          </div>

          <div className="header-actions">
            <div className="action-item">
              <i className="icon-bell"></i>
              <span>Thông Báo</span>
            </div>
            <div className="action-item" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
              <i className="icon-cart"></i>
              <span>Giỏ Hàng</span>
            </div>
            <div className="action-item" onClick={() => {
              if (localStorage.getItem('token')) {
                navigate('/account');
              } else {
                window.dispatchEvent(new Event('show-auth-modal'));
              }
            }} style={{ cursor: 'pointer' }}>
              <i className="icon-user"></i>
              <span>Tài khoản</span>
            </div>
            <div className="language-selector">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/255px-Flag_of_Vietnam.svg.png" alt="Vietnam Flag" className="flag-icon" />
              <i className="icon-chevron-down"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
