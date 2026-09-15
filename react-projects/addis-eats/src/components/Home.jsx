import { useState } from "react";
import Menu from "./Menu";
import CategoryList from "./CategoryList";
import { useCart } from "../store/cart";
import ErrorBoundary from "./ErrorBoundary";

function Home({ searchTerm, setSearchTerm }) {
  const [category, setCategory] = useState("All");

  return (
    <>
      <div className="main-container">
        <div>
          <CategoryList category={category} setCategory={setCategory} />
          <ErrorBoundary>
            <Menu
              category={category}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </ErrorBoundary>
        </div>
        {/* <Form /> */}
      </div>
    </>
  );
}

export default Home;
