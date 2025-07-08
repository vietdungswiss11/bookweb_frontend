import React from "react";
import './CategoryGrid.css';
import { useNavigate } from "react-router-dom";
import { title } from "process";

const CategoryGrid: React.FC = () => {
  const promoBanners = [
    {
      id: 1,
      imageUrl: "/img/promo-grid/mangafest_t7.webp", alt: "promo-grid 1",
      title: 'Chương trình Manga Fest 2025'
    },
    {
      id: 2,
      imageUrl: "/img/promo-grid/83.png", alt: "promo-grid 2",
      title: 'Chương trình 8/3 2025'
    },
    {
      id: 3,
      imageUrl: "/img/promo-grid/2010.png", alt: "promo-grid 3",
      title: 'Chương trình 20/10 2025'
    },
    {
      id: 4,
      imageUrl:  "/img/promo-grid/christmas.png", alt: "promo-grid 4",
      title: 'Merry Christmas'
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
