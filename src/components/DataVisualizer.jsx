import React, { useState } from "react";

function DataVisualizer({ data }) {
  const [xVar, setXVar] = useState("");
  const [yVar, setYVar] = useState("");

  // extract variable names from the sample data
  const header = data[0];
  const variableNames = header.map((name) => name.trim());

  // create dropdown options
  const options = variableNames.map((name, index) => (
    <option key={index} value={name}>
      {name}
    </option>
  ));

  // handle dropdown changes
  const handleXChange = (event) => {
    const varName = event.target.value;
    if (varName !== yVar) {
      setXVar(varName);
    }
  };

  const handleYChange = (event) => {
    const varName = event.target.value;
    if (varName !== xVar) {
      setYVar(varName);
    }
  };

  return (
    <div>
      <h2>Data Visualizer</h2>
      <div>
        <label htmlFor="x-axis">X-Axis: </label>
        <select id="x-axis" value={xVar} onChange={handleXChange}>
          <option value="">Select Variable</option>
          {options}
        </select>
      </div>
      <div>
        <label htmlFor="y-axis">Y-Axis: </label>
        <select id="y-axis" value={yVar} onChange={handleYChange}>
          <option value="">Select Variable</option>
          {options}
        </select>
      </div>
    </div>
  );
}

export default DataVisualizer;
