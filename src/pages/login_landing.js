import React, { useState, useEffect, useRef } from "react";
import "../style/login_landing.css";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/User";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const googleButton = useRef(null);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // Try to read users from localStorage first
  const getStoredUsers = () => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : mockUsers;
  };

  // Google login setup
  useEffect(() => {
    const handleCredentialResponse = (response) => {
      console.log("Google JWT ID Token:", response.credential);
      alert("Signed in with Google!");
      navigate("/home");
    };

    if (window.google && clientId) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      if (googleButton.current) {
        window.google.accounts.id.renderButton(googleButton.current, {
          theme: "outline",
          size: "large",
          width: "100%",
        });
      }
    }
  }, [clientId, navigate]);

  // ✅ MAKE THIS ASYNC
  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredUsernameOrEmail = e.target[0].value.trim().toLowerCase();
    const enteredPassword = e.target[1].value;
    let allUsers = getStoredUsers();

    if (isSignup) {
      const username = enteredUsernameOrEmail;
      const email = username.includes("@") ? username : `${username}@mail.com`;
      const img = "./profile/default.png";

      const exists = allUsers.some(
        (user) => user.username === username || user.email === email
      );

      if (exists) {
        alert("User already exists.");
      } else {
        try {
          const response = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password: enteredPassword, img }),
          });

          const data = await response.json();

          if (data.success) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("profile", data.img);
            navigate("/home");
          } else {
            alert(data.message || "Signup failed.");
          }
        } catch (err) {
          alert("Server error during signup.");
        }
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: enteredUsernameOrEmail,
            password: enteredPassword,
          }),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("username", data.username);
          localStorage.setItem("profile", data.img);
          navigate("/home");
        } else {
          alert("Invalid username/email or password.");
        }
      } catch (err) {
        alert("Server error during login.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="background-text">wpgram</div>

      <div className="login-box">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup ? (
            <>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
              <div className="checkbox-group">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I agree to the terms and conditions</label>
              </div>
              <button type="submit">Sign Up</button>
            </>
          ) : (
            <>
              <input type="text" placeholder="Username or Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
              <div ref={googleButton} className="google-signup-button"></div>
            </>
          )}
        </form>

        <p className="toggle-text">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsSignup(false)}>Login</span>
            </>
          ) : (
            <>
              New customer?{" "}
              <span onClick={() => setIsSignup(true)}>Sign up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
