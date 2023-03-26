import React, { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "./DataTable.jsx";
import DataItem from "./DataItem.jsx";
import DataPlotter from "./DataPlotter.jsx";

const DataUploader = (props) => {
  const [fileName, setFileName] = useState(null);
  const [xlsxData, setXlsxData] = useState([]);

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
      blankrows:"",
      header: 1,
      defval: "",
    });
    setXlsxData(jsonData);
  };


  return (
    <div className="container">
      <h1 className="text-danger text-center">Tx Analyzer</h1>
      <div className="hfcc">
        <label className="instructionText1">Please upload a file :</label>
        {fileName && <p className="text-success" style={{ paddingLeft:'1rem' }}>{fileName}</p>}
        <input
          className="uploaderButton"
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={(e) => handleFileUpload(e)}
        />
      </div>
      <DataTable data={xlsxData} />
      {/* <DataItem data={xlsxData} />
      <DataPlotter data={xlsxData} /> */}
    </div>
  );
};
export default DataUploader;
