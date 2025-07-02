import React, { useState, useEffect } from "react";
import "./AccountMainContent.css";
import { AccountSection, User, Order, Review, Credit } from "./UserAccountPage";
import { OrderItem } from "./OrderItem";
import { ReviewItem } from "./ReviewItem";
import { addAddress } from "../services/addressService";

interface AccountMainContentProps {
  activeSection: AccountSection;
  user: User;
  orders: Order[];
  reviews: Review[];
  credits: Credit[];
  onUserRefresh: () => void;
}

interface Address {
  id?: number;
  recipientName: string;
  phoneNumber: string;
  addressLine: string;
}

export const AccountMainContent: React.FC<AccountMainContentProps> = ({
  activeSection,
  user,
  orders,
  reviews,
  credits,
  onUserRefresh,
}) => {
  console.log("activeSection:", activeSection);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    country: "Việt Nam",
    province: "",
    district: "",
    ward: "",
    address: ""
  });
  const [addressErrors, setAddressErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (activeSection === 'address') {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (userId && token) {
        fetch(`http://localhost:8080/addresses/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => setAddresses(Array.isArray(data) ? data : []));
      }
    }
  }, [activeSection, mode]);

  const handleAddClick = () => {
    setMode('add');
    setEditingAddress(null);
  };
  const handleEditClick = (address: Address) => {
    setMode('edit');
    setEditingAddress(address);
  };
  const handleBackToList = () => {
    setMode('list');
    setEditingAddress(null);
  };

  const validateAddress = () => {
    const errors: { [key: string]: string } = {};
    if (!addressForm.fullName) errors.fullName = "Vui lòng nhập họ và tên";
    if (!addressForm.phone) errors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^0\d{9}$/.test(addressForm.phone)) errors.phone = "Số điện thoại không hợp lệ";
    if (!addressForm.country) errors.country = "Vui lòng chọn quốc gia";
    if (!addressForm.province) errors.province = "Vui lòng chọn tỉnh/thành phố";
    if (!addressForm.district) errors.district = "Vui lòng nhập quận/huyện";
    if (!addressForm.ward) errors.ward = "Vui lòng nhập xã/phường";
    if (!addressForm.address) errors.address = "Vui lòng nhập địa chỉ";
    return errors;
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    const errors = validateAddress();
    setAddressErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setSubmitMessage({ type: 'error', text: 'Bạn cần đăng nhập để thực hiện việc này.' });
        setIsSubmitting(false);
        return;
      }
      const addressLine = `${addressForm.address}, ${addressForm.ward}, ${addressForm.district}, ${addressForm.province}, ${addressForm.country}`;
      const addressPayload = {
        recipientName: addressForm.fullName,
        phoneNumber: addressForm.phone,
        addressLine: addressLine,
      };
      try {
        await addAddress(userId, addressPayload);
        setSubmitMessage({ type: 'success', text: 'Lưu địa chỉ thành công!' });
        setAddressForm({
          fullName: "",
          phone: "",
          country: "Việt Nam",
          province: "",
          district: "",
          ward: "",
          address: ""
        });
        setAddressErrors({});
        if (typeof onUserRefresh === 'function') onUserRefresh();
      } catch (error: any) {
        setSubmitMessage({ type: 'error', text: `Lỗi: ${error.message}` });
      } finally {
        setIsSubmitting(false);
      }
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
            value={user.name || 'Chưa có'}
            className="form-input"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email || 'Chưa có'}
            className="form-input"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={user.phoneNumber || 'Chưa có'}
            className="form-input"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div style={{ display: 'flex', gap: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="radio" name="gender" value="male" defaultChecked readOnly /> Nam
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="radio" name="gender" value="female" readOnly /> Nữ
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Birthday</label>
          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <input type="text" className="form-input" placeholder="DD" style={{ maxWidth: 80 }} readOnly />
            <input type="text" className="form-input" placeholder="MM" style={{ maxWidth: 80 }} readOnly />
            <input type="text" className="form-input" placeholder="YYYY" style={{ maxWidth: 120 }} readOnly />
          </div>
        </div>
        <button className="save-button" disabled>Save Changes</button>
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

  const renderAddressList = () => {
    const addresses = Array.isArray(user.addresses) ? user.addresses : [];
    return (
      <div className="address-list-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Sổ địa chỉ</h2>
          <button
            style={{
              color: '#1976d2',
              background: 'none',
              border: 'none',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer'
            }}
            onClick={handleAddClick}
          >
            + Thêm địa chỉ mới
          </button>
        </div>
        {addresses.length === 0 && <div>Bạn chưa có địa chỉ nào.</div>}
        {addresses.map((addr: Address) => (
          <div key={addr.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, margin: '16px 0', background: '#fafbfc' }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{addr.recipientName} <span style={{ fontWeight: 500 }}>{addr.phoneNumber}</span></div>
            <div style={{ margin: '8px 0 4px 0' }}>{addr.addressLine}</div>
            <button style={{ color: '#1976d2', background: 'none', border: 'none', fontWeight: 500, cursor: 'pointer' }} onClick={() => handleEditClick(addr)}>Sửa</button>
          </div>
        ))}
      </div>
    );
  };

  const renderAddressSection = () => {
    if (mode === 'list') return renderAddressList();
    return (
      <div className="profile-section">
        <h2 className="section-title">{mode === 'add' ? 'Thêm địa chỉ mới' : 'Sửa địa chỉ'}</h2>
        <form className="profile-form" onSubmit={handleAddressSubmit} autoComplete="off">
          <div className="form-group">
            <label className="required" htmlFor="fullName">Tên</label>
            <input 
              type="text" 
              className="form-input" 
              id="fullName" 
              name="fullName" 
              placeholder="Tên*" 
              value={addressForm.fullName} 
              onChange={handleAddressChange} 
            />
          </div>
          {addressErrors.fullName && <div className="form-error">{addressErrors.fullName}</div>}
          
          <div className="form-group">
            <label className="required" htmlFor="phone">Điện thoại</label>
            <input 
              type="text" 
              className="form-input" 
              id="phone" 
              name="phone" 
              placeholder="Ex: 0972xxxx" 
              value={addressForm.phone} 
              onChange={handleAddressChange} 
            />
          </div>
          {addressErrors.phone && <div className="form-error">{addressErrors.phone}</div>}
          
          <div className="form-group">
            <label className="required" htmlFor="country">Quốc gia</label>
            <select 
              className="form-input" 
              id="country" 
              name="country" 
              value={addressForm.country} 
              onChange={handleAddressChange}
            >
              <option value="Việt Nam">Việt Nam</option>
            </select>
          </div>
          {addressErrors.country && <div className="form-error">{addressErrors.country}</div>}
          
          <div className="form-group">
            <label className="required" htmlFor="province">Tỉnh/Thành phố</label>
            <select 
              className="form-input" 
              id="province" 
              name="province" 
              value={addressForm.province} 
              onChange={handleAddressChange}
            >
              <option value="">Vui lòng chọn</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            </select>
          </div>
          {addressErrors.province && <div className="form-error">{addressErrors.province}</div>}
          
          <div className="form-group">
            <label className="required" htmlFor="district">Quận/Huyện</label>
            <input 
              type="text" 
              className="form-input" 
              id="district" 
              name="district" 
              placeholder="" 
              value={addressForm.district} 
              onChange={handleAddressChange} 
            />
          </div>
          {addressErrors.district && <div className="form-error">{addressErrors.district}</div>}
          
          <div className="form-group">
            <label className="required" htmlFor="ward">Xã/Phường</label>
            <input 
              type="text" 
              className="form-input" 
              id="ward" 
              name="ward" 
              placeholder="" 
              value={addressForm.ward} 
              onChange={handleAddressChange} 
            />
          </div>
          {addressErrors.ward && <div className="form-error">{addressErrors.ward}</div>}
          
          <div className="form-group">
            <label className="required" htmlFor="address">Địa chỉ</label>
            <input 
              type="text" 
              className="form-input" 
              id="address" 
              name="address" 
              placeholder="Địa chỉ" 
              value={addressForm.address} 
              onChange={handleAddressChange} 
            />
          </div>
          {addressErrors.address && <div className="form-error">{addressErrors.address}</div>}
          
          {submitMessage && (
            <div className={`submit-message ${submitMessage.type === 'error' ? 'error' : ''}`}>
              {submitMessage.text}
            </div>
          )}
          
          <div className="form-bottom">
            <button 
              type="button" 
              onClick={handleBackToList} 
              className="back-button"
            >
              &laquo; Quay lại
            </button>
            <div className="form-bottom-right">
              <span className="required-note">(*) bắt buộc</span>
              <button 
                className="save-button" 
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (mode === 'add' ? 'ĐANG LƯU...' : 'ĐANG CẬP NHẬT...') 
                  : (mode === 'add' ? 'LƯU ĐỊA CHỈ' : 'CẬP NHẬT')
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

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
