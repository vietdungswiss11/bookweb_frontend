import React from "react";
import "./ProductGrid.css";
import ProductCard from "./ProductCard";
import { Product } from "./ProductListingPage";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onProductClick: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onProductClick,
}) => {
  if (loading) {
    return (
      <div className="product-grid">
        <div className="loading-state">
          <div className="loading-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="loading-card">
                <div className="loading-image"></div>
                <div className="loading-text">
                  <div className="loading-line long"></div>
                  <div className="loading-line medium"></div>
                  <div className="loading-line short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
