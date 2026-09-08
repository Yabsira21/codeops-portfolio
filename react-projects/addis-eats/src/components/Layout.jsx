import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout({ name, cart }) {
  return (
    <div className="main">
      <Header cart={cart} name={name} />
      <Outlet />
    </div>
  );
}

export default Layout;
