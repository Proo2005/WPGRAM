import React, { useState, useEffect, useRef } from "react";
import "../style/login_landing.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const googleButton = useRef(null);
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      console.log("Google JWT ID Token:", response.credential);
      alert("Signed in with Google!");
      navigate("/home"); // Redirect on Google sign-in
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      alert("Sign Up Submitted");
      const isValidSignup = true; // Replace with actual validation
      if (isValidSignup) {
        const username = e.target[0].value; // or from state
        localStorage.setItem("username", username);
        navigate("/home");
      } else {
        alert("Please fill all sign-up details correctly.");
      }
    } else {
      alert("Login Submitted");
      const isValidLogin = true; // Replace with real login logic
      if (isValidLogin) {
        const username = e.target[0].value; // or from state
        localStorage.setItem("username", username);
        navigate("/home");
      } else {
        alert("Invalid username or password.");
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
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Middle Name" />
              <input type="text" placeholder="Last Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <div className="checkbox-group">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I agree to the terms and conditions</label>
              </div>
              <button type="submit">Sign Up</button>
            </>
          ) : (
            <>
              <input type="text" placeholder="Username or Email" />
              <input type="password" placeholder="Password" />
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
