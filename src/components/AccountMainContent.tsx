import React, { useState } from "react";
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
  console.log("activeSection:", activeSection);
  const [addressForm, setAddressForm] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    country: "Việt Nam",
    province: "",
    district: "",
    ward: "",
    address: "",
    postalCode: "",
  });
  const [addressErrors, setAddressErrors] = useState<{ [key: string]: string }>({});

  const validateAddress = () => {
    const errors: { [key: string]: string } = {};
    if (!addressForm.lastName) errors.lastName = "Vui lòng nhập họ";
    if (!addressForm.firstName) errors.firstName = "Vui lòng nhập tên";
    if (!addressForm.phone) errors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^0\d{9}$/.test(addressForm.phone)) errors.phone = "Số điện thoại không hợp lệ";
    if (!addressForm.country) errors.country = "Vui lòng chọn quốc gia";
    if (!addressForm.province) errors.province = "Vui lòng chọn tỉnh/thành phố";
    if (!addressForm.district) errors.district = "Vui lòng nhập quận/huyện";
    if (!addressForm.ward) errors.ward = "Vui lòng nhập xã/phường";
    if (!addressForm.address) errors.address = "Vui lòng nhập địa chỉ";
    if (addressForm.postalCode && !/^\d+$/.test(addressForm.postalCode)) errors.postalCode = "Mã bưu điện phải là số";
    return errors;
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateAddress();
    setAddressErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Lưu địa chỉ thành công!");
      // Xử lý lưu địa chỉ ở đây
    }
  };

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
        <div className="form-group">
          <label>Gender</label>
          <div style={{ display: 'flex', gap: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="radio" name="gender" value="male" defaultChecked /> Nam
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="radio" name="gender" value="female" /> Nữ
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Birthday</label>
          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <input type="text" className="form-input" placeholder="DD" style={{ maxWidth: 80 }} />
            <input type="text" className="form-input" placeholder="MM" style={{ maxWidth: 80 }} />
            <input type="text" className="form-input" placeholder="YYYY" style={{ maxWidth: 120 }} />
          </div>
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

  const renderAddressSection = () => (
    <div className="profile-section">
      <h2 className="section-title">Thêm địa chỉ mới</h2>
      <form className="profile-form" onSubmit={handleAddressSubmit} autoComplete="off">
        <div className="form-group">
          <label>Họ*</label>
          <input type="text" className="form-input" name="lastName" placeholder="Họ*" value={addressForm.lastName} onChange={handleAddressChange} />
        </div>
        {addressErrors.lastName && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.lastName}</div>}
        <div className="form-group">
          <label>Tên*</label>
          <input type="text" className="form-input" name="firstName" placeholder="Tên*" value={addressForm.firstName} onChange={handleAddressChange} />
        </div>
        {addressErrors.firstName && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.firstName}</div>}
        <div className="form-group">
          <label>Điện thoại*</label>
          <input type="text" className="form-input" name="phone" placeholder="Ex: 0972xxxx" value={addressForm.phone} onChange={handleAddressChange} />
        </div>
        {addressErrors.phone && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.phone}</div>}
        <div className="form-group">
          <label>Quốc gia*</label>
          <select className="form-input" name="country" value={addressForm.country} onChange={handleAddressChange}><option>Việt Nam</option></select>
        </div>
        {addressErrors.country && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.country}</div>}
        <div className="form-group">
          <label>Tỉnh/Thành phố*</label>
          <select className="form-input" name="province" value={addressForm.province} onChange={handleAddressChange}><option value="">Vui lòng chọn</option><option value="Hà Nội">Hà Nội</option><option value="Hồ Chí Minh">Hồ Chí Minh</option></select>
        </div>
        {addressErrors.province && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.province}</div>}
        <div className="form-group">
          <label>Quận/Huyện*</label>
          <input type="text" className="form-input" name="district" value={addressForm.district} onChange={handleAddressChange} />
        </div>
        {addressErrors.district && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.district}</div>}
        <div className="form-group">
          <label>Xã/Phường*</label>
          <input type="text" className="form-input" name="ward" value={addressForm.ward} onChange={handleAddressChange} />
        </div>
        {addressErrors.ward && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.ward}</div>}
        <div className="form-group">
          <label>Địa chỉ*</label>
          <input type="text" className="form-input" name="address" placeholder="Địa chỉ" value={addressForm.address} onChange={handleAddressChange} />
        </div>
        {addressErrors.address && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.address}</div>}
        <div className="form-group">
          <label>Mã bưu điện</label>
          <input type="text" className="form-input" name="postalCode" placeholder="Mã bưu điện VN: 700000" value={addressForm.postalCode} onChange={handleAddressChange} />
        </div>
        {addressErrors.postalCode && <div style={{ color: '#d32f2f', fontSize: 13, marginBottom: 4 }}>{addressErrors.postalCode}</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
          <a href="#" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>&laquo; Quay lại</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#d32f2f', fontSize: 13 }}>(*) bắt buộc</span>
            <button className="save-button" style={{ background: '#d32f2f', minWidth: 180 }}>LƯU ĐỊA CHỈ</button>
          </div>
        </div>
      </form>
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
      case "address":
        return renderAddressSection();
      case "referrals":
        return (
          <div className="coming-soon">
            <h2 className="section-title">Referrals</h2>
            <p>Referral program coming soon!</p>
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
      {renderSectionContent()}
    </div>
  );
};
