import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategorySection.css";

interface Category {
    id: number | string;
    name: string;
}

interface CategorySectionProps {
    categories: Category[];
    activeCategoryId?: number | string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories, activeCategoryId }) => {
    const navigate = useNavigate();

    return (
        <section className="category-section">
            <h2>Danh mục sản phẩm</h2>
            <div className="category-list">
                <button
                    className={`category-btn${!activeCategoryId ? " active" : ""}`}
                    onClick={() => navigate('/category/tat-ca')}
                >
                    Tất cả
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-btn${activeCategoryId == cat.id ? " active" : ""}`}
                        onClick={() => navigate(`/category/${cat.id}`)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CategorySection; 