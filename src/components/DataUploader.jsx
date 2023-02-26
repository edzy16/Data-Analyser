import React, { useState } from "react";
import Papa from "papaparse";
import "./DataUploader.css";

function DataUploader() {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      const parsedData = Papa.parse(contents, { header: true }).data;
      setData(parsedData);
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <h1>Tx Analyzer</h1>
      <div className="row">
        <p className="instructionText1">Upload a file from your computer</p>
        <input className="uploaderButton" type="file" onChange={handleFileUpload} />
      </div>
      {data && (
        <div>
          <p>File uploaded successfully!</p>
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataUploader;
