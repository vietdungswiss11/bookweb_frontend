import React from "react";
import "./Newsletter.css";

const Newsletter: React.FC = () => {
  const features = [
    {
      icon: "📚",
      title: "Kho sách đa dạng",
      description:
        "Hơn 100,000 đầu sách từ trong nước và quốc tế, đáp ứng mọi sở thích đọc.",
    },
    {
      icon: "🚚",
      title: "Giao hàng nhanh chóng",
      description:
        "Giao hàng trong 24h tại nội thành, freeship cho đơn hàng từ 150,000đ.",
    },
    {
      icon: "💳",
      title: "Thanh toán an toàn",
      description: "Nhiều phương thức thanh toán tiện lợi và bảo mật cao.",
    },
    {
      icon: "🎁",
      title: "Ưu đãi hấp dẫn",
      description:
        "Chương trình khuyến mãi liên tục, tích điểm đổi quà và giảm giá thành viên.",
    },
    {
      icon: "📞",
      title: "Hỗ trợ 24/7",
      description:
        "Đội ngũ chăm sóc khách hàng chuyên nghiệp, sẵn sàng hỗ trợ mọi lúc.",
    },
    {
      icon: "🔄",
      title: "Đổi trả dễ dàng",
      description: "Chính sách đổi trả linh hoạt trong 7 ngày, hoàn tiền 100%.",
    },
  ];

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-header">
          <h2 className="newsletter-title">Kết nối với chúng tôi</h2>
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
                  <span className="newsletter-button-text">Đăng ký nhận thông báo</span>
                </button>
              </div>
            </div>
          </form>
        </div>

         {/* Features Section */}
         <section className="features-section">
            <h2 className="section-title">Tại sao chọn BookZone?</h2>
            <p className="section-subtitle">
              Chúng tôi cam kết mang đến trải nghiệm mua sách tuyệt vời nhất
            </p>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
      </div>
    </section>
  );
};

export default Newsletter;
