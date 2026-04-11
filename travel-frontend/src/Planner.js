import React, { useState } from "react";
import "./App.css";

const placeImages = {
  "Charminar": "https://tse4.mm.bing.net/th/id/OIP.3QJFF7ZATWM6zwrHnoF6VAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  "Golconda Fort": "https://th.bing.com/th/id/R.b00a3e5fe81b6b4fd0ffe069b13876d8?rik=p56tYV8pggFuFA&riu=http%3a%2f%2fimage3.mouthshut.com%2fimages%2fimagesp%2f925667402s.jpg&ehk=Gepx51hsFB0R7ViTBGfLtRm2TgTTqP7TaXnkuxiX1vw%3d&risl=1&pid=ImgRaw&r=0",
  "Ramoji Film City": "https://vid.alarabiya.net/images/2018/06/18/e5c03cc2-7e8f-4282-a234-c7b3e7457202/e5c03cc2-7e8f-4282-a234-c7b3e7457202.jpg",
  "Birla Mandir": "https://image3.mouthshut.com/images/imagesp/925740966s.jpg",
};

function Planner({ setSavedTrips }) {
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [type, setType] = useState("friends");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch("http://127.0.0.1:5000/plan-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budget: Number(budget),
        days: Number(days),
        type: type,
      }),
    });

    const data = await response.json();
    setResult(data);

    if (setSavedTrips) {
      setSavedTrips((prev) => [...prev, { budget, days, type }]);
    }
  };

  return (
    <div>
      <h2>🌍 Smart Travel Planner</h2>

      <div className="card">
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="friends">Friends</option>
          <option value="family">Family</option>
          <option value="solo">Solo</option>
        </select>

        <button onClick={handleSubmit}>Plan Trip</button>
      </div>

      {/* 🔥 GRID VIEW */}
      {result && result.plans && (
        <div className="result">
          <h3>📍 Your Plans</h3>

          {["fast", "balanced", "relaxed"].map((planType) => (
            <div key={planType}>
              <h3>{planType.toUpperCase()} PLAN</h3>

              {result.plans[planType].itinerary.map((day, i) => (
                <div key={i}>
                  <h4>Day {i + 1}</h4>

                  <div className="grid">
                    {day.map((place, j) => (
                      <div className="place-card" key={j}>
                        <img
                          src={placeImages[place] || "https://source.unsplash.com/300x200/?travel"}
                          alt={place}
                        />
                        <h4>{place}</h4>
                        <p>Beautiful place to visit</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <p>💰 ₹{result.plans[planType].total_cost}</p>
              <p>🏨 {result.plans[planType].hotel}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Planner;