// Feed.js
import React from "react";
import { Link } from "react-router-dom";
import "./feed.scss";
import ImageSliderAuto from "../components/ImageSliderAuto";
import { ImageData } from "../../Json/JsonData";
import Post from "../components/Post";

const Feed = () => {
  // Dummy data for posts
  const posts = [
    { id: 1, title: "Post 1", content: "This is the first post." },
    { id: 2, title: "Post 2", content: "This is the second post." },
  ];

  return (
    <div className="feed">
      <h1>Welcome To the Study Abroad Platform</h1>
      <ImageSliderAuto ImageData={ImageData} SlideInterValTime={3000} />
      <Link to="/createpost">
        <button className="create-post-btn">Create Post</button>
      </Link>
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
};

export default Feed;
