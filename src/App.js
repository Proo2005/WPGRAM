import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login_landing";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import PostPage from "./pages/post";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
