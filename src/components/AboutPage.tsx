import React from "react";
import "./AboutPage.css";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

const AboutPage: React.FC = () => {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Về chúng tôi", href: "/about" },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      role: "Giám đốc điều hành",
      image: "https://placehold.co/200x200/e64023/ffffff?text=CEO",
      description:
        "Với hơn 10 năm kinh nghiệm trong ngành xuất bản, An đã dẫn dắt BookZone trở thành một trong những nhà sách trực tuyến hàng đầu Việt Nam.",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      role: "Giám đốc Marketing",
      image: "https://placehold.co/200x200/d84a35/ffffff?text=CMO",
      description:
        "Bình chuyên về chiến lược marketing số và có đam mê lớn với văn học, giúp kết nối độc giả với những cuốn sách hay nhất.",
    },
    {
      id: 3,
      name: "Lê Hoàng Cường",
      role: "Giám đốc Công nghệ",
      image: "https://placehold.co/200x200/b73e2e/ffffff?text=CTO",
      description:
        "Cường đảm bảo website luôn hoạt động mượt mà và mang đến trải nghiệm mua sắm tuyệt vời cho khách hàng.",
    },
    {
      id: 4,
      name: "Phạm Thu Hương",
      role: "Giám đốc Dịch vụ khách hàng",
      image: "https://placehold.co/200x200/a3342a/ffffff?text=CS",
      description:
        "Hương và đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ 24/7 để đảm bảo sự hài lòng của khách hàng.",
    },
  ];

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

  const milestones = [
    {
      year: "2018",
      title: "Thành lập BookZone",
      description:
        "Ra mắt với sứ mệnh lan tỏa văn hóa đọc đến mọi người Việt Nam.",
    },
    {
      year: "2019",
      title: "Mở rộng kho sách",
      description:
        "Đạt mốc 10,000 đầu sách và thiết lập quan hệ đối tác v��i các nhà xuất bản lớn.",
    },
    {
      year: "2020",
      title: "Phát triển ứng dụng mobile",
      description:
        "Ra mắt ứng dụng di động, tăng trải nghiệm mua sắm cho khách hàng.",
    },
    {
      year: "2021",
      title: "Mở rộng toàn quốc",
      description:
        "Phủ sóng giao hàng toàn quốc và đạt 100,000 khách hàng tin tưởng.",
    },
    {
      year: "2022",
      title: "Giải thưởng E-commerce",
      description:
        'Nhận giải "Website thương mại điện tử xuất sắc" do Hiệp hội Thương mại điện tử Việt Nam trao tặng.',
    },
    {
      year: "2023",
      title: "Hệ sinh thái hoàn chỉnh",
      description:
        "Phát triển thành hệ sinh thái sách hoàn chỉnh với dịch vụ sách nói và sách điện tử.",
    },
  ];

  return (
    <>
      <Header />
      <div className="about-page">
        <div className="about-container">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <section className="about-hero">
            <div className="hero-content">
              <h1 className="about-title">Về chúng tôi</h1>
              <p className="hero-subtitle">
                Khám phá câu chuyện của BookZone - nơi kết nối bạn với th���
                giới tri thức bất tận
              </p>
            </div>
            <div className="hero-image">
              <img
                src="https://placehold.co/600x400/f7fafa/e64023?text=BookZone+Story"
                alt="BookZone Story"
              />
            </div>
          </section>

          {/* Mission Section */}
          <section className="mission-section">
            <div className="mission-content">
              <h2 className="section-title">Sứ mệnh của chúng tôi</h2>
              <div className="mission-grid">
                <div className="mission-item">
                  <h3>Tầm nhìn</h3>
                  <p>
                    Trở thành nền tảng mua sách trực tuyến hàng đầu Việt Nam,
                    góp phần xây dựng xã hội tri thức và nuôi dưỡng văn hóa đọc
                    trong cộng đồng.
                  </p>
                </div>
                <div className="mission-item">
                  <h3>Sứ mệnh</h3>
                  <p>
                    Mang đến cho độc giả Việt Nam kho tàng tri thức phong phú,
                    đa dạng và chất lượng cao với trải nghiệm mua sắm tuyệt vời
                    nhất.
                  </p>
                </div>
                <div className="mission-item">
                  <h3>Giá trị cốt lõi</h3>
                  <p>
                    Chất lượng - Tận tâm - Sáng tạo. Chúng tôi luôn đặt khách
                    hàng làm trung tâm và không ngừng cải tiến để mang lại giá
                    trị tốt nhất.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <h2 className="section-title">Đội ngũ lãnh đạo</h2>
            <p className="section-subtitle">
              Những con người tài năng và đam mê đằng sau thành công của
              BookZone
            </p>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-description">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

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

          {/* Timeline Section */}
          <section className="timeline-section">
            <h2 className="section-title">Hành trình phát triển</h2>
            <p className="section-subtitle">
              Những cột mốc quan trọng trong quá trình xây dựng và phát triển
              BookZone
            </p>
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <span className="timeline-year">{milestone.year}</span>
                    <h3 className="timeline-title">{milestone.title}</h3>
                    <p className="timeline-description">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-content">
              <h2>Cùng BookZone khám phá thế giới tri thức</h2>
              <p>
                Tham gia cộng đồng hơn 500,000 độc giả đã tin tưởng và lựa chọn
                BookZone làm người bạn đồng hành trên hành trình tri thức.
              </p>
              <div className="cta-buttons">
                <a href="/" className="btn-primary">
                  Khám phá sách
                </a>
                <a href="/contact" className="btn-secondary">
                  Liên hệ với chúng tôi
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
