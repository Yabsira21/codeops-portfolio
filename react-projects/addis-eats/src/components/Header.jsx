import { useRef, useEffect } from "react";

function Header() {
  const restaurantName = "Addis Café";
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <header>
      <h1>☕{restaurantName}</h1>
      <h2>Fresh Ethiopian Food & Coffees</h2>
      <form>
        <input ref={searchRef} placeholder="search" />
      </form>
    </header>
  );
}

export default Header;
