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
import { lazy, Suspense } from "react";

function PageSkeleton() {
  return <p>Loading...</p>;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const userName = useAuth((s) => s.name);
  const isLoggedin = useAuth((s) => s.isLoggedIn);
  const Form = lazy(() => import("./pages/Form"));
  const ThankYou = lazy(() => import("./pages/ThankYou"));

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
          <Suspense fallback={<PageSkeleton />}>
            <Route
              path="/form"
              element={
                <RequireAuth isLoggedIn={isLoggedin}>
                  <Form />
                </RequireAuth>
              }
            />
          </Suspense>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
