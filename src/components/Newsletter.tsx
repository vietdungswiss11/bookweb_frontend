import React from "react";

const Newsletter: React.FC = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-header">
          <h2 className="newsletter-title">Stay Connected</h2>
        </div>

        <div className="newsletter-form-container">
          <form className="newsletter-form">
            <div className="newsletter-input-wrapper">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
              />
              <div className="newsletter-button-container">
                <button type="submit" className="newsletter-button">
                  <span className="newsletter-button-text">Subscribe</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
