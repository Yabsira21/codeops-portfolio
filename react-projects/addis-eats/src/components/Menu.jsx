import Dish from "../components/Dish";
import { useState, useEffect } from "react";

function Menu({ category }) {
  const [total, setTotal] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) return <p>Loading the menu…</p>;
  if (error) return <p className="err">{error}</p>;
  if (dishes.length === 0) return <p>No dishes yet.</p>;

  return (
    <>
      <p className="total">{total} ETB</p>
      {/* <CategoryList setCategory={setCategory} /> */}
      <div className="menu">
        {shown.map((d) => (
          <Dish
            key={d.id}
            name={d.name}
            price={d.price}
            spicy={d.spicy}
            setTotal={setTotal}
            total={total}
          />
        ))}
      </div>
    </>
  );
}

export default Menu;

// <MenuItem
//   key={d.id}
//   name={d.name}
//   price={d.price}
//   desc={d.description}
//   category={d.category}
//   img={d.img}
//   spicy={d.spicy}
// />
