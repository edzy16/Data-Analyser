import React from "react";

const DataItem = ({ data }) => {
  if (data.length === 0) return null;
  const headers = data[0];

  const columns = data.slice(1).map((datas, i) =>
    data.slice(1).map((row) => row[i])
  );
  for (let i = 0; i <= headers.length; i++) {
    if (columns[i].every((value) => typeof value === "number")) {
      // console.log("headers", headers[i]);
      // for (let j = 0; j <= columns.length; j++) {
      //   console.log("columns", columns[i]);
      // }
      console.log("columns", columns[i]);
      const min = Math.min(...columns[i]);
      const max = Math.max(...columns[i]);
      const avg = columns[i].reduce((a, b) => a + b, 0) / columns[i].length;
    }
  }

  return (
    <div className="data-item">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            {headers.map((headers, index) => {
              return <th key= {index} className="bg-info">{headers}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.slice(1, 6).map((row, index) => {
            return (
              <tr key= {index} className="bg-dark text-white">
                {row.map((cell, cellIndex) => {
                  return <td key= {cellIndex} className="bg-dark text-white">{cell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataItem;
