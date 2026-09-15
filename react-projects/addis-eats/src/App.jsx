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
import { useAuth } from "./store/auth";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const userName = useAuth((s) => s.name);
  const isLoggedin = useAuth((s) => s.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="menu/:id" element={<DishPage />} />
          <Route
            path="/form"
            element={
              <RequireAuth isLoggedIn={isLoggedin}>
                <Form />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
