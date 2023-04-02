import React, { useState } from 'react';
const DataItem = ({ data }) => {
  if (data.length === 0) return null;
  console.log("data", data);
  const headers = data[0];
  const [newArray, setNewArray] = useState([]);

  const columns = data
    .slice(1)
    .map((datas, i) => data.slice(1).map((row) => row[i]));

  for (let i = 0; i < headers.length; i++) {
    // Fixed off-by-one error in loop condition
    if (columns[i].every((value) => typeof value === "number")) {
      const min = Math.min(...columns[i]);
      const max = Math.max(...columns[i]);
      const avg = columns[i].reduce((a, b) => a + b, 0) / columns[i].length;
      const newObj = {
        type: "numerical",
        insight: {
          max: max,
          min: min,
          avg: avg,
        },
      };
      console.log("newObjNum", newObj);
      newArray.push(newObj);
    } else {
      const categoryCount = {};
      columns[i].forEach((category) => {
        if (categoryCount[category]) {
          categoryCount[category]++;
        } else {
          categoryCount[category] = 1;
        }
      });
      const newObj = {
        type: "categorical",
        insight: {
          unique: [...new Set(columns[i])],
        },
      };
      console.log("newObjCat", newObj);
      newArray.push(newObj);
    }
  }

  const tableData = newArray.map((obj, index) => {
    if (obj.type === "numerical") {
      return (
        <tr key={index} className="bg-dark text-white">
          <td>{obj.type}</td>
          <td>
            {obj.insight.unique.join(", ")}
          </td>
        </tr>
      );
    }
  });

  return (
    <div className="data-item">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {headers.map((header, index) => {
              return (
                <th key={index} className="bg-info">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default DataItem;
