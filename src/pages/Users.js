import React, { useEffect, useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import "../pages/styles/Users.css";
import { useNavigate } from "react-router-dom";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Users() {
  useEvaluationToNavigation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("user/all")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const editUser = (user) => {
    navigate("/register", { state: { user: user } });
  };

    const deleteUser = (id) => {
        fetch("/user/delete/" + id, {method: "DELETE"})
            .then((response) => {
                if (response.status === 200) {
                    console.log("Product successfully deleted!");
                } else if(response.status === 409) {
                    alert("User is in use and can not be deleted!");
                }
                getUsers();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

  return (
    <div className="users-container">
      <ArrowBackIcon
        className="go-back"
        fontSize="large"
        onClick={() => navigate("/home")}
      ></ArrowBackIcon>
      <PersonAddAlt1Icon
        className="add-user"
        sx={{ fontSize: 56 }}
        onClick={() => navigate("/register")}
      ></PersonAddAlt1Icon>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, overflowX: "scroll" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: " rgba(49, 145, 113, 0.684)",
                height: 70,
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                First name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
                align="center"
              >
                Last name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
                align="center"
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
                align="center"
              >
                Phone number
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
                align="center"
              >
                Date of birth
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
                align="center"
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
                align="center"
              >
                Edit
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
                align="center"
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.pin}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  ":hover": { backgroundColor: "rgba(110, 192, 164, 0.6)" },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontSize: 15,
                  }}
                >
                  {user.firstName}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 15,
                  }}
                  align="center"
                >
                  {user.lastName}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 15,
                  }}
                  align="center"
                >
                  {user.role}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 15,
                  }}
                  align="center"
                >
                  {user.phoneNumber}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 15,
                  }}
                  align="center"
                >
                  {user.email}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 15,
                  }}
                  align="center"
                >
                  {user.birthDate}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 15,
                  }}
                  align="center"
                >
                  {user.address}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <EditIcon
                    fontSize="large"
                    sx={{ ":hover": { cursor: "pointer" } }}
                    onClick={() => {
                      editUser(user);
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
                      deleteUser(user.id);
                      console.log();
                    }}
                  ></DeleteForeverIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;
