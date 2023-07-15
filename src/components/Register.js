import React, { useEffect, useState } from "react";
import "../components/stylesComponents/Register.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import { Alert, Snackbar } from "@mui/material";

function Register({ users }) {
  useEvaluationToNavigation();
  const navigate = useNavigate();

  const [id, setId] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const location = useLocation();
  useEffect(() => {
    if (!!location.state && !!location.state.user) {
      const editUser = location.state.user;
      setId(editUser.id);
      setFirstName(editUser.firstName);
      setLastName(editUser.lastName);
      setRole(editUser.role);
      setPhoneNumber(editUser.phoneNumber);
      setEmail(editUser.email);
      setDateOfBirth(editUser.birthDate);
      setAddress(editUser.address);
      setPin(editUser.pin);
    }
  }, []);

  function evaluateRegistration() {
    return (
      !!firstName &&
      !!lastName &&
      !!role &&
      !!phoneNumber &&
      !!email &&
      !!dateOfBirth &&
      !!address &&
      !!pin
    );
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const saveEmployee = () => {
    const user = {
      pin,
      firstName,
      lastName,
      role,
      email,
      phoneNumber,
      birthDate: dateOfBirth,
      address,
    };
    if (!!id) {
      user.id = id;
    }
    fetch("/user/save", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Users successfully created!");
          setMessage("Users successfully created!");
          navigate("/users");
        } else if (response.status === 226) {
          console.log("Pin is already in use for another user!");
          setMessage("Pin is already in use for another user!");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <label>First name:</label>
        <input
          placeholder="First name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>

        <label>Last name:</label>
        <input
          placeholder="Last name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>

        <label>Role:</label>
        <select
          className="select"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" selected disabled hidden>
            Choose here
          </option>
          <option value="Manager">Manager</option>
          <option value="Server">Server</option>
        </select>

        <label>Phone number:</label>
        <input
          placeholder="07********"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>

        <label>Email:</label>
        <input
          type="email"
          placeholder="your_mail@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label>Date of birth:</label>
        <input
          type="date"
          required
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        ></input>

        <label>Adresss:</label>
        <input
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <label>PIN:</label>
        <input
          type="password"
          placeholder="****"
          maxLength={4}
          required
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        ></input>
      </form>
      <button
        className="register-btn"
        disabled={!evaluateRegistration()}
        onClick={() => {
          saveEmployee();
          setOpen(true);
        }}
      >
        Register
      </button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "110%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;
