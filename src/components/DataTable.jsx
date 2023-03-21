import React from "react";
import { useTable } from "react-table";
import { Bar } from "react-chartjs-2";

function DataTable({ data }) {
  const columns = React.useMemo(
    () =>
      data[0].map((col, index) => ({
        Header: col,
        accessor: index.toString(),
      })),
    [data]
  );

  const rows = React.useMemo(
    () =>
      data.slice(1).map((row) =>
        row.reduce(
          (acc, cell, index) => ({
            ...acc,
            [index]: cell,
          }),
          {}
        )
      ),
    [data]
  );

  const tableInstance = useTable({ columns, data: rows });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    tableRows,
    prepareRow,
  } = tableInstance;

  const histogramData = columns.map((column) => {
    const columnData = rows.map((row) =>
      parseFloat(row.values[column.accessor])
    );
    const nonNaNData = columnData.filter((value) => !isNaN(value));
    const histData = nonNaNData.reduce((acc, value) => {
      const binIndex = Math.floor(
        ((value - Math.min(...nonNaNData)) /
          (Math.max(...nonNaNData) - Math.min(...nonNaNData))) *
          10
      );
      acc[binIndex]++;
      return acc;
    }, Array(10).fill(0));
    return {
      label: column.Header,
      data: histData,
    };
  });

  const histogramOptions = {
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      <Bar data={{ datasets: histogramData }} options={histogramOptions} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {tableRows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
