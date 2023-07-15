import React, {useEffect, useState} from "react";
import BarsChart from "./BarsChart";

function IngredientsReport() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [options, setOption] = useState({
        chart: {id: "barsChart",},
        xaxis: { categories: [] },
    });
  const [series, setSeries] = useState([
        {name: "stock-value", data: [],},
    ]);


  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    fetch("/ingredient/all")
      .then((response) => response.json())
      .then((data) => {
        const ingredients = [];
        for (var i = 0; i < data.length; i++) {
          const ingredientOption = {
            id: data[i].id,
            name: data[i].name,
          };
          ingredients.push(ingredientOption);
        }
        setIngredients(ingredients);
      });
  };

  const getSalesByCategory = (id) => {
    fetch("/order/ingredient-sale/" + id)
        .then((response) => response.json())
        .then((data) => {
          let ingredientDate = [];
          let ingredientValue = [];
          for(var i= 0; i<data.length; i++){
            ingredientDate.push(data[i].orderDate);
            ingredientValue.push(data[i].ingredientQuantity);
          }

          const dateOption = {
              chart: {
                  id: "barsChart",
              },
              xaxis: { categories: ingredientDate },
          };

          const valueSeries = [
              {
                  name: "stock-value",
                  data: ingredientValue,
              },
          ];
          setOption(dateOption);
          setSeries(valueSeries);
        });
  };

  const onIngredientSelected = (ingredient) => {
    setIngredient(ingredient);
    const id = getIngredientId(ingredient);
    if(!!id) {
        getSalesByCategory(id);
    }
  };

  const getIngredientId = (ingredient) => {
      for(var i=0; i<ingredients.length; i++) {
          if (ingredients[i].name === ingredient) {
              return ingredients[i].id;
          }
      }
      return undefined;
  };

  return (
    <div className="ingredients-report-container">
      <h1 className="title">Inventory report</h1>
      <div className="header-ingredients">
        {" "}
        <select
          className="select-ingredient"
          value={ingredient}
          onChange={(e) => onIngredientSelected(e.target.value)}
        >
          <option value="" disabled hidden>
            Select ingredient...
          </option>
          {ingredients.map((ingredient, index) => {
            return <option>{ingredient.name}</option>;
          })}
        </select>
      </div>
      <BarsChart options={options} series={series}></BarsChart>
    </div>
  );
}

export default IngredientsReport;
