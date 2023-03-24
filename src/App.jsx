import React, { useState } from "react";
import "./App.css";
import DataUploader from "./components/DataUploader";
import DataTable from "./components/DataTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataUploader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
