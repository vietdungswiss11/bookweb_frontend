import React, { useState, useEffect } from "react";
import "./AccountMainContent.css";
import { AccountSection, User, Review, Credit } from "./UserAccountPage";
import { OrderDTO } from "../services/orderService";
import { OrderItem } from "./OrderItem";
import { ReviewItem } from "./ReviewItem";
import { addAddress } from "../services/addressService";
import { getOrderById } from "../services/orderService";
import { getReviewsByUserId } from "../services/reviewService";
import { updateUser, changePassword } from "../services/userService";

interface AccountMainContentProps {
  activeSection: AccountSection;
  user: User;
  orders: OrderDTO[];
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

// Thêm component hiển thị chi tiết đơn hàng
const OrderDetail: React.FC<{ detail: any; onBack: () => void }> = ({ detail, onBack }) => (
  <div className="order-detail-section" >
    <button className="back-button" onClick={onBack} style={{ marginBottom: 16, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>&laquo; Quay lại</button>
    <h2 style={{ marginBottom: 24, color: '#1976d2' }}>Chi tiết đơn hàng</h2>
    <div style={{ marginBottom: 10 }}><b>Mã đơn hàng:</b> {detail.orderNumber}</div>
    <div style={{ marginBottom: 10 }}><b>Ngày đặt:</b> {detail.orderDate}</div>
    <div style={{ marginBottom: 10 }}><b>Trạng thái:</b> <span style={{ color: detail.status === 'PENDING' ? '#ff9800' : detail.status === 'DELIVERED' ? '#4caf50' : '#1976d2', fontWeight: 600 }}>{detail.status}</span></div>
    <div style={{ marginBottom: 10 }}><b>Tổng tiền:</b> <span style={{ color: '#d32f2f', fontWeight: 600 }}>{detail.totalAmount?.toLocaleString()} đ</span></div>
    <div style={{ marginBottom: 10 }}><b>Địa chỉ giao hàng:</b> <span style={{ color: '#333' }}>{detail.addressDTO?.addressLine} - {detail.addressDTO?.recipientName} - {detail.addressDTO?.phoneNumber}</span></div>
    <div style={{ marginBottom: 10 }}><b>Phương thức thanh toán:</b> {detail.paymentDTO?.paymentMethod}</div>
    <div style={{ marginBottom: 10 }}><b>Trạng thái thanh toán:</b> {detail.paymentDTO?.status}</div>
    <div style={{ marginBottom: 10 }}><b>Vận chuyển:</b> {detail.shippingDTO?.shippingProvider} - {detail.shippingDTO?.status}</div>
    <div style={{ marginBottom: 10 }}><b>Phí vận chuyển:</b> {detail.shippingFee?.toLocaleString()} đ</div>
    <div style={{ margin: '18px 0 8px 0', fontWeight: 600 }}>Danh sách sản phẩm:</div>
    <ul style={{ paddingLeft: 24, marginBottom: 18 }}>
      {detail.orderItems?.map((item: any) => (
        <li key={item.id} style={{ marginBottom: 8, background: '#f5f5f5', borderRadius: 6, padding: 10 }}>
          <b>{item.book?.title}</b> <span style={{ color: '#888' }}>(Tác giả: {item.book?.author})</span><br />
          SL: <b>{item.quantity}</b> | Giá: <b>{item.price?.toLocaleString()} đ</b> | Tổng: <b style={{ color: '#d32f2f' }}>{item.totalPrice?.toLocaleString()} đ</b>
        </li>
      ))}
    </ul>
    <div style={{ marginBottom: 6 }}><b>Tạm tính:</b> {detail.subtotal?.toLocaleString()} đ</div>
    <div style={{ fontWeight: 700, fontSize: 18 }}><b>Tổng thanh toán:</b> <span style={{ color: '#d32f2f' }}>{detail.totalAmount?.toLocaleString()} đ</span></div>
  </div>
);

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
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [profileForm, setProfileForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
  });
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changePasswordMsg, setChangePasswordMsg] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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

  useEffect(() => {
    if (activeSection === 'reviews') {
      const userId = user?.id || localStorage.getItem('userId');
      if (userId) {
        getReviewsByUserId(userId).then(data => setUserReviews(Array.isArray(data) ? data : []));
      }
    }
  }, [activeSection, user]);

  useEffect(() => {
    setProfileForm({
      name: user.name || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
    });
  }, [user]);

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

  const handleOrderClick = async (order: OrderDTO) => {
    setLoadingDetail(true);
    try {
      const detail = await getOrderById(order.id.toString());
      setOrderDetail(detail);
      setSelectedOrder(order);
    } catch (e) {
      // Xử lý lỗi nếu cần
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    try {
      await updateUser(user.id, profileForm);
      setProfileMsg('Cập nhật thành công!');
      if (typeof onUserRefresh === 'function') onUserRefresh();
    } catch (err: any) {
      setProfileMsg('Cập nhật thất bại!');
    }
  };

  const handleChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePasswordForm({ ...changePasswordForm, [e.target.name]: e.target.value });
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordMsg(null);
    if (!changePasswordForm.oldPassword || !changePasswordForm.newPassword || !changePasswordForm.confirmPassword) {
      setChangePasswordMsg('Vui lòng nhập đầy đủ các trường!');
      return;
    }
    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      setChangePasswordMsg('Mật khẩu mới và nhập lại phải giống nhau!');
      return;
    }
    setIsChangingPassword(true);
    try {
      const msg = await changePassword(user.id, changePasswordForm.oldPassword, changePasswordForm.newPassword, changePasswordForm.confirmPassword);
      setChangePasswordMsg(msg || 'Đổi mật khẩu thành công!');
      setChangePasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => { setShowChangePassword(false); setChangePasswordMsg(null); }, 1500);
    } catch (err: any) {
      setChangePasswordMsg(err.message || 'Đổi mật khẩu thất bại!');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const renderProfileSection = () => (
    <div className="profile-section">
      <h2 className="section-title">My Profile</h2>
      {!showChangePassword ? (
        <>
          <form className="profile-form" onSubmit={handleProfileSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileForm.name}
                className="form-input"
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileForm.email}
                className="form-input"
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={profileForm.phoneNumber}
                className="form-input"
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div style={{ display: 'flex', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input type="radio" name="gender" value="male" checked={user.gender === 'male'} readOnly /> Nam
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input type="radio" name="gender" value="female" checked={user.gender === 'female'} readOnly /> Nữ
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Birthday</label>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <input type="text" className="form-input" placeholder="DD" style={{ maxWidth: 80 }} value={user.birthday?.split('-')[2] || ''} readOnly />
                <input type="text" className="form-input" placeholder="MM" style={{ maxWidth: 80 }} value={user.birthday?.split('-')[1] || ''} readOnly />
                <input type="text" className="form-input" placeholder="YYYY" style={{ maxWidth: 120 }} value={user.birthday?.split('-')[0] || ''} readOnly />
              </div>
            </div>
            {profileMsg && <div className={`submit-message${profileMsg.includes('thất bại') ? ' error' : ''}`}>{profileMsg}</div>}
            <div className="profile-btn-row">
              <button className="save-button" type="submit">Save Changes</button>
              <button
                type="button"
                className="change-password-btn"
                onClick={() => setShowChangePassword(true)}
              >
                Thay đổi mật khẩu
              </button>
            </div>
          </form>
        </>
      ) : (
        <form className="profile-form" onSubmit={handleChangePasswordSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="oldPassword" className="required">Mật khẩu cũ</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              className="form-input"
              value={changePasswordForm.oldPassword}
              onChange={handleChangePasswordInput}
              placeholder="Nhập mật khẩu cũ"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" className="required">Mật khẩu mới</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="form-input"
              value={changePasswordForm.newPassword}
              onChange={handleChangePasswordInput}
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="required">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={changePasswordForm.confirmPassword}
              onChange={handleChangePasswordInput}
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          {changePasswordMsg && (
            <div className={`submit-message${changePasswordMsg.includes('thất bại') ? ' error' : ''}`}>{changePasswordMsg}</div>
          )}
          <div className="form-bottom">
            <button
              type="button"
              onClick={() => { setShowChangePassword(false); setChangePasswordMsg(null); setChangePasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' }); }}
              className="back-button"
            >
              &laquo; Quay lại
            </button>
            <div className="form-bottom-right">
              <span className="required-note">(*) bắt buộc</span>
              <button
                className="save-button"
                type="submit"
                disabled={isChangingPassword}
              >
                {isChangingPassword ? 'ĐANG LƯU...' : 'LƯU THAY ĐỔI'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );

  const renderOrdersSection = () => (
    <div className="orders-section">
      {!orderDetail ? (
        <>
          <h2 className="section-title" style={{ color: '#1976d2', marginBottom: 24 }}>My Orders</h2>
          <div className="orders-list">
            {orders.length === 0 && <div>Bạn chưa có đơn hàng nào.</div>}
            {orders.map((order: OrderDTO) => (
              <div
                key={order.id}
                className="order-card"
                onClick={() => handleOrderClick(order)}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #e0e0e0',
                  borderRadius: 10,
                  padding: 20,
                  margin: '16px auto',
                  background: '#fff',
                  boxShadow: '0 1px 6px #0001',
                  transition: 'box-shadow 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '80%',
                  maxWidth: 700,
                  minWidth: 320
                }}
                onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 16px #0002')}
                onMouseOut={e => (e.currentTarget.style.boxShadow = '0 1px 6px #0001')}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Mã đơn: {order.orderNumber}</div>
                  <div style={{ color: '#555', marginBottom: 2 }}>Ngày đặt: {order.orderDate}</div>
                  <div>Trạng thái: <span style={{ color: order.status === 'PENDING' ? '#ff9800' : order.status === 'DELIVERED' ? '#4caf50' : '#1976d2', fontWeight: 600 }}>{order.status}</span></div>
                </div>
                <div style={{ fontWeight: 700, color: '#d32f2f', fontSize: 18 }}>{order.totalAmount.toLocaleString()} đ</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        loadingDetail ? <div>Đang tải chi tiết...</div> : <OrderDetail detail={orderDetail} onBack={() => setOrderDetail(null)} />
      )}
    </div>
  );

  const renderReviewsSection = () => (
    <div className="reviews-section">
      <h2 className="section-title">My Reviews</h2>
      <div className="reviews-list">
        {userReviews.length > 0 ? userReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        )) : <div>Bạn chưa có đánh giá nào.</div>}
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
          {orders.map((order: OrderDTO) => (
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

