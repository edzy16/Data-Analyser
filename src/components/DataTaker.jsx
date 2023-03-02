import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import DataTable from "./DataTable";

export default function DataTaker() {
  const [csvData, setCsvData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleCsvUpload = (csv) => {
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
      {csvData && <DataTable csvData={csvData} />}
    </div>
  );
}
