import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/styles/MainMenu.css";
import CategoryMenu from "../components/CategoryMenu.js";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MainMenu() {
  const allCategories = [
    "All",
    "Burgers",
    "Salads",
    "Dessert",
    "Sides",
    "Main course",
    "Starters",
    "Soft drinks",
    "Wine",
    "Beer",
    "Cocktails",
  ];

  useEvaluationToNavigation();
  const [menuItems, setMenuItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [categories, setCategories] = useState(allCategories);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("/product/all")
      .then((response) => response.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          data[i].picture = "data:image/png;base64," + data[i].picture;
        }
        setMenuItems(data);
        setAllItems(data);
      });
  };

  const getIngredientsDescription = (ingredients) => {
    let description = "";
    for (var i = 0; i < ingredients.length; i++) {
      const nameIngredient = ingredients[i].name;
      description = description + nameIngredient + ", ";
    }

    return description.substring(0, description.length - 2);
  };
  const filterItems = (category) => {
    if (category === "All") {
      setMenuItems(allItems);
      return;
    }
    const newItems = allItems.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <div className="main-menu-container">
      <div className="header">
        {" "}
        <ArrowBackIcon
          className="go-back"
          fontSize="large"
          onClick={() => navigate("/home")}
        ></ArrowBackIcon>
      </div>
      <div className="top-section">
        <p className="menu-title">MENU</p>
        <CategoryMenu
          categories={categories}
          filterItems={filterItems}
        ></CategoryMenu>
      </div>

      <div className="lower-section">
        {menuItems.map((menuItem) => {
          return (
            <article key="id" className="menu-display-item">
              <img
                src={menuItem.picture}
                alt={menuItem.name}
                className="photo-display"
              ></img>
              <div className="item-desc">
                <header>
                  <h3>{menuItem.name}</h3>
                  <p className="product-description">
                    {getIngredientsDescription(menuItem.ingredients)}{" "}
                  </p>
                </header>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default MainMenu;
