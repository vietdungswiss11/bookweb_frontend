import React from "react";

interface SaleBook {
  id: string;
  title: string;
  image: string;
  price: string;
}

const FlashSale: React.FC = () => {
  const saleBooks: SaleBook[] = [
    {
      id: "sale-1",
      title: "Sale Book 1",
      image: "https://placehold.co/160x213/c4a485/c4a485",
      price: "$5.99",
    },
    {
      id: "sale-2",
      title: "Sale Book 2",
      image: "https://placehold.co/160x213/8fb36b/8fb36b",
      price: "$7.99",
    },
    {
      id: "sale-3",
      title: "Sale Book 3",
      image: "https://placehold.co/160x213/7a9c5a/7a9c5a",
      price: "$9.99",
    },
    {
      id: "sale-4",
      title: "Sale Book 4",
      image: "https://placehold.co/160x213/d4c4a8/d4c4a8",
      price: "$11.99",
    },
    {
      id: "sale-5",
      title: "Sale Book 5",
      image: "https://placehold.co/160x213/b8a68a/b8a68a",
      price: "$13.99",
    },
    {
      id: "sale-6",
      title: "Sale Book 6",
      image: "https://placehold.co/160x213/9c8c76/9c8c76",
      price: "$15.99",
    },
    {
      id: "sale-7",
      title: "Sale Book 7",
      image: "https://placehold.co/160x213/e8d8c4/e8d8c4",
      price: "$17.99",
    },
    {
      id: "sale-8",
      title: "Sale Book 8",
      image: "https://placehold.co/160x213/a4947e/a4947e",
      price: "$19.99",
    },
  ];

  return (
    <section className="flash-sale">
      <h2 className="section-title">Flash Sale</h2>

      <div className="countdown-container">
        <div className="countdown-item">
          <div className="countdown-number">
            <div className="countdown-value">02</div>
          </div>
          <div className="countdown-label-container">
            <div className="countdown-label">Days</div>
          </div>
        </div>

        <div className="countdown-item">
          <div className="countdown-number">
            <div className="countdown-value">12</div>
          </div>
          <div className="countdown-label-container">
            <div className="countdown-label">Hours</div>
          </div>
        </div>

        <div className="countdown-item">
          <div className="countdown-number">
            <div className="countdown-value">14</div>
          </div>
          <div className="countdown-label-container">
            <div className="countdown-label">Minutes</div>
          </div>
        </div>

        <div className="countdown-item">
          <div className="countdown-number">
            <div className="countdown-value">56</div>
          </div>
          <div className="countdown-label-container">
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
      </div>

      <div className="sale-books-container">
        <div className="sale-books-scroll">
          {saleBooks.map((book) => (
            <div key={book.id} className="sale-book-card">
              <img
                src={book.image}
                alt={book.title}
                className="sale-book-image"
              />
              <div className="sale-book-info">
                <div className="sale-book-details">
                  <div className="sale-book-title">{book.title}</div>
                  <div className="sale-book-price">{book.price}</div>
                </div>
                <button className="sale-book-button">
                  <div className="sale-button-text">Shop Sale</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
