import React, { useState } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, Cell, Tooltip } from "recharts";
import { Chart, CategoryScale, LinearScale } from "chart.js/auto";
import "./DataAnalyzer.css";

Chart.register(CategoryScale, LinearScale);

function DataAnalyzer({ data }) {
  const numColumns = [];
  const catColumns = [];
  const stats = {};
  const columns = Object.keys(data[0]);
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#FF0000", "#0000FF"];

  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  // Loop through the first row to determine the column types
  columns.forEach((column) => {
    const isNumeric = data.every((row) => !isNaN(row[column]));
    if (isNumeric) {
      numColumns.push(column);
    } else {
      catColumns.push(column);
    }
  });

  // Calculate the statistics for numeric columns
  numColumns.forEach((column) => {
    const values = data
      .map((row) => Number(row[column]))
      .filter((value) => !isNaN(value));
    stats[column] = {
      mean: values.reduce((sum, value) => sum + value, 0) / values.length,
      max: Math.max(...values),
      min: Math.min(...values),
    };
  });

  // Calculate the statistics for categorical columns
  catColumns.forEach((column) => {
    const values = data
      .map((row) => row[column])
      .filter((value) => value !== "");
    const categories = [...new Set(values)];
    const counts = categories.map(
      (category) => values.filter((value) => value === category).length
    );
    stats[column] = {
      categories,
      counts,
    };
  });

  return (
  <div className="data-analysis-container">
    <div className="column-container">
      {numColumns.map((column) => (
        <div key={column} className="column-box">
          <div className="column-title">{column}</div>
          <div>Mean: {stats[column].mean}</div>
          <div>Max: {stats[column].max}</div>
          <div>Min: {stats[column].min}</div>
          <div className="data-points">
            {data.map((row, index) => (
              <div key={index}>{row[column]}</div>
            ))}
          </div>
        </div>
      ))}
      {catColumns.map((column) => (
        <div key={column} className="column-box">
          <div className="column-title">{column}</div>
          <ul className="category-list">
            {stats[column].categories.map((category, index) => (
              <li key={category}>
                {category}: {stats[column].counts[index]}
              </li>
            ))}
          </ul>
          <div className="data-points">
            {data.map((row, index) => (
              <div key={index}>{row[column]}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="chart-container">
      <div className="chart-header">
        <select
          className="chart-select"
          onChange={(e) => setXAxis(e.target.value)}
        >
          <option value="">Select X-axis</option>
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
        <select
          className="chart-select"
          onChange={(e) => setYAxis(e.target.value)}
        >
          <option value="">Select Y-axis</option>
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-body">
        {xAxis && yAxis && (
          <ScatterChart
            width={800}
            height={400}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis dataKey={xAxis} type="number" name={xAxis} />
            <YAxis dataKey={yAxis} type="number" name={yAxis} />
            <Scatter data={data}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Scatter>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          </ScatterChart>
        )}
      </div>
    </div>
  </div>
  );
}

export default DataAnalyzer;