import React, { useEffect, useState } from "react";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "../pages/styles/Inventory.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Inventory() {
  useEvaluationToNavigation();

  const [name, setName] = useState("");
  const [ingredientId, setIngredientId] = useState();
  const [quantity, setQuantity] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    fetch("/ingredient/all")
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data);
      });
  };

  function evaluateIngredient() {
    return !!name && !!quantity;
  }

  const saveIngredient = () => {
    const ingredient = {
      id: ingredientId,
      name,
      quantity,
    };

    if (evaluateIngredient()) {
      fetch("/ingredient/save", {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Ingredient successfully saved!");
          }
          getIngredients();
          cleanUpInventoryDialog();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const editIngredient = (ingredient) => {
    setIngredientId(ingredient.id);
    setName(ingredient.name);
    setQuantity(ingredient.quantity);
  };

  const cleanUpInventoryDialog = () => {
    setIngredientId(undefined);
    setName("");
    setQuantity(0);
  };

  const deleteIngredient = (id) => {
    fetch("/ingredient/delete/" + id, { method: "DELETE" })
      .then((response) => {
        if (response.status === 200) {
          console.log("Product successfully deleted!");
        } else if (response.status === 409) {
          alert("Ingredient is in use and can not be deleted!");
        }
        getIngredients();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="inventory-page">
      <ArrowBackIcon
        className="go-back"
        fontSize="large"
        onClick={() => navigate("/home")}
      ></ArrowBackIcon>
      <div className="inventory-container">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, overflowX: "scroll" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: " rgba(33, 96, 95, 0.5)",
                  height: 70,
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                  align="center"
                >
                  Edit
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                  align="center"
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow
                  className={
                    ingredient.quantity <= 10
                      ? "very-low"
                      : ingredient.quantity > 10 && ingredient.quantity <= 30
                      ? "low"
                      : "normal"
                  }
                  key={ingredient.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                    component="th"
                    scope="row"
                  >
                    {ingredient.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                    align="center"
                  >
                    {ingredient.quantity}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <EditIcon
                      fontSize="large"
                      sx={{ cursor: "pointer" }}
                      onClick={() => editIngredient(ingredient)}
                    ></EditIcon>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <DeleteForeverIcon
                      fontSize="large"
                      sx={{ cursor: "pointer" }}
                      onClick={() => deleteIngredient(ingredient.id)}
                    ></DeleteForeverIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="ingredients-form">
          <form className="add-form">
            <h2 className="form-add-title">Add ingredient</h2>
            <TextField
              id="outlined-basic"
              label="Name"
              value={name}
              variant="outlined"
              required
              sx={{ height: 60, marginBottom: 6 }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <TextField
              id="outlined-basic"
              label="Quantity"
              value={quantity}
              type="number"
              variant="outlined"
              required
              onChange={(e) => setQuantity(e.target.value)}
            ></TextField>
          </form>

          <AddCircleIcon
            sx={{ fontSize: 50, cursor: "pointer" }}
            onClick={() => {
              saveIngredient();
              console.log();
            }}
          ></AddCircleIcon>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
