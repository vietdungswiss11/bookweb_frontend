import React from "react";
import { Header, ProductDetailPage } from "./components";
import "./App.css";

function ProductDetailDemo() {
  return (
    <div className="bookstore-app">
      <Header />
      <main className="main-content">
        <ProductDetailPage productId="1" />
      </main>
    </div>
  );
}

export default ProductDetailDemo;
