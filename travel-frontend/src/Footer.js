import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer">

      <div className="footer-container">

        <div className="footer-col">
          <h3>Quick Contact</h3>
          <p>India</p>
          <p>+91 9876543210</p>
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/about")}>About</p>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <p>Email</p>
          <p>Support</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Travel Planner
      </div>

    </div>
  );
}

export default Footer;