import React, { useState, useEffect } from "react";
import "./styles/Login.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";

const PIN_LENGTH = 4;

function Login() {
  const [pin, setPin] = useState(new Array(PIN_LENGTH).fill(""));
  const [user, setUser] = useLocalState("", "user");

  const navigate = useNavigate();
  localStorage.clear();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setPin([...pin.map((d, i) => (i === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleClick = (pin) => {
    const stringPin = pin.reduce((prev, curr) => prev + curr, "");

    console.log(stringPin);

    fetch("user/login/" + stringPin)
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else if (response.status === 404) {
          alert("Pin is not registered. Please try again!");
          setPin([...pin.map((value) => "")]);
        } else {
            return Promise.reject("Invalid pin");
          }
      })
      .then(([body, headers]) => {
        setUser(body);
        navigate("/home");
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <p className="pin-enter-text">Welcome</p>

        <div className="pin-input">
          {pin.map((data, index) => {
            return (
              <input
                type="password"
                maxLength="1"
                name="pin"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              ></input>
            );
          })}

          <RefreshIcon
            className="refresh-icon"
            fontSize="large"
            onClick={(e) => setPin([...pin.map((value) => "")])}
          ></RefreshIcon>
        </div>
        <button className="login-button" onClick={(e) => handleClick(pin)}>
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
