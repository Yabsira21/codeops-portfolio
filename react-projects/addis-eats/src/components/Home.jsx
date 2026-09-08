import { useState } from "react";
// import Header from "../components/header";
// import Menu from "./components/Menu";
// import CategoryList from "./components/CategoryList";
import Header from "./Header";
import Menu from "./Menu";
import CategoryList from "./CategoryList";
// import Form from "./components/Form";
import Form from "./Form";
function Home() {
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

export default Home;
