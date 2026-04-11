import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {

    if (!email || !password) {
      alert("Please enter email & password ❌");
      return;
    }

    if (localStorage.getItem(email)) {
      alert("User already exists ❌");
      return;
    }

    localStorage.setItem(email, JSON.stringify({ email, password }));

    alert("Registered Successfully ✅");

    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;