import React from "react";

export default function DataTable({ data }) {
  if (!data) return null;

  const headers = data[0];
  const rows = data.slice(1);

  return (
    <table>
      <thead>
        <tr>
          <th className="varname">Var Name</th>
          <th className="type separator">Type</th>
          <th className="insight separator">Insight</th>
          <th className="blankcount">Blank count</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={`${i}-${j}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
