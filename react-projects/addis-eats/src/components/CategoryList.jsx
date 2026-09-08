const categories = ["All", "Main", "Drink"];

function CategoryList({ category, setCategory }) {
  return (
    <div className="category">
      {categories.map((c, i) => (
        <button
          className={category == c ? "selected" : ""}
          // className={category == c && "selected"}
          key={i}
          onClick={() => setCategory(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
