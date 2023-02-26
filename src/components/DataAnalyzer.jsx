import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale } from "chart.js/auto";
import "./DataAnalyzer.css"

Chart.register(CategoryScale, LinearScale);

function DataAnalyzer({ data }) {
  const numColumns = [];
  const catColumns = [];
  const stats = {};

  // Loop through the first row to determine the column types
  Object.keys(data[0]).forEach((column) => {
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
    <div>
      {numColumns.map((column) => (
        <div key={column}>
          <p>{column}</p>
          <p>Mean: {stats[column].mean}</p>
          <p>Max: {stats[column].max}</p>
          <p>Min: {stats[column].min}</p>
          <Bar
            data={{
              labels: data.map((row) => row[column]),
              datasets: [
                {
                  label: column,
                  data: data.map((row) => row[column]),
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      ))}
      {catColumns.map((column) => (
        <div key={column}>
          <p>{column}</p>
          <ul>
            {stats[column].categories.map((category, index) => (
              <li key={category}>
                {category}: {stats[column].counts[index]}
              </li>
            ))}
          </ul>
          <Line
            data={{
              labels: stats[column].categories,
              datasets: [
                {
                  label: column,
                  data: stats[column].counts,
                  fill: false,
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default DataAnalyzer;
