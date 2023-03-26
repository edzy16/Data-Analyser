import React from 'react'

const DataPlotter = ({data}) => {
  if (data.length === 0) return null;
  const headers = data[0];
  
  const columns = data
    .slice(1)
    .map((datas, i) => data.slice(1).map((row) => row[0]));
  
  for (let i = 0; i <= headers.length; i++) {
    if (columns[i].every((value) => typeof value === "number")) {
      const min = Math.min(...columns[i]);
      const max = Math.max(...columns[i]);
      const avg = columns[i].reduce((a, b) => a + b, 0) / columns[i].length;
      // console.log(min, max, avg);
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default DataPlotter
