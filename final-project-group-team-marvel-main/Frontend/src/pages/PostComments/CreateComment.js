import React, { useState , useRef} from "react";
import { useParams } from "react-router-dom";
import './CreateComment.scss';
import { toast } from 'react-toastify';


const CreateComment = ({userDBdetails, onNewComment}) => {
  const [comment, setComment] = useState("");
  const { postId } = useParams();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("commentText", comment);
    formData.append("author", userDBdetails._id);
    formData.append("post", postId);
    
    const json = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:9000/comments", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      });
      const newComment = await response.json();
      toast("Comment added!")

      const populatedCommentResponse = await fetch(`http://localhost:9000/comments/comment/${newComment._id}?populate=true`);
    const populatedComment = await populatedCommentResponse.json();

    // Update the state of the CommentsList component with the new comment
    onNewComment(populatedComment);
     
    } catch (err) {
      toast(err);
    }
    setComment("");
  };

  const inputComment = useRef("");

  return (
    <div className="create-comment">
      <h2>Comment &#128173;</h2>
      <form onSubmit={handleSubmit} className="commentForm">
        <textarea
          value={comment}
          // ref={inputComment}
          onChange={handleCommentChange}
          placeholder="Enter your comment here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateComment;
