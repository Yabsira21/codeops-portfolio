import { useState } from "react";
import Header from "./components/header";
import Menu from "./components/Menu";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";

function App() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(category);
  return (
    <div className="main-container">
      <div>
        <Header setSearchTerm={setSearchTerm} />
        <CategoryList category={category} setCategory={setCategory} />
        <Menu category={category} searchTerm={searchTerm} />
      </div>
      <Form />
    </div>
  );
}

export default App;
