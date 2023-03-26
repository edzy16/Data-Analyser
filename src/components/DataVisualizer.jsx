import React, { useState } from "react";
import { Chart } from "react-google-charts";

const DataVisualizer = ({ data }) => {
  if (data.length === 0) return null;
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  const headers = data[0];
  const numericalHeaders = headers.filter((header) => {
    return data
      .slice(1)
      .every((row) => typeof row[headers.indexOf(header)] === "number");
  });

  const options = {
    title: "Numerical Data Scatter Plot",
    hAxis: { title: xAxis },
    vAxis: { title: yAxis },
    legend: "none",
  };

  const dataPoints = data.slice(1).map((row) => {
    return [row[headers.indexOf(xAxis)], row[headers.indexOf(yAxis)]];
  });

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="xAxis">Select X Axis</label>
            <select
              className="form-control"
              id="xAxis"
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
            >
              <option value="">Select X Axis</option>
              {numericalHeaders.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="yAxis">Select Y Axis</label>
            <select
              className="form-control"
              id="yAxis"
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
            >
              <option value="">Select Y Axis</option>
              {numericalHeaders.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {xAxis && yAxis && (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="ScatterChart"
          loader={<div>Loading Chart...</div>}
          data={[["x", "y"], ...dataPoints]}
          options={options}
          rootProps={{ "data-testid": "1" }}
        />
      )}
    </div>
  );
};

export default DataVisualizer;
