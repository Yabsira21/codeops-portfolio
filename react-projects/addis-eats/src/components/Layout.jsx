import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout({ name }) {
  return (
    <div className="main">
      <Header name={name} />
      <Outlet />
    </div>
  );
}

export default Layout;
