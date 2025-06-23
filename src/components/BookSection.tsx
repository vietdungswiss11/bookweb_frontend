import React from "react";

interface Book {
  id: string;
  title: string;
  image: string;
  author?: string;
  price?: string;
}

interface BookSectionProps {
  title: string;
  books: Book[] | Book[][];
  variant?: "recommended" | "new-releases";
  showScrollIndicator?: boolean;
}

const BookSection: React.FC<BookSectionProps> = ({
  title,
  books,
  variant = "recommended",
  showScrollIndicator = false,
}) => {
  const isNewReleases = variant === "new-releases";
  const booksArray = Array.isArray(books[0])
    ? (books as Book[][])
    : [books as Book[]];

  return (
    <section className={`book-section ${variant}`}>
      <h2 className="section-title">{title}</h2>

      <div className="books-container">
        {isNewReleases ? (
          // New Releases - Multiple rows
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              width: "100%",
            }}
          >
            {booksArray.map((row, rowIndex) => (
              <div key={rowIndex} className="books-scroll">
                {row.map((book) => (
                  <div key={book.id} className="book-card">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="book-image"
                    />
                    <div className="book-info">
                      <div className="book-title">{book.title}</div>
                      {book.author && (
                        <div className="book-author">{book.author}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          // Recommended - Single scrollable row
          <div className="books-scroll">
            {(books as Book[]).map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.image} alt={book.title} className="book-image" />
                <div className="book-title">{book.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSection;
