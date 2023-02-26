import React from "react";
import DataUploader from "./components/DataUploader";
import "./App.css";
import DataAnalyzer from "./components/DataAnalyzer";

function App() {
  const data = [
    {
      Var1: "A",
      Var2: 23,
      Var3: "B",
      Var4: 56,
      Var5: "C",
      Var6: 34,
      Var7: "B",
      Var8: 65,
      Var9: "A",
    },
    {
      Var1: "B",
      Var2: 45,
      Var3: "A",
      Var4: 12,
      Var5: "C",
      Var6: 21,
      Var7: "C",
      Var8: 34,
      Var9: "B",
    },
    // add more rows as needed
  ];
  return (
    <div className="app">
      <DataUploader />
      <DataAnalyzer data={data} />
    </div>
  );
}

export default App;
