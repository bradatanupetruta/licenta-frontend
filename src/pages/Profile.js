import React, { useState } from "react";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import "../pages/styles/Profile.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { getValueForKey } from "../util/useLocalStorage";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Profile() {
  useEvaluationToNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const user = getValueForKey("user");
  const navigate = useNavigate();

  return (
    <div className="profile">
      <ArrowBackIcon
        className="go-back-profile"
        fontSize="large"
        onClick={() => navigate("/home")}
      ></ArrowBackIcon>
      <div className="profile-container">
        <AccountBoxIcon
          className="profile-icon"
          fontSize="large"
          sx={{ fontSize: 90 }}
        ></AccountBoxIcon>

        <div className="profile-description">
          <TextField
            className="profile-input"
            label="Last Name"
            defaultValue={!!user ? user.lastName : ""}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>

          <TextField
            className="profile-input"
            label="First Name"
            defaultValue={!!user ? user.firstName : ""}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>
          <TextField
            className="profile-input"
            label="Role"
            defaultValue={!!user ? user.role : ""}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>

          <TextField
            className="profile-input"
            label="Phone number"
            defaultValue={!!user ? user.phoneNumber : ""}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>
          <TextField
            className="profile-input"
            label="Email"
            defaultValue={!!user ? user.email : ""}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>

          <TextField
            className="profile-input"
            label="Date of birth"
            defaultValue={!!user ? user.birthDate : ""}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>
          <TextField
            className="profile-input"
            label="Address"
            multiline
            defaultValue={!!user ? user.address : ""}
            InputProps={{
              readOnly: true,
            }}
            sx={{ maxWidth: 400 }}
          ></TextField>

          <TextField
            className="profile-input"
            label="Password"
            defaultValue={!!user ? user.pin : ""}
            type={showPassword ? "text" : "password"}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
      </div>
    </div>
  );
}

export default Profile;
