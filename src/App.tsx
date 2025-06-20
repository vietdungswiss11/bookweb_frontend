import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUser, faShoppingCart, faHeart, faSearch, faStar, faTruck, faCreditCard, faList, faTags, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

// Fake data
const categories = [
  { name: "Lập trình", icon: faBookOpen },
  { name: "Kỹ năng sống", icon: faStar },
  { name: "Thiếu nhi", icon: faHeart },
  { name: "Kinh tế", icon: faCreditCard },
  { name: "Tiểu thuyết", icon: faList },
];

const featuredBooks = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    image: "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
    rating: 5,
    price: 250000,
    discount: 10,
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL._SX329_BO1,204,203,200_.jpg",
    rating: 4,
    price: 180000,
    discount: 0,
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    image: "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX258_BO1,204,203,200_.jpg",
    rating: 5,
    price: 320000,
    discount: 15,
  },
];

function App() {
  return (
    <div className="App" style={{ background: "#f5f6fa" }}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container d-flex align-items-center justify-content-between py-2">
          <a className="navbar-brand fw-bold text-primary fs-3" href="#">
            <FontAwesomeIcon icon={faBookOpen} /> BookWeb
          </a>
          <form className="d-flex flex-grow-1 mx-4" style={{ maxWidth: 500 }}>
            <input className="form-control rounded-start-pill" type="search" placeholder="Tìm kiếm sách, tác giả, ISBN..." aria-label="Search" />
            <button className="btn btn-primary rounded-end-pill px-4" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <div>
            <a className="btn btn-outline-primary me-2" href="#"><FontAwesomeIcon icon={faUser} /> Tài khoản</a>
            <a className="btn btn-outline-danger me-2" href="#"><FontAwesomeIcon icon={faHeart} /> Wishlist</a>
            <a className="btn btn-outline-success" href="#"><FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng</a>
          </div>
        </div>
      </header>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-2">
              <a className="nav-link fw-bold text-primary" href="#"><FontAwesomeIcon icon={faList} /> Danh mục</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link text-success" href="#"><FontAwesomeIcon icon={faTags} /> Khuyến mãi</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link text-danger" href="#">Sách mới</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link text-warning" href="#">Bán chạy</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Banner/Slider */}
      <section className="container my-4">
        <div className="row g-3">
          <div className="col-md-8">
            <div className="banner rounded-4 p-5 text-white" style={{
              background: "linear-gradient(90deg, #4f8cff 0%, #38e8ff 100%)",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <h2 className="fw-bold mb-2">Ưu đãi tháng 6: Giảm giá đến 50%!</h2>
              <p>Mua sách online, nhận quà tặng hấp dẫn, freeship toàn quốc.</p>
              <a href="#" className="btn btn-light fw-bold mt-2">Khám phá ngay</a>
            </div>
          </div>
          <div className="col-md-4 d-flex flex-column gap-3">
            <div className="rounded-4 p-3 text-center bg-warning text-white shadow-sm">
              <FontAwesomeIcon icon={faTruck} size="2x" />
              <div className="fw-bold mt-2">Giao hàng nhanh</div>
              <small>Chỉ 1-2 ngày tại HN, HCM</small>
            </div>
            <div className="rounded-4 p-3 text-center bg-success text-white shadow-sm">
              <FontAwesomeIcon icon={faCreditCard} size="2x" />
              <div className="fw-bold mt-2">Thanh toán đa dạng</div>
              <small>COD, Momo, thẻ ngân hàng</small>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container my-5">
        <h2 className="mb-4 text-center text-primary">Danh mục nổi bật</h2>
        <div className="row justify-content-center">
          {categories.map((cat, idx) => (
            <div className="col-6 col-md-2 mb-3" key={idx}>
              <div className="card text-center border-0 shadow-sm h-100 py-3" style={{ background: "#e9f5ff" }}>
                <FontAwesomeIcon icon={cat.icon} size="2x" className="mb-2 text-primary" />
                <div className="fw-bold">{cat.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="container mb-5">
        <h2 className="mb-4 text-center text-success">Sách nổi bật</h2>
        <div className="row">
          {featuredBooks.map((book, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow border-0 position-relative">
                {book.discount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 end-0 m-2">-{book.discount}%</span>
                )}
                <img src={book.image} className="card-img-top" alt={book.title} style={{ height: "300px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text text-secondary">Tác giả: {book.author}</p>
                  <div className="mb-2">
                    {[...Array(book.rating)].map((_, i) => (
                      <FontAwesomeIcon icon={faStar} color="#ffc107" key={i} />
                    ))}
                  </div>
                  <div className="fw-bold text-danger mb-2">{book.price.toLocaleString()} đ</div>
                  <button className="btn btn-primary w-100"><FontAwesomeIcon icon={faShoppingCart} /> Thêm vào giỏ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features: Wishlist, Đánh giá, Đơn hàng, Địa chỉ, Vận chuyển */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100 text-center py-4">
              <FontAwesomeIcon icon={faHeart} size="2x" className="mb-2 text-danger" />
              <h5 className="fw-bold">Wishlist</h5>
              <p>Lưu lại những cuốn sách bạn yêu thích, mua sau dễ dàng.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100 text-center py-4">
              <FontAwesomeIcon icon={faStar} size="2x" className="mb-2 text-warning" />
              <h5 className="fw-bold">Đánh giá</h5>
              <p>Đọc và chia sẻ cảm nhận về sách, giúp cộng đồng chọn sách tốt hơn.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100 text-center py-4">
              <FontAwesomeIcon icon={faBoxOpen} size="2x" className="mb-2 text-info" />
              <h5 className="fw-bold">Đơn hàng</h5>
              <p>Theo dõi trạng thái đơn hàng, lịch sử mua sắm chi tiết.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100 text-center py-4">
              <FontAwesomeIcon icon={faTruck} size="2x" className="mb-2 text-success" />
              <h5 className="fw-bold">Vận chuyển</h5>
              <p>Giao hàng nhanh, kiểm tra trạng thái vận chuyển mọi lúc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h3 className="text-center mb-4 text-warning">Khách hàng nói gì về BookWeb?</h3>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm p-3">
                <div className="mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon icon={faStar} color="#ffc107" key={i} />
                  ))}
                </div>
                <p>"Giao hàng siêu nhanh, sách mới nguyên, giá lại rẻ hơn ngoài tiệm!"</p>
                <div className="fw-bold">- Minh Anh</div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm p-3">
                <div className="mb-2">
                  {[...Array(4)].map((_, i) => (
                    <FontAwesomeIcon icon={faStar} color="#ffc107" key={i} />
                  ))}
                </div>
                <p>"Nhiều đầu sách hot, giao diện dễ dùng, sẽ ủng hộ lâu dài!"</p>
                <div className="fw-bold">- Quốc Dũng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-5">
        <div className="container">
          &copy; {new Date().getFullYear()} BookWeb. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;