import React, { useEffect, useState } from "react";
import "./styles/Order.css";
import Category from "../components/Category";
import Receipt from "../components/Receipt";
import Menu from "../components/Menu";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Order() {
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
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [categories, setCategories] = useState(allCategories);
  const [orderId, setOrderId] = useState();
  const [ingredientMap, setIngredientMap] = useState(new Map());
  let [receiptItems, setReceiptItems] = useState([]);

  const location = useLocation();
  const tabindex = location.state?.tabindex;

  useEffect(() => {
    getIngredients();
    getOrderForTable();
  }, []);

  const getProducts = (ingredientMap) => {
    fetch("/product/all")
      .then((response) => response.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          data[i].picture = "data:image/png;base64," + data[i].picture;
          evaluateSock(ingredientMap, data[i]);
        }
        setMenuItems(data);
        setAllItems(data);
      });
  };

  const getIngredients = () => {
    fetch("/ingredient/all")
      .then((response) => response.json())
      .then((data) => {
        const map = new Map();
        for (var i = 0; i < data.length; i++) {
          map.set(data[i].id, data[i].quantity);
        }
        setIngredientMap(map);
        return map;
      })
      .then((response) => {
        if (response) {
          getProducts(response);
        }
      });
  };

  const getOrderForTable = () => {
    fetch("/order/orderByTab/" + tabindex)
      .then((response) => {
        if (response.status === 204) {
          return undefined;
        }
        return response.json();
      })
      .then((order) => {
        if (!!order && !!order.products && order.products.length > 0) {
          setOrderId(order.orderid);
          let savedItems = [];
          for (var i = 0; i < order.products.length; i++) {
            if (!!order.products[i] && !!order.products[i].product) {
              const product = order.products[i].product;
              const savedItem = {
                category: product.category,
                id: product.id,
                imageName: product.image,
                ingredients: product.ingredients,
                name: product.name,
                price: product.price,
                quantity: order.products[i].quantity,
              };
              savedItems.push(savedItem);
            }
          }
          setReceiptItems(savedItems);
        }
      });
  };

  const filterItems = (category) => {
    if (category === "All") {
      setMenuItems(allItems);
      return;
    }
    const newItems = allItems.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const addItems = (menuItem) => {
    updateIngredientMap(menuItem);
    evaluateSock(ingredientMap, menuItem);

    if (receiptItems.length !== 0 && itemExists(menuItem)) {
      let newArray = [...receiptItems];
      receiptItems = [];
      for (var i = 0; i < newArray.length; i++) {
        if (newArray[i].id === menuItem.id) {
          newArray[i].quantity++;
        }
      }
      setReceiptItems([...receiptItems, ...newArray]);
    } else {
      menuItem.quantity = 1;
      setReceiptItems([...receiptItems, menuItem]);
    }
  };

  const evaluateSock = (ingredientMap, menuItem) => {
    for (var i = 0; i < menuItem.ingredients.length; i++) {
      const existingQuantity = ingredientMap.get(menuItem.ingredients[i].id);
      if (existingQuantity < 10) {
        menuItem.alert = "VERY_LOW";
      } else if (existingQuantity < 50 && menuItem.alert !== "VERY_LOW") {
        menuItem.alert = "LOW";
      } else if (menuItem.alert !== "VERY_LOW" || menuItem.alert !== "LOW") {
        menuItem.alert = "OK";
      }
    }
  };

  const updateIngredientMap = (menuItem) => {
    for (var i = 0; i < menuItem.ingredients.length; i++) {
      const existingQuantity = ingredientMap.get(menuItem.ingredients[i].id);
      const usedQuantity = menuItem.ingredients[i].quantity;
      const totalQuantity = existingQuantity - usedQuantity;
      ingredientMap.set(menuItem.ingredients[i].id, totalQuantity);
    }
    setIngredientMap(ingredientMap);
  };
  const itemExists = (menuItem) => {
    var exist = false;
    receiptItems.forEach((item) => {
      if (item.id === menuItem.id) {
        exist = true;
      }
    });
    return exist;
  };

  return (
    <div className="orderPage">
      <ArrowBackIcon
        className="go-back-order-status"
        fontSize="large"
        onClick={() => navigate("/home")}
      ></ArrowBackIcon>
      <div className="orderPage-container">
        <Category categories={categories} filterItems={filterItems}></Category>
        <Menu items={menuItems} addItemToOrder={addItems}></Menu>
        <Receipt
          items={receiptItems}
          tabindex={tabindex}
          orderId={orderId}
        ></Receipt>
      </div>
    </div>
  );
}

export default Order;
