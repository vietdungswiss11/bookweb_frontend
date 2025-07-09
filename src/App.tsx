import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Header,
  Footer,
  HeroSection,
  CategoryGrid,
  BookSection,
  FlashSale,
  Newsletter,
  CategorySection,
  AboutPage,
} from "./components";
import ProductDetailPage from "./components/ProductDetailPage";
import ProductListingPage from "./components/ProductListingPage";
import { UserAccountPage } from "./components/UserAccountPage";
import { CartProvider } from "./store/CartContext";
import ShoppingCartPage from "./components/ShoppingCartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccessPage from "./components/OrderSuccessPage";
import { getAllCategories } from "./services/categoryService";
import { getAllBooks } from "./services/bookService";
import Dashboard from "./admin/Dashboard";
import AuthModal from "./components/AuthModal";
import AdminSidebar from "./admin/components/AdminSidebar";
import BooksPage from "./admin/BooksPage";
import CategoriesPage from "./admin/CategoriesPage";
import OrdersPage from "./admin/OrdersPage";
import UsersPage from "./admin/UsersPage";
import RequireAdmin from "./admin/components/RequireAdmin";
import VnpayReturnPage from "./components/VnpayReturnPage";

function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newReleases, setNewReleases] = useState<any[]>([]);
  useEffect(() => {
    getAllCategories().then(setCategories);
    // Lấy 10 sách mới nhất theo id giảm dần
    getAllBooks({ page: 0, size: 10, sortBy: "id", sortDir: "desc" }).then(
      (res) => {
        setNewReleases(res.books || []);
      },
    );
  }, []);
  return (
    <div className="bookstore-app">
      <Header />
      <main className="main-content">
        <div className="content-container">
          <HeroSection />
          <CategoryGrid />
          <FlashSale />
          <CategorySection categories={categories} />
          <BookSection
            title="New Releases"
            books={[newReleases]}
            variant="new-releases"
          />
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handler = () => setShowAuthModal(true);
    window.addEventListener("show-auth-modal", handler);
    return () => window.removeEventListener("show-auth-modal", handler);
  }, []);

  // Lấy danh mục sản phẩm từ generateRecommendedBooks
  const productCategories = generateRecommendedBooks().map((book) => ({
    id: book.id,
    name: book.title,
    icon: "📚",
  }));
  return (
    <CartProvider>
      <BrowserRouter>
        <AuthModal
          open={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:bookId" element={<ProductDetailPage />} />
          <Route
            path="/category/:categoryName"
            element={<ProductListingPage categories={productCategories} />}
          />
          <Route path="/search" element={<ProductListingPage />} />
          <Route path="/account" element={<UserAccountPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-success/:orderId"
            element={<OrderSuccessPage />}
          />
          <Route
            path="/vnpay-payment-return"
            element={<VnpayReturnPage />}
          />
          <Route
            path="/admin/*"
            element={
              <RequireAdmin>
                <div style={{ display: "flex" }}>
                  <AdminSidebar />
                  <div style={{ width: "100%" }}>
                    <Routes>
                      <Route path="" element={<Dashboard />} />
                      <Route path="books" element={<BooksPage />} />
                      <Route path="categories" element={<CategoriesPage />} />
                      <Route path="orders" element={<OrdersPage />} />
                      <Route path="users" element={<UsersPage />} />
                    </Routes>
                  </div>
                </div>
              </RequireAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

// Sample data generators
function generateRecommendedBooks() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `rec-${i + 1}`,
    title: `Book ${i + 1}`,
    image: `https://placehold.co/96x160/${getRandomColor()}/${getRandomColor()}`,
    author: `Author ${i + 1}`,
    price: (Math.random() * 20 + 5).toFixed(2),
  }));
}

function generateNewReleases() {
  const books = Array.from({ length: 10 }, (_, i) => {
    const originalPrice = Math.floor(Math.random() * 100000) + 100000;
    const discount = Math.floor(Math.random() * 20) + 5;
    const price = originalPrice * (1 - discount / 100);
    return {
      id: `new-${i + 1}`,
      title: `Sách Mới Phát Hành ${i + 1}`,
      image: `https://placehold.co/180x180/${getRandomColor()}/${getRandomColor()}`,
      author: `Tác giả ${i + 1}`,
      price: price,
      originalPrice: originalPrice,
      discount: discount,
      rating: (Math.random() * 2 + 3).toFixed(1), // Rating from 3.0 to 5.0
      soldCount: Math.floor(Math.random() * 2000) + 100,
    };
  });
  return [books]; // Return as a single row for grid layout
}

function getRandomColor() {
  const colors = [
    "e8e8e8",
    "e0e0e0",
    "d8d8d8",
    "f0f0f0",
    "ececec",
    "e4e4e4",
    "dcdcdc",
    "f4f4f4",
    "e6e6e6",
    "eaeaea",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default App;
