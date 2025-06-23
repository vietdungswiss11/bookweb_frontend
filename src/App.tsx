import React, { useState } from "react";
import "./App.css";
import {
  Header,
  HeroSection,
  SearchBar,
  CategoryGrid,
  BookSection,
  FlashSale,
  Newsletter,
  ProductDetailPage,
  ProductListingPage,
  ShoppingCartPage,
  UserAccountPage,
} from "./components";

function App() {
  const [currentView, setCurrentView] = useState<
    "home" | "product" | "listing" | "cart" | "account"
  >("home");

  const showHome = () => setCurrentView("home");
  const showProductDetail = () => setCurrentView("product");
  const showProductListing = () => setCurrentView("listing");
  const showShoppingCart = () => setCurrentView("cart");
  const showUserAccount = () => setCurrentView("account");

  return (
    <div className="bookstore-app">
      <Header />

      {/* Navigation Controls */}
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          borderBottom: "1px solid #e5e8eb",
          background: "#f9f9f9",
        }}
      >
        <button
          onClick={showHome}
          style={{
            padding: "10px 15px",
            margin: "0 3px",
            border:
              currentView === "home" ? "2px solid #009963" : "1px solid #ccc",
            background: currentView === "home" ? "#009963" : "white",
            color: currentView === "home" ? "white" : "#333",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Homepage
        </button>
        <button
          onClick={showProductListing}
          style={{
            padding: "10px 15px",
            margin: "0 3px",
            border:
              currentView === "listing"
                ? "2px solid #009963"
                : "1px solid #ccc",
            background: currentView === "listing" ? "#009963" : "white",
            color: currentView === "listing" ? "white" : "#333",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Product Listing
        </button>
        <button
          onClick={showProductDetail}
          style={{
            padding: "10px 15px",
            margin: "0 3px",
            border:
              currentView === "product"
                ? "2px solid #009963"
                : "1px solid #ccc",
            background: currentView === "product" ? "#009963" : "white",
            color: currentView === "product" ? "white" : "#333",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Product Detail
        </button>
        <button
          onClick={showShoppingCart}
          style={{
            padding: "10px 15px",
            margin: "0 3px",
            border:
              currentView === "cart" ? "2px solid #009963" : "1px solid #ccc",
            background: currentView === "cart" ? "#009963" : "white",
            color: currentView === "cart" ? "white" : "#333",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Shopping Cart
        </button>
        <button
          onClick={showUserAccount}
          style={{
            padding: "10px 15px",
            margin: "0 3px",
            border:
              currentView === "account"
                ? "2px solid #009963"
                : "1px solid #ccc",
            background: currentView === "account" ? "#009963" : "white",
            color: currentView === "account" ? "white" : "#333",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          User Account
        </button>
      </div>

      <main className="main-content">
        {currentView === "home" && (
          <div className="content-container">
            <HeroSection />
            <SearchBar />
            <CategoryGrid />
            <BookSection
              title="Recommended for You"
              books={generateRecommendedBooks()}
              showScrollIndicator={true}
            />
            <FlashSale />
            <BookSection
              title="New Releases"
              books={generateNewReleases()}
              variant="new-releases"
            />
            <Newsletter />
          </div>
        )}

        {currentView === "listing" && (
          <ProductListingPage searchQuery="fiction books" category="Fiction" />
        )}

        {currentView === "product" && <ProductDetailPage productId="1" />}

        {currentView === "cart" && <ShoppingCartPage userId="user123" />}

        {currentView === "account" && <UserAccountPage />}
      </main>
    </div>
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
  const rows = [
    Array.from({ length: 5 }, (_, i) => ({
      id: `new-1-${i + 1}`,
      title: `New Book ${i + 1}`,
      image: `https://placehold.co/176x235/${getRandomColor()}/${getRandomColor()}`,
      author: `Author ${i + 1}`,
      price: (Math.random() * 25 + 10).toFixed(2),
    })),
    Array.from({ length: 5 }, (_, i) => ({
      id: `new-2-${i + 6}`,
      title: `New Book ${i + 6}`,
      image: `https://placehold.co/176x235/${getRandomColor()}/${getRandomColor()}`,
      author: `Author ${i + 6}`,
      price: (Math.random() * 25 + 10).toFixed(2),
    })),
    Array.from({ length: 2 }, (_, i) => ({
      id: `new-3-${i + 11}`,
      title: `New Book ${i + 11}`,
      image: `https://placehold.co/176x235/${getRandomColor()}/${getRandomColor()}`,
      author: `Author ${i + 11}`,
      price: (Math.random() * 25 + 10).toFixed(2),
    })),
  ];
  return rows;
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
