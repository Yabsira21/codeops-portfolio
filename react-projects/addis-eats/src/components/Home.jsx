import { useState } from "react";
// import Header from "../components/header";
// import Menu from "./components/Menu";
// import CategoryList from "./components/CategoryList";
import Header from "./Header";
import Menu from "./Menu";
import CategoryList from "./CategoryList";
// import Form from "./components/Form";
import Form from "./Form";
function Home({ searchTerm }) {
  const [category, setCategory] = useState("All");

  console.log(category);
  return (
    <>
      {/* <Header setSearchTerm={setSearchTerm} /> */}
      <div className="main-container">
        <div>
          <CategoryList category={category} setCategory={setCategory} />
          <Menu category={category} searchTerm={searchTerm} />
        </div>
        <Form />
      </div>
    </>
  );
}

export default Home;
