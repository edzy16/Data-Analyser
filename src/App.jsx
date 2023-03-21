import React, { useState } from "react";
import "./App.css";
import DataUploader from "./components/DataUploader";
import DataTable from "./components/DataTable";
// import * as XLSX from "xlsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// function parseData(data) {
//   const sheet = XLSX.utils.sheet_to_json(data.Sheets[data.SheetNames[0]]);
//   const headers = Object.keys(sheet[0]);
//   const histogramData = headers.map((header) => {
//     const values = sheet.map((row) => row[header]);
//     return { name: header, values };
//   });
//   const summaryData = headers.map((header) => {
//     const values = sheet.map((row) => row[header]);
//     const uniqueValues = [
//       ...new Set(values.filter((value) => value !== undefined)),
//     ];
//     const numUniqueValues = uniqueValues.length;
//     const numEmptyValues = values.filter((value) => value === undefined).length;
//     let summary;
//     if (typeof uniqueValues[0] === "string") {
//       summary = {
//         type: "categorical",
//         numCategories: numUniqueValues,
//         categories: uniqueValues,
//       };
//     } else {
//       const min = Math.min(...values.filter((value) => value !== undefined));
//       const max = Math.max(...values.filter((value) => value !== undefined));
//       const sum = values
//         .filter((value) => value !== undefined)
//         .reduce((a, b) => a + b, 0);
//       const avg = sum / (sheet.length - numEmptyValues);
//       summary = { type: "numerical", min, max, avg };
//     }
//     return { name: header, ...summary, numEmptyValues };
//   });
//   return { histogramData, summaryData };
// }

function App() {
  // const [data, setData] = useState([]);

  // const handleUpload = (data) => {
  //   setData(parseData(data));
  // };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataUploader />} />
        {/* <Route path="/table" element={<DataTable data={data} />} />
        <Route path="/visualizer" element={<DataVisualizer data={data} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
