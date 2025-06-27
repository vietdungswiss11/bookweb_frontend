import React, { useState } from "react";
import './SearchBar.css';
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <form className="search-bar-container" onSubmit={handleSearch}>
      <div className="category-dropdown">
        <button type="button" className="category-button">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Bút chấm đọc - Học tiếng Anh"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="search-button">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default SearchBar;
