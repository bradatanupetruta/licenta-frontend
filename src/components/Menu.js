import React from "react";
import "./stylesComponents/Menu.css";

function Menu({ items, addItemToOrder }) {
  const clickHandler = (menuItem) => {
    addItemToOrder(menuItem);
  };

  return (
    <div className="menu-container">
      {items.map((menuItem) => {
        return (
          <article
            key="id"
            className={
              menuItem.alert === "LOW"
                ? "low-class"
                : menuItem.alert === "VERY_LOW"
                ? "very-low-class"
                : "menu-item"
            }
            onClick={() => clickHandler(menuItem)}
          >
            <img
              src={menuItem.picture}
              alt={menuItem.name}
              className="photo"
            ></img>
            <div className="item-info">
              <header>
                <h4>{menuItem.name}</h4>
              </header>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Menu;
