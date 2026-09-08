import { useRef, useEffect } from "react";

function Header({ setSearchTerm }) {
  const restaurantName = "Addis Café";
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  function handleSubmit(e) {
    // e.prevent
    console.log("yesus");
    e.preventDefault();
    // console.log("hi");
    console.log(searchRef.current.value);
    setSearchTerm(searchRef.current.value);
  }

  return (
    <header>
      <h1>☕{restaurantName}</h1>
      <h2>Fresh Ethiopian Food & Coffees</h2>
      <form onSubmit={handleSubmit}>
        <input ref={searchRef} placeholder="search" />
      </form>
    </header>
  );
}

export default Header;
