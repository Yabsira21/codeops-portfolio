import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Layout from "./components/Layout";
import { useState } from "react";
import NotFound from "./components/NotFound";
import Cart from "./pages/Cart";
import DishPage from "./pages/DishPage";
import Form from "./components/Form";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import ThankYou from "./components/ThankYou";

function App() {
  // const [category, setCategory] = useState("All");
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout name={name} cart={cart} />}>
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
          <Route
            path="/cart"
            element={<Cart cart={cart} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="menu/:id" element={<DishPage />} />
          <Route
            path="/form"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <Form />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setName={setName} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
