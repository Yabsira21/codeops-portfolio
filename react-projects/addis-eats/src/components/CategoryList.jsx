function CategoryList({ setCategory }) {
  return (
    <div className="category">
      <button onClick={() => setCategory("all")}>All</button>
      <button onClick={() => setCategory("spicy")}>Spicy</button>
      <button onClick={() => setCategory("drink")}>Drink</button>
      <button onClick={() => setCategory("expensive")}>Expensive</button>
      <button onClick={() => setCategory("cheap")}>Cheap</button>
    </div>
  );
}

export default CategoryList;
