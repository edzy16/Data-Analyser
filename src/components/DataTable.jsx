import { useState } from "react";

const DataTable = ({ data }) => {
  if (data.length === 0) return null;
  console.log("data", data);
  const headers = data[0];
  const [newArray, setNewArray] = useState([]);
  const columns = data
    .slice(1)
    .map((datas, i) => data.slice(1).map((row) => row[i]));

  for (let i = 0; i <= headers.length; i++) {
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
        <tr key={index}>
          <td>{headers[index]}</td>
          <td>{obj.type}</td>
          <td>{obj.insight.min}</td>
          <td>{obj.insight.max}</td>
          <td>{obj.insight.avg}</td>
        </tr>
      );
    } else {
      return (
        <tr key={index}>
          <td>{headers[index]}</td>
          <td>{obj.type}</td>
          <td></td>
          <td></td>
          <td>{obj.insight.unique.join(", ")}</td>
        </tr>
      );
    }
  });

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Header</th>
          <th>Type</th>
          <th>Min</th>
          <th>Max</th>
          <th>Avg/Unique</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
};

export default DataTable;