export default function Loading() {
  return (
    <div className="menu mt-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="dish skeleton-dish" key={i}>
          <div className="skeleton" style={{ width: "60%", height: 22 }} />
          <div className="skeleton" style={{ width: "45%", height: 18 }} />
          <div className="skeleton-buttons">
            <div className="skeleton" style={{ width: 40, height: 22 }} />
            <div className="skeleton" style={{ width: 85, height: 22 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
