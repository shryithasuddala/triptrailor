import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Navbar() {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) setUser(storedUser);
  }, []);

  // LOGIN
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.text();
    alert(data);

    if (data.includes("Success")) {
      localStorage.setItem("loggedUser", email);
      setUser(email);
      setShow(false);
      navigate("/dashboard");
    }
  };

  // REGISTER
  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    alert(await res.text());
    setMode("login");
  };

  // RESET
  const handleReset = async () => {
    const res = await fetch("http://localhost:5000/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    alert(await res.text());
    setMode("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">

        <div className="nav-left">
          <img
            src="https://res.cloudinary.com/dtnmwdkou/image/upload/q_auto/f_auto/v1775106555/AI-LOGO_vrbpjx.jpg"
            className="logo-img"
            alt="logo"
          />
          <span className="logo-text">Travel Planner</span>
        </div>

        <ul className="nav-center">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>

          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about">About</Link>
          </li>

          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          {/* 🔥 NEW FEATURE ADDED */}
          <li className={location.pathname === "/trip-notes" ? "active" : ""}>
            <Link to="/trip-notes">Trip Notes</Link>
          </li>

          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <div className="nav-right">
          {user ? (
            <>
              <span className="user-text">{user}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-btn" onClick={() => setShow(true)}>
              Login
            </button>
          )}
        </div>

      </nav>

      {show && (
        <div className="popup">
          <div className="popup-content">

            {mode === "login" && (
              <>
                <h2>Login</h2>
                <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>

                <p onClick={()=>setMode("register")} className="link-text">
                  New user? Register
                </p>

                <p onClick={()=>setMode("reset")} className="link-text">
                  Forgot Password?
                </p>
              </>
            )}

            {mode === "register" && (
              <>
                <h2>Register</h2>
                <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={handleRegister}>Register</button>

                <p onClick={()=>setMode("login")} className="link-text">
                  Already have account? Login
                </p>
              </>
            )}

            {mode === "reset" && (
              <>
                <h2>Reset Password</h2>
                <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="New Password" onChange={(e)=>setNewPassword(e.target.value)} />
                <button onClick={handleReset}>Update</button>

                <p onClick={()=>setMode("login")} className="link-text">
                  Back to Login
                </p>
              </>
            )}

            <button onClick={()=>setShow(false)}>Close</button>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;