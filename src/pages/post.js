import React, { useState, useRef } from "react";
import { FaCamera, FaImage, FaUpload, FaHeart, FaShare, FaComment } from "react-icons/fa";
import "../style/post.css";

const PostPage = () => {
  const [preview, setPreview] = useState(null);
  const [posts, setPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("posts") || "[]");
  });

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const username = localStorage.getItem("username") || "Your Name";

  // Upload from Gallery
  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Open File Picker
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // Open Camera
  const openCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  // Capture Photo from Camera
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setPreview(dataURL);

    // Stop camera
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  // Upload Post
  const handleUpload = () => {
    if (preview) {
      const newPost = { image: preview, username };
      const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const updatedPosts = [newPost, ...existingPosts];
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
      setPreview(null);
    }
  };


  return (
    <div className="post-page-container">
      <h2 className="post-header">CREATE POST</h2>

      <div className="button-group">
        <button onClick={openFilePicker}><FaImage /> Upload from Gallery</button>
        <button onClick={openCamera}><FaCamera /> Take Photo</button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleGalleryUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Camera */}
      <div className="camera-section">
        <video ref={videoRef} width="300" height="250" />
        <canvas ref={canvasRef} width="300" height="250" style={{ display: "none" }} />
        <button onClick={capturePhoto}>Capture</button>
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="preview-section">
          <img src={preview} alt="Preview" />
          <button onClick={handleUpload}><FaUpload /> Upload</button>
        </div>
      )}

      {/* Feed Section */}
      <div className="feed">
        {posts.map((post, idx) => (
          <div key={idx} className="post">
            <div className="post-header">{post.username}</div>
            <img src={post.image} alt="Uploaded" />
            <div className="post-actions">
              <FaHeart /> <FaShare /> <FaComment />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
