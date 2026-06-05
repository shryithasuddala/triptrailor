// Design a modern, responsive homepage for an AI travel planner called "Trip Tailor".

// Include:
// - Hero section with travel background image
// - Title: "Plan Your Perfect Trip with AI"
// - Subtitle: "Personalized travel plans based on your preferences"
// - Buttons: "Start Planning", "Explore Destinations"
// - Navigation bar: Home, Plan Trip, My Trips, Profile, Settings
// - Dark/Light mode toggle (slider style)

// Style:
// - Clean UI with vibrant gradient colors
// - Smooth animations and hover effects
// - Fully mobile responsive


import React from "react";
import "./App.css";
import Navbar from "./Navbar";

function About() {
  return (
    <div>

      <Navbar />

      {/* HERO */}
      <div className="about-hero">
        <div className="about-overlay">
          <h1 className="fade-in">About Us</h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="about-content fade-in">
        <h2>Trip Tailor Pvt.Ltd.</h2>

        <p>
          We provide smart travel planning solutions based on your budget,
          preferences, and time. Our mission is to make travel easy,
          affordable, and unforgettable.
        </p>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <div className="stat-box">
          <h3>500+</h3>
          <p>Happy Customers</p>
        </div>

        <div className="stat-box">
          <h3>200+</h3>
          <p>Trips Planned</p>
        </div>

        <div className="stat-box">
          <h3>50+</h3>
          <p>Destinations</p>
        </div>
      </div>

      {/* TEAM */}
<div className="team-section">
  <h2>Our Team</h2>

  <div className="team-container">
    <div className="team-card">
      <img src="https://res.cloudinary.com/dtnmwdkou/image/upload/q_auto/f_auto/v1732447816/achi_lqaazq.jpg" alt="Vaishnavi Achi" />
      <h4>Vaishnavi Achi </h4>
      <p>Founder</p>
    </div>

    <div className="team-card">
      <img src="https://res.cloudinary.com/dtnmwdkou/image/upload/q_auto/f_auto/v1732447975/pandu_jxr8tv.jpg" alt="Shryitha Suddala" />
      <h4>Shryitha Suddala</h4>
      <p>Co-Founder</p>
    </div>

    <div className="team-card">
      <img src="https://res.cloudinary.com/dtnmwdkou/image/upload/q_auto/f_auto/v1775374287/kavs_ay8qt2.jpg" alt="Mendu Kavyasri" />
      <h4>Mendu Kavyasri</h4>
      <p>Planner</p>
    </div>

    {/* 🔥 NEW MEMBER */}
    <div className="team-card">
      <img src="https://res.cloudinary.com/dtnmwdkou/image/upload/q_auto/f_auto/v1775291733/varshitha_cgmidb.jpg" alt="Darmini Varshitha" />
      <h4>Darmini varshitha</h4>
      <p>Travel Expert</p>
    </div>
  </div>
</div>

    </div>
  );
}

export default About;