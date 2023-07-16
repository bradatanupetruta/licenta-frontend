import React, { useEffect, useState } from "react";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../pages/styles/UpdateMenu.css";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalWindow from "../components/ModalWindow";

const allCategories = [
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

function UpdateMenu() {
  useEvaluationToNavigation();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState(allCategories);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getProducts();
    getIngredients();
  }, []);

  const getProducts = () => {
    fetch("/product/all")
      .then((response) => response.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          data[i].picture = "data:image/png;base64," + data[i].picture;
        }
        setProducts(data);
      });
  };

  const getIngredients = () => {
    fetch("/ingredient/all")
      .then((response) => response.json())
      .then((data) => {
        const ingredients = [];
        for (var i = 0; i < data.length; i++) {
          const ingredientOption = {
            id: data[i].id,
            name: data[i].name,
            quantity: 0,
          };
          ingredients.push(ingredientOption);
        }
        setIngredients(ingredients);
      });
  };

  const evaluateProduct = () => {
    return !!name && !!price && !!category;
  };

  const saveProduct = () => {
    const product = {
      id: productId,
      name,
      price,
      category,
      ingredients,
    };
    if (!!image) {
      product.imageName = image.name;
    }

    if (evaluateProduct()) {
      fetch("/product/save", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          response.json().then((responseData) => {
            if (response.status === 200) {
              if (!!image) {
                saveImage(responseData.img);
              } else {
                getProducts();
                cleanUpAddDialog();
              }
            }
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const saveImage = (imageName) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", imageName);

    fetch("/product/save-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Product successfully saved!");
        }
        getProducts();
        cleanUpAddDialog();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editProduct = (product) => {
    cleanUpAddDialog();
    setProductId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    if (!!product.ingredients && product.ingredients.length > 0) {
      const map = new Map();
      for (var i = 0; i < product.ingredients.length; i++) {
        map.set(product.ingredients[i].id, product.ingredients[i].quantity);
      }
      for (var i = 0; i < ingredients.length; i++) {
        const quantity = map.get(ingredients[i].id);
        if (!!quantity) {
          ingredients[i].quantity = quantity;
        }
      }
    }
  };

  const cleanUpAddDialog = () => {
    setProductId(undefined);
    setName("");
    setPrice(0);
    setCategory("");
    setImage(undefined);
    document.getElementById("image-file").value = "";
    for (var i = 0; i < ingredients.length; i++) {
      ingredients[i].quantity = 0;
    }
  };

  const deleteProduct = (id) => {
    fetch("/product/delete/" + id, { method: "DELETE" })
      .then((response) => {
        if (response.status === 200) {
          console.log("Product successfully deleted!");
        } else if (response.status === 409) {
          alert("Product is in use and can not be deleted!");
        }
        getProducts();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="inventory-page">
      {openModal && (
        <ModalWindow
          closeModal={setOpenModal}
          ingredients={ingredients}
        ></ModalWindow>
      )}
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
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                  align="center"
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                  align="center"
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                  align="center"
                >
                  Ingredients
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
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                    component="th"
                    scope="row"
                  >
                    {product.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                    align="center"
                  >
                    {product.price}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                    align="center"
                  >
                    {product.category}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                    align="center"
                  >
                    <img alt="" width="80" height="60" src={product.picture} />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: 15,
                      maxWidth: 300,
                    }}
                    align="center"
                  >
                    {product.ingredientsDescription}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <EditIcon
                      fontSize="large"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        editProduct(product);
                        console.log();
                      }}
                    ></EditIcon>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <DeleteForeverIcon
                      fontSize="large"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteProduct(product.id);
                        console.log();
                      }}
                    ></DeleteForeverIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="add-product-form">
          <form className="product-form">
            <h2 className="add-product-title">Add product</h2>
            <TextField
              label="Name"
              value={name}
              variant="outlined"
              required
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <TextField
              id="outlined-basic"
              label="Price"
              value={price}
              type="number"
              variant="outlined"
              required
              onChange={(e) => setPrice(e.target.value)}
            ></TextField>
            <select
              className="select-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled hidden>
                Select category...
              </option>
              {categories.map((category, index) => {
                return <option>{category}</option>;
              })}
            </select>
            <TextField
              id="image-file"
              type="file"
              variant="outlined"
              required
              onChange={(e) => setImage(e.target.files[0])}
            ></TextField>
            <Button
              variant="container"
              className="select-btn"
              sx={{
                fontSize: 18,
                backgroundColor: "rgba(33, 96, 95, 0.5)",
                ":hover": { backgroundColor: "rgba(23, 86, 95, 0.3)" },
              }}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Select ingredients
            </Button>
          </form>

          <AddCircleIcon
            sx={{ fontSize: 50 }}
            onClick={() => {
              saveProduct();
              console.log();
            }}
          ></AddCircleIcon>
        </div>
      </div>
    </div>
  );
}

export default UpdateMenu;
