const categories = ["All", "Main", "Drink"];

// function CategoryList({ category, setCategory }) {
//   return (
//     <div className="category">
//       {categories.map((c, i) => (
//         <button
//           className={category == c ? "selected" : ""}
//           // className={category == c && "selected"}
//           key={i}
//           onClick={() => setCategory(c)}
//         >
//           {c}
//         </button>
//       ))}
//     </div>
//   );
// }
import { useSearchParams } from "react-router-dom";

function CategoryList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";
  const categories = ["All", "Main", "Drink"];

  return (
    <div>
      {categories.map((c) => (
        <button
          className={category == c ? "selected" : ""}
          key={c}
          onClick={() => setSearchParams({ category: c })}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
