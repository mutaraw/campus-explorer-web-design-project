// components/Post.js
import React from "react";
import { Link } from "react-router-dom";

const Post = ({ postData }) => {
  return (
    <div className="post">
      <h3>{postData.title}</h3>
      <p>{postData.content}</p>
      <Link to={`/createcomment/${postData.id}`}>
        <button className="create-comment-btn">Create Comment</button>
      </Link>
    </div>
  );
};

export default Post;
