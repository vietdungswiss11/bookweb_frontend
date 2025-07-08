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
              {/* Logo icon sách nhỏ và chữ BookZone */}
              <img src="/logoWeb.png" alt="BookZone logo" className="logo-img" />
              <span className="logo-text">BookZone</span>
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
