import React, { useState } from "react";
import * as XLSX from "xlsx";
import Chart from "chart.js/auto";

const DataAnalyzer = () => {
  const [numericalColumn, setNumericalColumn] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const numericalColumns = Object.keys(json[0]).filter(
        (column) => !isNaN(json[0][column])
      );
      if (numericalColumns.length === 1) {
        const numericalColumn = numericalColumns[0];
        setNumericalColumn(numericalColumn);

        const values = json.map((row) => row[numericalColumn]);
        const ctx = document.getElementById("scatterplot").getContext("2d");
        new Chart(ctx, {
          type: "scatter",
          data: {
            datasets: [
              {
                label: numericalColumn,
                data: values.map((value) => ({ x: value, y: 0 })),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                title: {
                  display: true,
                  text: numericalColumn,
                },
              },
              y: {
                type: "linear",
                position: "left",
              },
            },
          },
        });
      } else {
        // Handle multiple numerical columns or no numerical columns
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {numericalColumn && (
        <div>
          <h2>Numerical Column: {numericalColumn}</h2>
          <canvas id="scatterplot" />
        </div>
      )}
    </div>
  );
};

export default DataAnalyzer;
