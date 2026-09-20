import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Layout from "./components/Layout";
import { useState } from "react";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import DishPage from "./components/DishPage";
import Form from "./components/Form";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import ThankYou from "./components/ThankYou";
import { useAuth } from "./store/auth";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const userName = useAuth((s) => s.name);
  const isLoggedin = useAuth((s) => s.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/menu" replace />} />

          <Route
            index
            path="/menu"
            element={
              <ErrorBoundary>
                <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </ErrorBoundary>
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
