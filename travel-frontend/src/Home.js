import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";

function Home() {
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      <Navbar />

      {/* HERO */}
      <div className="hero">
        <img src={images[currentImage]} className="hero-img" />

        <div className="hero-text">
          <h1>Trip Tailor Pvt.Ltd</h1>
          <p>Your Travel Guide</p>
        </div>
      </div>

      {/* SERVICES */}
      <section className="services-section">
        <h2>Our Services</h2>

       <div className="services">

  <div className="service-card">
    <img src="https://cdn-icons-png.flaticon.com/512/4149/4149675.png" alt="AI Trip Planning"/>
    <p>AI Trip Planning</p>
  </div>

  <div className="service-card">
    <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Multiple Plans"/>
    <p>Multiple Travel Plans</p>
  </div>

  <div className="service-card">
    <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Itinerary"/>
    <p>Day-wise Itinerary</p>
  </div>

  <div className="service-card">
    <img src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png" alt="Budget"/>
    <p>Budget Estimation</p>
  </div>

  <div className="service-card">
    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Save Trips"/>
    <p>Save & Manage Trips</p>
  </div>

</div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>Trip Tailor Pvt.Ltd</h3>
        <p>📍 Hyderabad, India</p>
        <p>📞 90597xxxxx</p>
        <p>✉️ info@triptailor.com</p>
      </footer>

    </div>
  );
}

export default Home;