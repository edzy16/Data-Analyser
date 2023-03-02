import React from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import DataTaker from "./components/DataTaker";
import DataVisualizer from "./components/DataVisualizer";


function App() {
  const sampleData = `Var Name,Type,Insight,Blank count
  Var1,Categorical,Category count=5 A=23 B=33 C=13,5
  Var2,Numeric,Min=12 Max=65 Average=43,2
  Var3,Categorical,Category count=5 A=23 B=33 C=13,0
  Var4,Numeric,Min=12 Max=65 Average=43,0
  Var5,Categorical,Category count=5 A=23 B=33 C=13,0
  Var6,Numeric,Min=12 Max=65 Average=43,0
  Var7,Categorical,Category count=5 A=23 B=33 C=13,0
  Var8,Numeric,Min=12 Max=65 Average=43,0
  Var9, Categorical, Category count = 5 A = 23 B = 33 C = 13, 0`;

  const rows = sampleData.split("\n").map((row) => row.split(","));
  console.log(rows);

  return (
    <div className="app">
      <DataTaker />
      <DataTable data={rows} />
      <DataVisualizer data={rows} />
    </div>
  );
}

export default App;
