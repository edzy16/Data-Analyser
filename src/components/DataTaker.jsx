import Papa from "papaparse";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { DataTable } from "./DataTable";
import DataVisualizer from "./DataVisualizer";

const sampleData = `Var Name,Type,Insight,Blank count
  Var1,Categorical,Category count=5 A=23 B=33 C=13,5
  Var2,Numeric,Min=12 Max=65 Average=43,2
  Var3,Categorical,Category count=5 A=23 B=33 C=13,0
  Var4,Numeric,Min=12 Max=65 Average=43,0
  Var5,Categorical,Category count=5 A=23 B=33 C=13,0
  Var6,Numeric,Min=12 Max=65 Average=43,0
  Var7,Categorical,Category count=5 A=23 B=33 C=13,0
  Var8,Numeric,Min=12 Max=65 Average=43,0
  Var9, Categorical, Category count = 5 A = 23 B = 33 C = 13, 0`;

const rows = sampleData.split("\n").map((row) => row.split(","));

export default function DataTaker() {
  const [csvData, setCsvData] = useState(rows);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleCsvUpload = (csv) => {
    console.info("csvData ", csv);
    setCsvData(csv);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrorMessage("Please select a file");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const binaryData = e.target.result;
      const wb = XLSX.read(binaryData, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const csv = Papa.unparse(data);
      console.log;
      handleCsvUpload(csv);
    };
    if (file.name.endsWith(".csv")) {
      fileReader.readAsText(file);
    } else if (
      file.name.endsWith(".xls") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xlsm")
    ) {
      fileReader.readAsBinaryString(file);
    } else {
      setErrorMessage("Please select a CSV or Excel file");
    }
  };
  return (
    <div className="container">
      <h1>Tx Analyzer</h1>
      <div className="row">
        <div className="instructionText1">
          Please upload a CSV or Excel file:
        </div>
        <input
          className="uploaderButton"
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileUpload}
        />
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      {csvData ? <DataTable data={csvData} /> : null}
      {csvData ? <DataVisualizer data={csvData} /> : null}
    </div>
  );
}
