import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Layout from "./components/Layout";
import { useState } from "react";

function App() {
  // const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setSearchTerm={setSearchTerm} />}>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
