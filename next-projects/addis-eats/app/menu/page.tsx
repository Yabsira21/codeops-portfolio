import CategoryList from "../_components/CategoryList";
import Dish from "../_components/Dish";
import { categories, dishes } from "../_lib/dishes";

export default async function Menu({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category: rawCategory, q = "" } = await searchParams;

  const category = categories.find((c) => c === rawCategory) ?? "All";
  const term = q.trim().toLowerCase();

  const shown = dishes.filter(
    (d) =>
      (category === "All" || d.category === category) &&
      d.name.toLowerCase().includes(term),
  );

  return (
    <div className="main-container">
      <div>
        <CategoryList category={category} q={q} />

        <form className="search-form mt-2" action="/menu">
          <input name="q" defaultValue={q} placeholder="search" />
          {category !== "All" && (
            <input type="hidden" name="category" value={category} />
          )}
        </form>

        {shown.length === 0 ? (
          <p className="mt-2">No dishes.</p>
        ) : (
          <div className="menu">
            {shown.map((d) => (
              <Dish
                key={d.id}
                id={d.id}
                name={d.name}
                price={d.price}
                spicy={d.spicy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
