import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";

function BarsChart({options, series}) {
  return (
    <div className="ingredients-graph">
      <Chart series={series} options={options} type="bar" height={700}></Chart>
    </div>
  );
}

export default BarsChart;
