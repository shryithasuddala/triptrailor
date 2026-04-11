import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contact,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert("Registration Successful!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🌍 Travel Planner</h1>
        <h2>Register</h2>

        <input placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Contact Number" onChange={(e) => setContact(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={signup}>Register</button>

        <p className="login-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;