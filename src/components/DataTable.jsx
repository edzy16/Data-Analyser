import React from "react";

export default function DataTable({ data }) {
  if (!data) return null;


  return (
    <table>
      {/* <thead>
        <tr>
          <th className="varname">Var Name</th>
          <th className="type separator">Type</th>
          <th className="insight separator">Insight</th>
          <th className="blankcount">Blank count</th>
        </tr>
      </thead> */}
      <tbody>
        {data.map((row, i) => (
          <td key={i}>
            {row.map((cell, j) => (
              <tr key={`${i}-${j}`}>{cell}</tr>
            ))}
          </td>
        ))}
      </tbody>
    </table>
  );
}
