import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";

function TripNotes() {
  // ---------------- STATE ----------------
  const [notes, setNotes] = useState({
    title: "",
    place: "",
    days: []
  });

  const [dayData, setDayData] = useState({
    day: "",
    hotel: "",
    hotelCost: "",
    placesVisited: "",
    ticketCost: "",
    experience: ""
  });

  const [allNotes, setAllNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // ---------------- LOAD ----------------
  useEffect(() => {
    const currentUser = localStorage.getItem("loggedUser") || "User";

    const saved =
      JSON.parse(localStorage.getItem(`tripNotes_${currentUser}`)) || [];

    setAllNotes(saved);
  }, []);

  // ---------------- INPUT ----------------
  const handleMainChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const handleDayChange = (e) => {
    setDayData({ ...dayData, [e.target.name]: e.target.value });
  };

  // ---------------- ADD DAY ----------------
  const addDay = () => {
    if (!dayData.day) return alert("Enter day");

    setNotes({
      ...notes,
      days: [...notes.days, { ...dayData }]
    });

    setDayData({
      day: "",
      hotel: "",
      hotelCost: "",
      placesVisited: "",
      ticketCost: "",
      experience: ""
    });
  };

  // ---------------- UPDATE DAY ----------------
  const updateDay = (i, field, value) => {
    const updated = [...notes.days];
    updated[i][field] = value;
    setNotes({ ...notes, days: updated });
  };

  // ---------------- DELETE DAY ----------------
  const deleteDay = (i) => {
    const updated = notes.days.filter((_, index) => index !== i);
    setNotes({ ...notes, days: updated });
  };

  // ---------------- TOTAL ----------------
  const getTotal = (days) => {
    return days.reduce(
      (t, d) =>
        t + Number(d.hotelCost || 0) + Number(d.ticketCost || 0),
      0
    );
  };

  // ---------------- SAVE / UPDATE ----------------
  const saveNotes = () => {
    if (!notes.title || !notes.place) {
      alert("Enter title & place");
      return;
    }

    let updated = [...allNotes];

    if (editIndex !== null) {
      updated[editIndex] = notes;
      alert("Trip updated! ✏️");
    } else {
      updated.push(notes);
      alert("Trip saved! 🎉");
    }

    setAllNotes(updated);

    const currentUser = localStorage.getItem("loggedUser") || "User";

    localStorage.setItem(
      `tripNotes_${currentUser}`,
      JSON.stringify(updated)
    );

    setNotes({ title: "", place: "", days: [] });
    setEditIndex(null);
  };

  // ---------------- EDIT ----------------
  const editNote = (i) => {
    setNotes(JSON.parse(JSON.stringify(allNotes[i])));
    setEditIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------------- DELETE ----------------
  const deleteNote = (i) => {
    const updated = allNotes.filter((_, index) => index !== i);
    setAllNotes(updated);

    const currentUser = localStorage.getItem("loggedUser") || "User";

    localStorage.setItem(
      `tripNotes_${currentUser}`,
      JSON.stringify(updated)
    );
  };

  // ---------------- SHARE ----------------
  const shareTrip = (trip) => {
    let text = `🌍 Trip: ${trip.title}\n📍 ${trip.place}\n\n`;

    trip.days.forEach((d) => {
      text += `📅 ${d.day}\n`;
      text += `📍 ${d.placesVisited}\n`;
      text += `🏨 ${d.hotel} (₹${d.hotelCost})\n`;
      text += `🎟 ₹${d.ticketCost}\n`;
      text += `✨ ${d.experience}\n\n`;
    });

    text += `💰 Total: ₹${getTotal(trip.days)}`;

    navigator.clipboard.writeText(text);
    alert("Trip copied! 🚀");
  };

  // ---------------- UI ----------------
  return (
    <>
      <Navbar />

      <div className="trip-page">
        <h1>🌍 Travel Diary</h1>

        <input
          name="title"
          placeholder="Trip Title"
          value={notes.title}
          onChange={handleMainChange}
        />

        <input
          name="place"
          placeholder="Destination"
          value={notes.place}
          onChange={handleMainChange}
        />

        {/* ADD DAY */}
        <div className="day-box">
          <input
            name="day"
            placeholder="Day"
            value={dayData.day}
            onChange={handleDayChange}
          />

          <input
            name="placesVisited"
            placeholder="Places"
            value={dayData.placesVisited}
            onChange={handleDayChange}
          />

          <input
            name="hotel"
            placeholder="Hotel Name"
            value={dayData.hotel}
            onChange={handleDayChange}
          />

          <input
            name="hotelCost"
            placeholder="Hotel Cost"
            value={dayData.hotelCost}
            onChange={handleDayChange}
          />

          <input
            name="ticketCost"
            placeholder="Entry Fee"
            value={dayData.ticketCost}
            onChange={handleDayChange}
          />

          <textarea
            name="experience"
            placeholder="Experience"
            value={dayData.experience}
            onChange={handleDayChange}
          />

          <button onClick={addDay}>➕ Add Day</button>
        </div>

        {/* LIVE EDIT */}
        {notes.days.map((d, i) => (
          <div key={i} className="note-card">

            <input
              value={d.day}
              onChange={(e) => updateDay(i, "day", e.target.value)}
            />

            <input
              value={d.placesVisited}
              onChange={(e) =>
                updateDay(i, "placesVisited", e.target.value)
              }
            />

            <input
              value={d.hotel}
              onChange={(e) => updateDay(i, "hotel", e.target.value)}
            />

            <input
              value={d.hotelCost}
              onChange={(e) =>
                updateDay(i, "hotelCost", e.target.value)
              }
            />

            <input
              value={d.ticketCost}
              onChange={(e) =>
                updateDay(i, "ticketCost", e.target.value)
              }
            />

            <textarea
              value={d.experience}
              onChange={(e) =>
                updateDay(i, "experience", e.target.value)
              }
            />

            <button onClick={() => deleteDay(i)}>🗑 Remove</button>
          </div>
        ))}

        <h3>Total Budget: ₹{getTotal(notes.days)}</h3>

        <button onClick={saveNotes}>
          {editIndex !== null ? "✏️ Update Trip" : "💾 Save Trip"}
        </button>

        {/* SAVED */}
        {allNotes.map((trip, i) => (
          <div key={i} className="note-card">
            <h3>{trip.title}</h3>
            <p>📍 {trip.place}</p>

            {trip.days.map((d, idx) => (
              <div key={idx}>
                <p>📅 {d.day}</p>
                <p>📍 {d.placesVisited}</p>
                <p>🏨 {d.hotel} (₹{d.hotelCost})</p>
                <p>🎟 ₹{d.ticketCost}</p>
                <p>✨ {d.experience}</p>
              </div>
            ))}

            <p><b>Total: ₹{getTotal(trip.days)}</b></p>

            <button onClick={() => shareTrip(trip)}>📤 Share</button>
            <button onClick={() => editNote(i)}>✏️ Edit</button>
            <button onClick={() => deleteNote(i)}>🗑 Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default TripNotes;