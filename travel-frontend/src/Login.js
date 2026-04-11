import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    if (!email || !password) {
      alert("Please enter email & password ❌");
      return;
    }

    try {
      const userData = localStorage.getItem(email);

      if (!userData) {
        alert("User not found ❌");
        return;
      }

      const user = JSON.parse(userData);

      if (user.password !== password) {
        alert("Wrong password ❌");
        return;
      }

      localStorage.setItem("loggedUser", email);

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>

      <p><Link to="/forgot">Forgot Password?</Link></p>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;