import React from "react";
import Chart from "react-apexcharts";

function DonutChart({ productCategory, categoryValue }) {
  return (
    <div className="donut-chart">
      <Chart
        type="donut"
        width={660}
        height={660}
        series={[...categoryValue]}
        options={{
          labels: [...productCategory],
        }}
      ></Chart>
    </div>
  );
}

export default DonutChart;
