function MenuItem(props) {
  console.log(props);
  return (
    <div className="card">
      <div className="img-container">
        <img src={props.img} alt="" />
      </div>
      <div className="card-content">
        <h3>{props.name}</h3>
        <p>{props.price} ETB</p>
        <p>{props.desc}</p>
        <p>{props.category}</p>
      </div>
    </div>
  );
}

export default MenuItem;
