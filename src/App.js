import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import Inventory from "./pages/Inventory";
import UpdateMenu from "./pages/UpdateMenu";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import MainMenu from "./pages/MainMenu";
import OrdersStatus from "./pages/OrdersStatus";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {" "}
          <Route path="/" element={<Login></Login>}></Route>
        </Routes>
        <Routes>
          <Route path="/home" element={<Home></Home>}></Route>
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
        <Routes>
          {" "}
          <Route path="/order" element={<Order></Order>}></Route>
        </Routes>
        <Routes>
          <Route path="/inventory" element={<Inventory></Inventory>}></Route>
        </Routes>
        <Routes>
          <Route path="/users" element={<Users></Users>}></Route>
        </Routes>
        <Routes>
          <Route
            path="/update-menu"
            element={<UpdateMenu></UpdateMenu>}
          ></Route>
        </Routes>
        <Routes>
          <Route path="/reports" element={<Reports></Reports>}></Route>
        </Routes>
        <Routes>
          <Route path="/main-menu" element={<MainMenu></MainMenu>}></Route>
        </Routes>
        <Routes>
          <Route
            path="/orders-status"
            element={<OrdersStatus></OrdersStatus>}
          ></Route>
        </Routes>

        <Routes>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
