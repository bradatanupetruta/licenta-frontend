import React, { useState, useEffect } from "react";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import "../pages/styles/OrderStatus.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getValueForKey } from "../util/useLocalStorage";

function OrdersStatus() {
  useEvaluationToNavigation();
  const navigate = useNavigate();

  const orderStatus = ["ALL", "ACTIVE", "INACTIVE"];
  const currentUser = getValueForKey("user");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState(undefined);
  const [employee, setEmployee] = useState(undefined);

  useEffect(() => {
    if (!!currentUser && currentUser.role === "Manager") {
      getUsers();
    } else {
      setUsers([...users, currentUser]);
    }

    if (!!currentUser) {
      getOrders();
    }
  }, []);

  const getUsers = () => {
    fetch("user/all")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const getOrders = () => {
    fetch("/order/order-status")
      .then((response) => response.json())
      .then((data) => {
        setAllOrders(data);
        setOrders(data);
        filterOrdersByStatus(undefined, data);
      });
  };

  const filterOrdersByStatus = (status, allOrders) => {
    if (!!status && status !== "ALL") {
      let newItems = allOrders.filter((order) => order.orderStatus === status);
      if (currentUser.role === "Server") {
        let name = currentUser.lastName + " " + currentUser.firstName;
        newItems = newItems.filter((order) => order.server === name);
      }
      if (!!employee) {
        newItems = newItems.filter((order) => order.server === employee);
      }
      setOrders(newItems);
      setStatus(status);
    } else {
      if (currentUser.role === "Server") {
        const name = currentUser.lastName + " " + currentUser.firstName;
        const newItems = allOrders.filter((order) => order.server === name);
        setOrders(newItems);
      } else {
        if (!!employee) {
          const newItems = allOrders.filter(
            (order) => order.server === employee
          );
          setOrders(newItems);
        } else {
          setOrders(allOrders);
        }
      }
      setStatus("ALL");
    }
  };

  const filterOrdersByEmployee = (name) => {
    setEmployee(name);
    if (!!status && status !== "ALL") {
      const newItems = allOrders.filter(
        (order) => order.orderStatus === status && order.server === name
      );
      setOrders(newItems);
    } else {
      const newItems = allOrders.filter((order) => order.server === name);
      setOrders(newItems);
    }
  };

  const getUserName = (user) => {
    if (!user) {
      return "";
    }
    return user.lastName + " " + user.firstName;
  };

  return (
    <div className="order-status-page">
      <ArrowBackIcon
        className="go-back-order-status"
        fontSize="large"
        onClick={() => navigate("/home")}
      ></ArrowBackIcon>
      <div className="order-status-header">
        <div className="order-status">
          {orderStatus.map((localStatus, index) => {
            return (
              <Button
                className="status-btn"
                variant="contained"
                sx={
                  localStatus === status
                    ? {
                        fontSize: 16,
                        backgroundColor: "rgb(255, 0, 0)",
                        ":hover": {
                          backgroundColor: " rgba(230, 0, 0, 0.7)",
                        },
                      }
                    : {
                        fontSize: 16,
                        backgroundColor: "rgb(63, 122, 127)",
                        ":hover": {
                          backgroundColor: " rgba(79, 145, 127, 0.7)",
                        },
                      }
                }
                onClick={() => filterOrdersByStatus(localStatus, allOrders)}
              >
                {localStatus}
              </Button>
            );
          })}
        </div>
        <select
          className="select-employee"
          onChange={(e) => filterOrdersByEmployee(e.target.value)}
        >
          <option value="" selected disabled hidden>
            Select employee...
          </option>
          {users.map((user) => {
            return <option>{getUserName(user)}</option>;
          })}
        </select>
      </div>

      <div className="orders">
        {orders.map((order) => {
          return (
            <div
              className={
                order.orderStatus === "ACTIVE"
                  ? "order-active"
                  : "order-inactive"
              }
            >
              <h2>Order {order.orderId}</h2>
              <p>Date: {order.date}</p>
              <p>Server: {order.server}</p>
              <p className="total">Total: {order.total}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersStatus;
