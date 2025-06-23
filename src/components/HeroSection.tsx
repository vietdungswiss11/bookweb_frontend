import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Buy more, save more</h1>
          </div>
        </div>
      </div>

      <div className="hero-buttons">
        <div className="button-container">
          <button className="primary-button">
            <span className="button-text">Shop Now</span>
          </button>
          <button className="secondary-button">
            <span className="button-text">Learn More</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
