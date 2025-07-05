import React, { useState } from "react";
import "../style/Profile.css";
import { FaHome, FaMoon, FaSearch, FaEdit, FaImages, FaCog } from "react-icons/fa";
import { useEffect } from "react";
const ProfilePage = () => {
  const username = localStorage.getItem("username") || "Your Name";
  const profileImage = "./profile/p1.png";
  const [bio, setBio] = useState("This is my short bio. Passionate about coding and design.");
  const [website, setWebsite] = useState("https://example.com");
  const [editing, setEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [newBio, setNewBio] = useState(bio);
  const [newWebsite, setNewWebsite] = useState(website);
  const [currentUserData, setCurrentUserData] = useState(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    return allUsers.find((u) => u.username === username) || {};
  });



  const posts = [
    "./images/nike.jpg",
    "./images/shoe.jpg",
    "./images/nike.jpg",
    "./images/shoe.jpg",
  ];

  const handleSave = () => {
    setBio(newBio);
    setWebsite(newWebsite);
    setEditing(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-theme", !darkMode);
  };

  useEffect(() => {
    const syncUserData = () => {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userData = allUsers.find((u) => u.username === username);
      if (userData) {
        setCurrentUserData(userData);
      }
    };

    syncUserData();

    window.addEventListener("focus", syncUserData);
    return () => window.removeEventListener("focus", syncUserData);
  }, [username]);


  return (
    <div className="homepage-container">
      {/* Top Bar */}
      <div className="top-bar">
        <h2 className="app-name">WPGRAM</h2>
        <div className="nav-actions">
          <FaHome className="nav-icon" />
          <FaMoon className="nav-icon" onClick={toggleTheme} />
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-container glassy with-padding with-radius">
        <div className="top-profile-row">
          <div className="profile-username-left"></div>
          <FaCog className="settings-icon" />
        </div>

        <div className="profile-info">
          <div className="profile-pic-section">
            <div className="profile-pic-border">
              <img src={profileImage} alt="profile" className="profile-img" />
            </div>
          </div>

          <div className="profile-details-section">
            <h2 className="profile-username-main">{username}</h2>

            <div className="follow-stats">
              <div className="follow-item"><strong>0</strong> Followers</div>
              <div className="follow-item">
                <strong>{currentUserData.following || 0}</strong> Following
              </div>



            </div>

            {editing ? (
              <>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  rows={3}
                  className="bio-edit-box"
                />
                <input
                  type="text"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="website-edit-box"
                />
                <button className="edit-btn" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <p className="bio-text">{bio}</p>
                <a href={website} target="_blank" rel="noreferrer" className="website-link">
                  {website}
                </a>
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  <FaEdit /> Edit Detail
                </button>
              </>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="gallery-section">
          <FaImages className="gallery-icon" />
          <div className="gallery-grid">
            {posts.map((img, idx) => (
              <img key={idx} src={img} alt={`post-${idx}`} className="gallery-img" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
