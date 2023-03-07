import React, { useState } from "react";

export const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {data.map((row, i) => {
        console.log("i :", i);
        console.log("row :", row);
        if (i === 0) {
          return (
            <div key={i}>
              {row.map((cell, j) => {
                return (
                  <div
                    key={i + j}
                    style={{
                      border: "1px solid transparent",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "lighter",
                        textAlign: "center",
                      }}
                    >
                      {cell}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        }
        return (
          <div key={i}>
            {row.map((cell, j) => {
              console.log("j :", j);
              // console.log('Cell', cell);
              return (
                <div
                  key={i + j}
                  style={{
                    border: "1px solid black",
                    background:
                      j === 0 ? "blue" : j === 1 ? "orange" : "transparent",
                  }}
                >
                  <p
                    style={{
                      fontWeight: j === 0 ? "bold" : "lighter",
                      textAlign: "center",
                    }}
                  >
                    {cell}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
