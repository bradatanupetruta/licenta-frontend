import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./stylesComponents/Receipt.css";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { getValueForKey } from "../util/useLocalStorage";
import ReactToPrint from "react-to-print";

function Receipt({ items, tabindex, orderId }) {
  const navigate = useNavigate();

  const [index, setIndex] = useState();

  const componentRef = useRef();
  let total = items.reduce(
    (amount, item) => amount + parseFloat(item.price) * parseInt(item.quantity),
    0
  );

  const server = getValueForKey("user");

  const saveOrder = () => {
    const order = {
      tabIndex: tabindex,
      userId: server.id,
      status: "ACTIVE",
      products: items,
    };
    if (!!orderId) {
      order.orderId = orderId;
    }

    fetch("/order/save", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => updateBusyTab());
  };

  const payHandler = () => {
    const order = {
      orderId: orderId,
      status: "INACTIVE",
    };

    fetch("/order/close", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => updateVacantTab());
  };

  const updateBusyTab = () => {
    fetch("/tab/busy", {
      method: "POST",
      body: JSON.stringify(tabindex),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => navigate("/home"));
  };

  const updateVacantTab = () => {
    fetch("/tab/vacant", {
      method: "POST",
      body: JSON.stringify(tabindex),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => navigate("/home"));
  };

  const removeItem = (index) => {
    items.splice(index, 1);
    setIndex(index);
  };

  const getServerName = () => {
    if(!server) {
      return "";
    }
    return server.lastName + " " + server.firstName;
  };

  return (
    <div className="receipt-container">
      <div className="to-print" ref={componentRef}>
        <div className="order-info">
          <p className={orderId !== undefined ? "show-order" : "dont-show"}>
            Order {orderId}
          </p>
          <p>Table: {tabindex}</p>
          <p>Server: {getServerName()}</p>
        </div>

        <div className="receipt-items">
          <table>
            <thread>
              <tr className="receipt-header">
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="remove-column-title">Remove</th>
              </tr>
            </thread>
            <tbody className="receipt-content">
              {items.map((menuItem, index) => {
                return (
                  <tr className="receipt-elements" key="id">
                    <td>{menuItem.name}</td>
                    <td>{menuItem.quantity}</td>
                    <td>{menuItem.price}</td>
                    <DeleteIcon
                      className="remove-column-icon"
                      onClick={() => removeItem(index)}
                    ></DeleteIcon>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="receipt-total">{total.toFixed(2)} RON</div>
      </div>

      <div className="receipt-actions">
        <SendIcon
          className="send-button"
          sx={{
            color: "black",
            background: "rgb(255, 255, 255)",
            fontSize: 36,
            padding: 1.5,
            borderRadius: 2,
          }}
          onClick={saveOrder}
        ></SendIcon>

        <ReactToPrint
          trigger={() => (
            <AttachMoneyIcon
              className="pay-button"
              sx={{
                color: "black",
                background: "rgb(255, 255, 255)",
                fontSize: 36,
                padding: 1.5,
                borderRadius: 2,
              }}
            ></AttachMoneyIcon>
          )}
          content={() => componentRef.current}
          onAfterPrint={payHandler}
        ></ReactToPrint>
      </div>
    </div>
  );
}

export default Receipt;
