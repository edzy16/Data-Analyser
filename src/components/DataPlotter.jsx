import React, { useState } from "react";
import { Chart } from "react-google-charts";

const DataPlotter = ({ data }) => {
  if (data.length === 0) return null;
  const [xHeader, setXHeader] = useState("");
  const [yHeader, setYHeader] = useState("");

  const numericalHeaders = data[0].filter((header) => {
    const column = data.slice(1).map((row) => row[data[0].indexOf(header)]);
    return column.every((value) => typeof value === "number");
  });

  const chartData = [
    ["Header", "Min", "Max", "Avg"],
    ...numericalHeaders.map((header) => {
      const column = data.slice(1).map((row) => row[data[0].indexOf(header)]);
      const min = Math.min(...column);
      const max = Math.max(...column);
      const avg = column.reduce((a, b) => a + b, 0) / column.length;
      return [header, min, max, avg];
    }),
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6">
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="x-axis-select"
              value={xHeader}
              onChange={(event) => setXHeader(event.target.value)}
            >
              <option value="">Select X Axis</option>
              {numericalHeaders.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
            <label htmlFor="x-axis-select">X Axis:</label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="y-axis-select"
              value={yHeader}
              onChange={(event) => setYHeader(event.target.value)}
            >
              <option value="">Select Y Axis</option>
              {numericalHeaders.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
            <label htmlFor="y-axis-select">Y Axis:</label>
          </div>
        </div>
      </div>

      {xHeader && yHeader && (
        <Chart
          width={"100%"}
          height={300}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            title: "Numerical Data Scatter Plot",
            hAxis: { title: xHeader },
            vAxis: { title: yHeader },
            legend: "none",
          }}
          rootProps={{ "data-testid": "1" }}
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 1) {
                  const [selectedItem] = selection;
                  const { row } = selectedItem;
                  const header = chartData[row + 1][0];
                  setXHeader(header);
                }
              },
            },
          ]}
        />
      )}
    </div>
  );
};

export default DataPlotter;
