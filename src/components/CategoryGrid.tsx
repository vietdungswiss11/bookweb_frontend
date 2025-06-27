import React from "react";
import './CategoryGrid.css';
import { useNavigate } from "react-router-dom";

const CategoryGrid: React.FC = () => {
  const promoBanners = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=310&h=210&fit=crop',
      title: 'Trở lại trường học cùng Fahasa'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=310&h=210&fit=crop',
      title: 'Chương trình Manga Fest 2025'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=310&h=210&fit=crop',
      title: 'Mỗi trang sách là một chuyến phiêu lưu'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=310&h=210&fit=crop',
      title: 'Expand your world, one page at a time!'
    },
  ];

  const navigate = useNavigate();

  // Hàm chuyển đổi tên danh mục sang url-friendly (loại bỏ dấu tiếng Việt)
  const removeVietnameseTones = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/\u0300|\u0301|\u0303|\u0309|\u0323|\u02C6|\u0306|\u031B/g, '')
      .replace(/[\u00C0-\u00C3\u00C8-\u00CA\u00CC-\u00CD\u00D2-\u00D5\u00D9-\u00DA\u00DD\u00E0-\u00E3\u00E8-\u00EA\u00EC-\u00ED\u00F2-\u00F5\u00F9-\u00FA\u00FD\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  };

  const toUrlFriendly = (str: string) =>
    removeVietnameseTones(str.toLowerCase());

  return (
    <section className="promo-grid-section">
      <div className="promo-grid">
        {promoBanners.map((banner) => (
          <div
            key={banner.id}
            className="promo-banner-card"
            onClick={() => navigate(`/category/${toUrlFriendly(banner.title)}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={banner.imageUrl} alt={banner.title} className="promo-banner-image" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
