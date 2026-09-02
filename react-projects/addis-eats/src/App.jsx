import { useState } from "react";
import Header from "./components/header";
import Menu from "./components/Menu";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";

function App() {
  const [category, setCategory] = useState("All");
  console.log(category);
  return (
    <div className="main-container">
      <div>
        <Header />
        <CategoryList category={category} setCategory={setCategory} />
        <Menu category={category} />
      </div>
      <Form />
    </div>
  );
}

export default App;
