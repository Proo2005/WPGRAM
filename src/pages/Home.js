// src/pages/HomePage.jsx
import React, { useState } from "react";
import "../style/Home.css";
import {
  FaMoon, FaSearch, FaUser, FaCog, FaHome, FaUsers, 
  FaHeart, FaShare, FaComment, FaArrowLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


// USERS IN STORY
const users = [
  { name: "Alice", id: 1, img: "./profile/p1.png" },
  { name: "Bob", id: 2, img: "./profile/p2.png" },
  { name: "Charlie", id: 3, img: "./profile/p3.png" },
  { name: "Daisy", id: 4, img: "./profile/p4.png" },
  { name: "Eve", id: 5, img: "./profile/p5.png" }
];


// USERS IN POSTS
const initialPosts = [
  { id: 1, name: "Alice", image: "./images/nike.jpg", likes: 0, liked: false },
  { id: 2, name: "Bob", image: "./images/shoe.jpg", likes: 0, liked: false },
  { id: 3, name: "Charlie", image: "./images/nike.jpg", likes: 0, liked: false },
  { id: 4, name: "Daisy", image: "./images/shoe.jpg", likes: 0, liked: false },
  { id: 5, name: "Eve", image: "./images/nike.jpg", likes: 0, liked: false }
];


//USER IN MESSAGE
const messages = {
  1: ["Hey Alice!"],
  2: ["Hi Bob!"],
};


// MY PROFILE IMAGE
const userProfileImage = "./profile/p1.png";




const HomePage = () => {
  const [activeChat, setActiveChat] = useState(null);                // CHAT MENU
  const [messageInput, setMessageInput] = useState("");              // MESSAGE INPUT IN RIGHT BOX
  const [chatData, setChatData] = useState(messages);                // CHAT DATA IN RIGHT BOX
  const [activeCommentPost, setActiveCommentPost] = useState(null);  // POST COMMENT FEED BOX
  const [commentInput, setCommentInput] = useState("");              // COMMENT INPUT IN COMMENT FEED BOX
  const [comments, setComments] = useState({});                      // COMMENTS IN COMMENT FEED BOX
  const [searchQuery, setSearchQuery] = useState("");                // SERACH BOX SEARCH QUERY TOP BAR
  const [posts, setPosts] = useState(initialPosts);                  // USER POSTS
  const [darkMode, setDarkMode] = useState(true);                    // DARKMODE TOGGLE ON OFF
  const navigate = useNavigate();                                    // NAVIGATION


  const username = localStorage.getItem("username") || "Your Name";
  

  // RIGHT BOX SEND MESSAGE
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setChatData((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), messageInput],
    }));
    setMessageInput("");
  };

  // BLACK MODE ON OFF TOGGLE
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-theme", !darkMode);
  };
  

  //LIKE POST FEED BOX
  const handleLike = (id) => {
    setPosts(posts.map((post) =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };
  

  // GENERATE LINK OF POST TO SHARE TO OTHERS
  const handleShare = (imageUrl) => {
    const fullUrl = window.location.origin + "/" + imageUrl.replace("./", "");
    navigator.clipboard.writeText(fullUrl);
    alert("Image link copied to clipboard: " + fullUrl);
  };
  

  // COMMENT SEND IN POST WITH DELETE BUTTON
  const handleSendComment = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(), // unique ID
      user: username,
      img: userProfileImage,
      text: commentInput,
      liked: false,
    };

    setComments((prev) => ({
      ...prev,
      [activeCommentPost]: [...(prev[activeCommentPost] || []), newComment],
    }));

    setCommentInput("");
  };

  // COMMENT DELETE IN POST WITH DELETE BUTTON
  const deleteComment = (postId, commentId) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((c) => c.id !== commentId),
    }));
  };



  // POST LIKE OR UNLIKE FEED 
  const toggleCommentLike = (postId, commentId) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((c) =>
        c.id === commentId ? { ...c, liked: !c.liked } : c
      ),
    }));
  };
  

  



  return (
    <div className="homepage-container">
      {/* Top Navigation */}
      <div className="top-bar">
        <h2 className="app-name">WPGRAM</h2>
        <div className="nav-actions">
          <FaHome className="nav-icon large" />
          <FaMoon className="nav-icon large" onClick={toggleTheme} />

          <div className="search-bar">
            <FaSearch />
            <div className="input-wrapper">
             
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>
          {searchQuery && (
            <div className="search-results">
              {users.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).length > 0 ? (
                users
                  .filter((user) =>
                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((user) => (
                    <div
                      key={user.id}
                      className="search-result-item"
                      onClick={() => {
                        setActiveChat(user.id);
                        setSearchQuery("");
                      }}
                    >
                      <img src={user.img} alt={user.name} className="search-result-avatar" />
                      <span>{user.name}</span>
                    </div>
                  ))
              ) : (
                <div className="no-results">No profile found</div>
              )}
            </div>
          )}


        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout with-gap">
        {/* Left Sidebar */}
        <div className="sidebar-left glassy with-padding with-radius">
          <div className="profile-section">
            <img src={userProfileImage} alt="Profile" className="profile-icon" />
            <span>{username}</span>
          </div>
          <div className="menu">
            <div><FaHome className="nav-icon" /> Home</div>
            <div><FaUsers className="nav-icon" /> Friends</div>
            <div onClick={() => navigate('/profile')} style={{ cursor: "pointer" }}>
              <FaCog className="nav-icon" /> Settings
            </div>

          </div>
        </div>

        {/* Middle Feed */}
        <div className="main-feed glassy with-padding with-radius">
          <div className="story-row">
            {/* Your status story */}
            <div className="story-icon">
              <div className="glow-avatar">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"
                  alt="Your status"
                  className="glow-avatar-img"
                />
              </div>
              <span> + Your story </span>
            </div>

            {/* Other user stories */}
            {users.map((user) => (
              <div key={user.id} className="story-icon">
                <div className="glow-avatar">
                  <img src={user.img} alt={user.name} className="glow-avatar-img" />
                </div>
                <span>{user.name}</span>
              </div>
            ))}
          </div>


          <div className="posts-area">
            {posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <div className="small-profile-border">
                    <img
                      src={users.find((u) => u.name === post.name)?.img}
                      className="small-profile-img"
                      alt={post.name}
                    />
                  </div>
                  <span>{post.name}</span>
                </div>

                <img src={post.image} alt="Post" />
                <div className="post-actions">
                  <div onClick={() => handleLike(post.id)} style={{ color: post.liked ? 'red' : 'white' }}>
                    <FaHeart /> {post.likes}
                  </div>
                  <div onClick={() => handleShare(post.image)}>
                    <FaShare />
                  </div>
                  <div
                    onClick={() =>
                      setActiveCommentPost((prev) => (prev === post.id ? null : post.id))
                    }
                  >
                    <FaComment />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Messages */}
        <div className="sidebar-right glassy with-padding with-radius">
          {!activeChat ? (
            <>
              <h3 className="right">Your Messages</h3>
              <div className="chat-list top-aligned">
                {users.map((user) => (
                  <div key={user.id} className="chat-preview" onClick={() => setActiveChat(user.id)}>
                    <div className="chat-profile-wrapper">
                      <div className="chat-avatar-border">
                        <img src={user.img} alt={user.name} className="chat-avatar" />
                      </div>
                      <div className="chat-info">
                        <span className="chat-name">{user.name}</span>
                        <span className="chat-subtext">Tap to start chatting</span>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="chat-window">
              <div className="chat-header">
                <FaArrowLeft className="back-icon" onClick={() => setActiveChat(null)} />
                <FaUser /> <span>{users.find((u) => u.id === activeChat)?.name}</span>
              </div>
              <div className="chat-messages">
                {(chatData[activeChat] || []).map((msg, i) => (
                  <div key={i} className="chat-message gradient-message">{msg}</div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Enter message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>

        {activeCommentPost && (
          <div className="comment-panel glassy with-padding with-radius">
            <h3>Comments</h3>
            <div className="comment-list">
              {(comments[activeCommentPost] || []).map((c) => (
                <div key={c.id} className="comment-item">
                  <img src={c.img} alt={c.user} className="comment-avatar" />
                  <div className="comment-content">
                    <div className="comment-header">
                      <strong>{c.user}</strong>
                      <div className="comment-actions">
                        <span
                          onClick={() => toggleCommentLike(activeCommentPost, c.id)}
                          style={{ color: c.liked ? "red" : "white", cursor: "pointer" }}
                        >
                          ❤️
                        </span>
                        <span
                          onClick={() => deleteComment(activeCommentPost, c.id)}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                        >
                          🗑️
                        </span>
                      </div>
                    </div>
                    <div className="comment-text">{c.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="comment-input">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button onClick={handleSendComment}>Send</button>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default HomePage;
