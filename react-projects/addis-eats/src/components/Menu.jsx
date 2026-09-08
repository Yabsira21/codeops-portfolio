import Dish from "../components/Dish";
import { useState, useEffect, useRef } from "react";

function Menu({ category, searchTerm, setSearchTerm, setCart, cart }) {
  // const [total, setTotal] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      searchRef.current?.focus();
    }
  }, [loading]);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(searchRef.current.value);
  }

  useEffect(() => {
    // const ctrl = new AbortController();
    async function load() {
      try {
        const res = await fetch("/src/data/data.json", {
          // signal: ctrl.signal,
        });
        console.log("yes");
        if (!res.ok) throw new Error("Could not load the menu");
        // console.log(await res.json());
        setDishes(await res.json());
      } catch (e) {
        setError(e.message);
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    load();
    // return () => ctrl.abort();
  }, [category]);

  const shown =
    category == "All" ? dishes : dishes.filter((d) => d.category === category);

  // const shownWithSearch = searchTerm == "" ? shown : shown.filter((d) => )
  const shownWithSearch =
    searchTerm === ""
      ? shown
      : shown.filter((d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

  if (loading) return <p>Loading the menu…</p>;
  if (error) return <p className="err">{error}</p>;
  if (dishes.length === 0) return <p>No dishes yet.</p>;

  return (
    <>
      {/* <p className="total">{total} ETB</p> */}
      <form className="search-form" onSubmit={handleSubmit}>
        <input ref={searchRef} placeholder="search" />
      </form>
      {/* <CategoryList setCategory={setCategory} /> */}
      <div className="menu">
        {shownWithSearch.map((d) => (
          <Dish
            key={d.id}
            name={d.name}
            price={d.price}
            spicy={d.spicy}
            cart={cart}
            setCart={setCart}
            // setTotal={setTotal}
            // total={total}
          />
        ))}
      </div>
    </>
  );
}

export default Menu;
