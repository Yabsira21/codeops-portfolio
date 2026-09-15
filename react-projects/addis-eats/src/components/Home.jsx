import { useState } from "react";
import Menu from "./Menu";
import CategoryList from "./CategoryList";
import { useCart } from "../store/store";

function Home({ searchTerm, setSearchTerm }) {
  const [category, setCategory] = useState("All");

  //   console.log(category);
  return (
    <>
      <div className="main-container">
        <div>
          <CategoryList category={category} setCategory={setCategory} />
          <Menu
            category={category}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        {/* <Form /> */}
      </div>
    </>
  );
}

export default Home;
