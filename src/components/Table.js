import React, { useEffect } from "react";
import { useState } from "react";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import "./stylesComponents/Table.css";
import { useNavigate } from "react-router-dom";

function Table({ tableSelectedIndex, onSelectTable }) {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetch("tab/all")
      .then((response) => response.json())
      .then((data) => setTables(data));
  }, []);

  return (
    <div>
      <div className="tables-array">
        {tables.map((table) => {
          return (
            <div
              key={table.tabindex}
              className={
                table.status === "BUSY" ? "busy-table" : "table-container"
              }
              onClick={() => {
                onSelectTable(table.tabindex);
                navigate("/order", { state: { tabindex: table.tabindex } });
              }}
            >
              <h3>Table {table.tabindex}</h3>
              <TableRestaurantIcon fontSize="large"></TableRestaurantIcon>
              <p>Status: {table.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
