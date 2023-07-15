import React, { useState } from "react";
import "./stylesComponents/Navbar.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { SidebarData } from "./data/SidebarData";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { NavbarData } from "./data/NavbarData";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import { getValueForKey } from "../util/useLocalStorage";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  useEvaluationToNavigation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const currentUser = getValueForKey("user");

  const showSidebar = () => setSidebar(!sidebar);

  const validateUser = () => {
    if(!currentUser) {
      return false;
    }

    if (currentUser.role === "Manager") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="sidebar">
          <div className="navbar-menu">
            <Link to="#" className="menu-bars">
              <MenuIcon
                className={
                  validateUser()
                    ? "menu-manager"
                    : "menu-employee"
                }
                fontSize="large"
                sx={{
                  color: "white",
                }}
                onClick={showSidebar}
              ></MenuIcon>
            </Link>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <CloseIcon
                      className="close-menu"
                      sx={{ color: "white" }}
                      fontSize="large"
                    ></CloseIcon>
                  </Link>
                </li>

                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <div className="navbar-navigation">
          {NavbarData.map((item, index) => {
            return (
              <div
                key={index}
                className={item.cName}
                onClick={() => navigate(item.path)}
              >
                {item.title}
              </div>
            );
          })}

          <div className="navbar-item">
            <LogoutIcon
              fontSize="large"
              onClick={() => {
                logout();
              }}
            ></LogoutIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
