import { useState } from "react";
import { Link } from "react-router-dom";
function Form() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const valid = /^(?:\+251|0)9\d{8}$/.test(phone);

  return (
    <div className="form-container">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <input
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Your Area"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Your Phone"
        className={!valid && "red"}
      />
      {phone && !valid && <p className="err">Use 09… or +2519…</p>}
      <Link to="/thank-you">
        <button disabled={!valid}>Pay with TeleBirr</button>
      </Link>
    </div>
  );
}

export default Form;
