import React from "react";

function CategoryMenu({ categories, filterItems }) {
  return (
    <div className="category-menu-container">
      {categories.map((category, index) => {
        return (
          <div
            className="category-menu"
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

export default CategoryMenu;
