import React, { useState } from "react";
import "./App.css";

function Forgot() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    const user = JSON.parse(localStorage.getItem(email));

    if (user) {
      alert("Your password is: " + user.password);
    } else {
      alert("User not found ❌");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleReset}>Get Password</button>
    </div>
  );
}

export default Forgot;