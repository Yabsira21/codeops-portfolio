import Dish from "../components/Dish";
import { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useSearchParams } from "react-router-dom";

function Menu({ searchTerm, setSearchTerm }) {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";
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

        // console.log("yes");
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
    // setTimeout(() => {
    //   load();
    // }, 3000);
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

  // if (loading) return <p>Loading the menu…</p>;
  if (loading)
    return (
      <div className="menu mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="dish skeleton-dish" key={i}>
            <Skeleton
              width="60%"
              height={22}
              baseColor="#2e303a"
              highlightColor="#3b3d48"
            />

            <Skeleton
              width="45%"
              height={18}
              baseColor="#2e303a"
              highlightColor="#3b3d48"
            />

            <div className="skeleton-buttons">
              <Skeleton
                width={40}
                height={22}
                baseColor="#2e303a"
                highlightColor="#3b3d48"
              />

              <Skeleton
                width={85}
                height={22}
                baseColor="#2e303a"
                highlightColor="#3b3d48"
              />
            </div>
          </div>
        ))}
      </div>
    );
  if (error) return <p className="err mt-2">Something went wrong!</p>;
  if (dishes.length === 0) return <p className="mt-2">No dishes.</p>;

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input ref={searchRef} placeholder="search" />
      </form>

      <div className="menu">
        {shownWithSearch.map((d) => (
          <Dish
            key={d.id}
            id={d.id}
            name={d.name}
            price={d.price}
            spicy={d.spicy}
            // cart={cart}
            // setCart={setCart}
            // setTotal={setTotal}
            // total={total}
          />
        ))}
      </div>
    </>
  );
}

export default Menu;
