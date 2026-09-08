import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout({ setSearchTerm }) {
  return (
    <div>
      <Header setSearchTerm={setSearchTerm} />
      <Outlet />
    </div>
  );
}

export default Layout;
