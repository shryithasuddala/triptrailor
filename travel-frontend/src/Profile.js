import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";

function Profile() {
  const user = localStorage.getItem("loggedUser") || "User";
  const currentUser = user;

  const [showEdit, setShowEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("trips");

  const [trips, setTrips] = useState([]);
  const [notesData, setNotesData] = useState([]);

  const [profile, setProfile] = useState({
    name: localStorage.getItem(`profileName_${currentUser}`) || user,
    location: localStorage.getItem(`profileLocation_${currentUser}`) || "India",
    bio: localStorage.getItem(`profileBio_${currentUser}`) || "Travel lover ✈️",
    budget:
      localStorage.getItem(`profileBudget_${currentUser}`) || "₹20k - ₹50k",
    favorites:
      localStorage.getItem(`profileFav_${currentUser}`) || "Goa, Manali",
    image:
      localStorage.getItem(`profileImage_${currentUser}`) ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  // LOAD USER DATA
  useEffect(() => {
    const t = JSON.parse(localStorage.getItem("trips")) || [];

    const n =
      JSON.parse(localStorage.getItem(`tripNotes_${currentUser}`)) || [];

    setTrips(Array.isArray(t) ? t : []);
    setNotesData(Array.isArray(n) ? n : []);
  }, [currentUser]);

  // COMBINE TRIPS
  const allTrips = [
    ...trips,
    ...notesData.map((note) => ({
      location: note.place,
      startLocation: "From Notes",
      budget: note.budget,
      title: note.title,
      plan: note.plan || note.description,
    })),
  ];

  // IMAGE UPLOAD (BASE64 FIX)
  const handleImageUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;

      setProfile((prev) => ({
        ...prev,
        image: base64,
      }));

      localStorage.setItem(`profileImage_${currentUser}`, base64);
    };

    reader.readAsDataURL(file);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/";
  };

  // SAVE PROFILE (USER-WISE)
  const handleSave = () => {
    localStorage.setItem(`profileName_${currentUser}`, profile.name);
    localStorage.setItem(`profileLocation_${currentUser}`, profile.location);
    localStorage.setItem(`profileBio_${currentUser}`, profile.bio);
    localStorage.setItem(`profileBudget_${currentUser}`, profile.budget);
    localStorage.setItem(`profileFav_${currentUser}`, profile.favorites);

    setShowEdit(false);
  };

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-wrapper">

        {/* PROFILE CARD */}
        <div className="profile-card">

          <div className="img-box">
            <img src={profile.image} alt="profile" />

            <label className="edit-icon">
              ✏️
              <input
                type="file"
                hidden
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>
          </div>

          <h2>{profile.name}</h2>
          <p className="bio">{profile.bio}</p>

          {/* TABS */}
          <div className="tabs">
            <button
              className={activeTab === "trips" ? "active" : ""}
              onClick={() => setActiveTab("trips")}
            >
              My Trips
            </button>

            <button
              className={activeTab === "notes" ? "active" : ""}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </button>
          </div>

          {/* CONTENT */}
          <div className="tab-content">

            {/* MY TRIPS */}
            {activeTab === "trips" &&
              (allTrips.length === 0 ? (
                <p>No trips yet</p>
              ) : (
                allTrips.map((trip, i) => (
                  <div className="mini-card" key={i}>
                    <h4>{trip.title || trip.location}</h4>

                    <p>📍 {trip.location}</p>

                    {trip.budget && <p>💰 ₹{trip.budget}</p>}

                    <p>{trip.startLocation}</p>

                    {trip.plan && (
                      <p className="plan">{trip.plan}</p>
                    )}
                  </div>
                ))
              ))}

            {/* NOTES */}
            {activeTab === "notes" &&
              (notesData.length === 0 ? (
                <p>No notes</p>
              ) : (
                notesData.map((note, i) => (
                  <div className="mini-card" key={i}>
                    <h4>{note.title || "Trip Plan"}</h4>

                    <p>📍 {note.place}</p>

                    <p>💰 ₹{note.budget}</p>

                    {(note.plan || note.description) && (
                      <p className="plan">
                        {note.plan || note.description}
                      </p>
                    )}
                  </div>
                ))
              ))}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="info-card">
          <p>📍 {profile.location}</p>
          <p>💰 {profile.budget}</p>
          <p>🌍 {profile.favorites}</p>

          <button onClick={() => setShowEdit(true)}>
            Edit Profile
          </button>

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>

      {/* MODAL */}
      {showEdit && (
        <div className="modal">
          <div className="modal-box">

            <h2>Edit Profile</h2>

            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
              placeholder="Location"
            />

            <input
              value={profile.budget}
              onChange={(e) =>
                setProfile({ ...profile, budget: e.target.value })
              }
              placeholder="Budget"
            />

            <input
              value={profile.favorites}
              onChange={(e) =>
                setProfile({ ...profile, favorites: e.target.value })
              }
              placeholder="Favorites"
            />

            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              placeholder="Bio"
            />

            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;