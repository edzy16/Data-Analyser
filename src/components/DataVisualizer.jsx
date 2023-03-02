import React, { useState } from "react";

export default function DataVisualizer({ data }) {
  const headers = data[0];

  const [xAxis, setXAxis] = useState(headers[0]);
  const [yAxis, setYAxis] = useState(headers[1]);

  const handleXAxisChange = (e) => {
    const selectedXAxis = e.target.value;
    if (selectedXAxis !== yAxis) {
      setXAxis(selectedXAxis);
    }
  };

  const handleYAxisChange = (e) => {
    const selectedYAxis = e.target.value;
    if (selectedYAxis !== xAxis) {
      setYAxis(selectedYAxis);
    }
  };

  return (
    <div>
      <p>Two Dimensional Analysis</p>
      <label htmlFor="x-axis-dropdown">X Axis:</label>
      <select id="x-axis-dropdown" value={xAxis} onChange={handleXAxisChange}>
        {headers.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>

      <label htmlFor="y-axis-dropdown">Y Axis:</label>
      <select id="y-axis-dropdown" value={yAxis} onChange={handleYAxisChange}>
        {headers.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>

      <div>Graph will be rendered here</div>
    </div>
  );
}
