import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

function Login() {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");
  const login = useAuth((s) => s.login);

  function handleLogin() {
    // setName(inputName);
    // setIsLoggedIn(true);
    console.log("hi");
    login(inputName);
    navigate("/");
  }

  return (
    <div className="login">
      <input
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Your name"
      />

      <button
        // disabled={() => {
        //   inputName == "";
        // }}
        disabled={inputName === ""}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
