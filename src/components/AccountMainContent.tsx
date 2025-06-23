import React from "react";
import "./AccountMainContent.css";
import { AccountSection, User, Order, Review, Credit } from "./UserAccountPage";
import { OrderItem } from "./OrderItem";
import { ReviewItem } from "./ReviewItem";

interface AccountMainContentProps {
  activeSection: AccountSection;
  user: User;
  orders: Order[];
  reviews: Review[];
  credits: Credit[];
}

export const AccountMainContent: React.FC<AccountMainContentProps> = ({
  activeSection,
  user,
  orders,
  reviews,
  credits,
}) => {
  const renderProfileSection = () => (
    <div className="profile-section">
      <h2 className="section-title">My Profile</h2>
      <div className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            defaultValue={user.name}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            defaultValue={user.email}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            defaultValue={user.phoneNumber}
            className="form-input"
          />
        </div>
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="orders-section">
      <h2 className="section-title">My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );

  const renderReviewsSection = () => (
    <div className="reviews-section">
      <h2 className="section-title">My Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );

  const renderDefaultContent = () => (
    <>
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome back, Jane!</h1>
          <p className="welcome-subtitle">
            You have 1,234 credits and 5 days left to earn more
          </p>
        </div>
      </div>

      {/* Credits Tags */}
      <div className="credits-section">
        {credits.map((credit, index) => (
          <div key={index} className="credit-tag">
            <span className="credit-label">{credit.label}</span>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <div className="content-section">
        <h2 className="section-title">Your orders</h2>
        <div className="orders-list">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="content-section">
        <h2 className="section-title">Your reviews</h2>
        <div className="reviews-list">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "orders":
        return renderOrdersSection();
      case "reviews":
        return renderReviewsSection();
      case "referrals":
        return (
          <div className="coming-soon">
            <h2 className="section-title">Referrals</h2>
            <p>Referral program coming soon!</p>
          </div>
        );
      case "wishlist":
        return (
          <div className="coming-soon">
            <h2 className="section-title">Wish Lists</h2>
            <p>Your wishlist will appear here.</p>
          </div>
        );
      case "giftcards":
        return (
          <div className="coming-soon">
            <h2 className="section-title">Gift Cards</h2>
            <p>Gift card management coming soon!</p>
          </div>
        );
      default:
        return renderDefaultContent();
    }
  };

  return (
    <div className="account-main-content">
      {activeSection === "profile"
        ? renderSectionContent()
        : activeSection === "orders" || activeSection === "reviews"
          ? renderSectionContent()
          : activeSection === "referrals" ||
              activeSection === "wishlist" ||
              activeSection === "giftcards"
            ? renderSectionContent()
            : renderDefaultContent()}
    </div>
  );
};
