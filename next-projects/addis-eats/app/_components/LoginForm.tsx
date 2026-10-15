"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_store/auth";

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [inputName, setInputName] = useState("");
  const login = useAuth((s) => s.login);

  function handleLogin() {
    login(inputName.trim());
    router.push(next);
  }

  return (
    <div className="login">
      <input
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputName.trim() !== "") handleLogin();
        }}
        placeholder="Your name"
      />

      <button disabled={inputName.trim() === ""} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
