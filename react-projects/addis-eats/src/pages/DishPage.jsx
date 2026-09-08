import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function DishPage() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/src/data/data.json");
      const dishes = await res.json();

      const foundDish = dishes.find((d) => d.id === Number(id));

      setDish(foundDish);
    }

    load();
  }, [id]);

  if (!dish) return <p>Loading...</p>;

  return (
    <div>
      <h1>{dish.name}</h1>
      {/* <p>ID: {dish.id}</p> */}
      <p>{dish.price} ETB</p>
    </div>
  );
}

export default DishPage;
