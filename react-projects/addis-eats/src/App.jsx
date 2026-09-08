import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Layout from "./components/Layout";
import { useState } from "react";
import NotFound from "./components/NotFound";
import Cart from "./pages/Cart";
import DishPage from "./pages/DishPage";

function App() {
  // const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cart={cart} />}>
          <Route
            path="/"
            element={
              <Home
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setCart={setCart}
                cart={cart}
              />
            }
          />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="menu/:id" element={<DishPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
