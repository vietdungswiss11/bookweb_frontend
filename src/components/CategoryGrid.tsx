import React from "react";

const CategoryGrid: React.FC = () => {
  const categories = [
    [
      { name: "Fiction", className: "fiction" },
      { name: "Self-help", className: "self-help" },
      { name: "Manga", className: "manga" },
      { name: "Biographies", className: "biographies" },
      { name: "History", className: "history" },
    ],
    [
      { name: "Romance", className: "romance" },
      { name: "Science Fiction", className: "science-fiction" },
      { name: "Children", className: "children" },
      { name: "Young Adult", className: "young-adult" },
      { name: "Mystery", className: "mystery" },
    ],
    [
      { name: "Thriller", className: "thriller" },
      { name: "Fantasy", className: "fantasy" },
    ],
  ];

  return (
    <section className="category-section">
      {categories.map((row, rowIndex) => (
        <div key={rowIndex} className="category-row">
          {row.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`category-card ${category.className}`}
            >
              <div className="category-label">{category.name}</div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default CategoryGrid;
