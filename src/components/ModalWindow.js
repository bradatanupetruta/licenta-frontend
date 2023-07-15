import React, {useEffect} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import "../components/stylesComponents/ModalWindow.css";
import { useState } from "react";

function ModalWindow({ closeModal, ingredients }) {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const increaseCount = (ingredient) => {
    const amount = ingredient.quantity;
    if(amount > 0 ) {
      ingredient.quantity = amount + 1;
    } else {
      ingredient.quantity = 1;
    }
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const decreaseCount = (ingredient) => {
    const amount = ingredient.quantity;
    if(amount > 1 ) {
      ingredient.quantity = amount - 1;
    } else {
      ingredient.quantity = 0;
    }
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <CloseIcon
          className="close-modal-btn"
          onClick={() => closeModal(false)}
          fontSize="medium"
        ></CloseIcon>
        <div className="modal-title">
          <h1>Select ingredients</h1>
        </div>
        <div className="modal-body">
          {ingredients.map((ingredient) => (
          <div className="ingredient-container">
            <div className="ingredient-name">{ingredient.name}</div>
            <div class="counter">
              <span class="down" onClick={() => decreaseCount(ingredient)}>
                -
              </span>
              <input className="counter-value" type="text" value={ingredient.quantity} />
              <span class="up" onClick={() => increaseCount(ingredient)}>
                +
              </span>
            </div>
          </div>
          ))}
        </div>
        <div className="modal-footer">
          <AddCircleIcon
            className="add-ingredients"
            sx={{ fontSize: 50 }}
            onClick={() => closeModal(false)}
          ></AddCircleIcon>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
