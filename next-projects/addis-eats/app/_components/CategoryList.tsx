import Link from "next/link";
import { categories } from "../_lib/dishes";

export default function CategoryList({
  category,
  q,
}: {
  category: string;
  q: string;
}) {
  return (
    <div className="categories-container">
      {categories.map((c) => {
        const params = new URLSearchParams({ category: c });
        if (q) params.set("q", q);

        return (
          <Link
            key={c}
            href={`/menu?${params.toString()}`}
            className={category === c ? "selected" : ""}
          >
            {c}
          </Link>
        );
      })}
    </div>
  );
}
