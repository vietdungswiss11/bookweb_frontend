import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const mainBanners = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80', alt: 'Books Banner 1' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80', alt: 'Books Banner 2' },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80', alt: 'Books Banner 3' },
  ];

  const sideBanners = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', alt: 'Side Banner 1' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=400&q=80', alt: 'Side Banner 2' },
  ]

  return (
    <section className="hero-section">
      <div className="hero-main-content">
        <div className="main-carousel">
          <Slider {...settings}>
            {mainBanners.map(banner => (
              <div key={banner.id}>
                <img src={banner.imageUrl} alt={banner.alt} className="carousel-image" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="side-banners">
          {sideBanners.map(banner => (
            <div key={banner.id} className="side-banner-item">
              <img src={banner.imageUrl} alt={banner.alt} className="side-banner-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
