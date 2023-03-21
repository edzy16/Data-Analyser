import React, { useState } from "react";
import * as XLSX from "xlsx";

function DataUploader(props) {
  const [file, setFile] = useState(null);

  const [fileName, setFileName] = useState(null);

  const acceptableFileNames = ["xlsx", "xls", "csv"];

  const checkFileName = (name) => {
    return acceptableFileNames.includes(
      name
        .split(".")
        .pop()
        .toLowerCase()
    );
  };

  const handleFileUpload = async (e) => {
    const myfile = e.target.files[0];
    if (!myfile) return;

    if (!checkFileName(myfile.name)) {
      alert("Invalid file type. Please upload a .csv, .xls, or .xlsx file.");
      return;
    }

    setFileName(myfile.name);
    const data = await myfile.arrayBuffer();
    const workbook = XLSX.readFile(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    console.log(jsonData.length);
    console.log(jsonData);
  };
  return (
    <div className="container">
      <h1>Tx Analyzer</h1>
      <div className="row">
        <label className="instructionText1">Please upload a file:</label>
        <input
          className="uploaderButton"
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={(e) => handleFileUpload(e)}
        />
      </div>
    </div>
  );
}
export default DataUploader;
