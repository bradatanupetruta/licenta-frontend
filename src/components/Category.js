import React from "react";
import "./stylesComponents/Category.css";

function Categories({ categories, filterItems }) {
  return (
    <div className="categories-container">
      {categories.map((category, index) => {
        return (
          <div
            className="category"
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
