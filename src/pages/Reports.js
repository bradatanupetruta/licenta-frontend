import React from "react";
import { useEvaluationToNavigation } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import "./styles/Reports.css";
import SalesReport from "../components/SalesReport";
import IngredientsReport from "../components/IngredientsReport";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Reports() {
  useEvaluationToNavigation();
  const navigate = useNavigate();
  return (
    <div className="reports-page">
      <ArrowBackIcon
        className="go-back-reports"
        fontSize="large"
        onClick={() => navigate("/home")}
      ></ArrowBackIcon>
      <SalesReport></SalesReport>
      <IngredientsReport></IngredientsReport>

      <div className="orders-graph"></div>
    </div>
  );
}

export default Reports;
