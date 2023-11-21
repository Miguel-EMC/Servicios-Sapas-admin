import React from "react";
import { Routes, Route } from "react-router";

import Ordenes from "./components/pages/Ordenes";

function App() {
  return (
    <div className="md:w-2/5 xl:w-4/5 p-6">
      <Routes>
        <Route path="/" element={<Ordenes />} />
      </Routes>
    </div>
  );
}

export default App;
