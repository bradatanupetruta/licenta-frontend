import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import DonutChart from "./DonutChart";

function SalesReport() {
  const [productCategory, setProductCategory] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);

  const [options, setOption] = useState({
    chart: {
      id: "apexchart-sales",
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "sales-value",
      data: [],
    },
  ]);

  const allCategories = [
    "Burgers",
    "Salads",
    "Dessert",
    "Sides",
    "Main course",
    "Starters",
    "Soft drinks",
    "Wine",
    "Beer",
    "Cocktails",
  ];

  useEffect(() => {
    getSales();
    setProductCategory(allCategories);
  }, []);

  const getSales = () => {
    fetch("/order/sales")
      .then((response) => response.json())
      .then((data) => {
        let dates = [];
        let values = [];
        for (var i = 0; i < data.length; i++) {
          dates.push(data[i].orderDate);
          values.push(data[i].priceOrder);
        }

        const options = {
          chart: { id: "apexchart-sales" },
          xaxis: { categories: dates },
        };
        const series = [
          {
            name: "sales-value",
            data: values,
          },
        ];
        setOption(options);
        setSeries(series);
      });
  };

  const getSalesByCategory = (date) => {
    fetch("/order/category-sale/" + date)
      .then((response) => response.json())
      .then((data) => {
        let productCategory = [];
        let categoryValue = [];
        for (var i = 0; i < data.length; i++) {
          productCategory.push(data[i].category);
          categoryValue.push(data[i].categoryQuantity);
        }
        setProductCategory(productCategory);
        setCategoryValue(categoryValue);
      });
  };

  const onDateSelected = (date) => {
    getSalesByCategory(date);
  };

  return (
    <div className="sales-container">
      <div className="sales-graph-container">
        <h1 className="title">Sales report</h1>
        <h3>Sales evolution</h3>
        <Chart
          className="sales-graph"
          options={options}
          series={series}
          type="line"
          height={500}
        ></Chart>
      </div>

      <div className="sales-by-categories-container">
        <input
          className="select-date"
          type="date"
          onChange={(e) => onDateSelected(e.target.value)}
        ></input>
        <div className="sales-by-categories">
          <h3>Sales by category</h3>
          <DonutChart
            className="donut-chart"
            productCategory={productCategory}
            categoryValue={categoryValue}
          ></DonutChart>
        </div>
      </div>
    </div>
  );
}

export default SalesReport;
