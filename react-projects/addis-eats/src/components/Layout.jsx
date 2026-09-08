import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout({ cart }) {
  return (
    <div className="main">
      <Header cart={cart} />
      <Outlet />
    </div>
  );
}

export default Layout;
