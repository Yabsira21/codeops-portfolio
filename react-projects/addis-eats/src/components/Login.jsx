import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn, setName }) {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");

  function handleLogin() {
    setName(inputName);
    setIsLoggedIn(true);
    navigate("/");
  }

  return (
    <div className="login">
      <input
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Your name"
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
