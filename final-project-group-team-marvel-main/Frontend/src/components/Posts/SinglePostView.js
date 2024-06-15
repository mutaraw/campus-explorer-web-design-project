import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './singlepostview.scss';
import FileUploaderForBlog from '../FileUploader/FileUploaderForBlog';
import { Buffer } from 'buffer';
import CreateComment from '../../pages/PostComments/CreateComment';
import CommentsList from '../../pages/PostComments/CommentsList';
import { useComments } from '../comments/CommentsContextProvider';
import { toast } from 'react-toastify';

const SinglePostView = ({ post, userDBdetails }) => {

  const { postId } = useParams();

  const [avatarFile, setAvatarFile] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postDetails, setPostDetails] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments] = useComments();



  useEffect(() => {
    fetch(`http://localhost:9000/posts/${postId}`)
      .then(
        response => response.json()
      )
      .then(
        data => {
          setPostDetails(data)
          const convertBufferToBase64 = (buffer) => {
            const base64String = Buffer.from(buffer).toString('base64');
            return base64String;
          };

          if (data.postImage) {
            const postPicBase64 = convertBufferToBase64(data.postImage.img.data);
            setPostImage(`data:${data.postImage.img.contentType};base64,${postPicBase64}`);
          }
        }
      );

    fetch(`http://localhost:9000/comments/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });

  }, [postId])

  // console.log(comments)

  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  }


  const handleDeleteComment = async (id) => {

    try {
      await fetch(`http://localhost:9000/comments/comment/${id}`, {
        method: "DELETE"
      });
      toast("Deleted!")
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (err) {
      toast(err);
    }
  }




  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };


  const handleInputChange = () => {
    //it should be nothing since we are using useRef
  };


  const inputTitle = useRef("");
  const inputContent = useRef("");

  const [editable, setEditable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);


  const inputStyle = {
    outline: 'none',
    background: 'none',
    border: 'none',
  };

  const handleToggleEditable = () => {
    setEditable(!editable);
    setIsEditable(!isEditable);
  };

  const updatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", inputTitle.current.value);
    formData.append("postBody", inputContent.current.value);

    const json = Object.fromEntries(formData);
    try {
      const res = await fetch(`http://localhost:9000/posts/${postId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      });
      const data = await res.json();
      toast("Updated post!")
      setEditable(!editable);
    } catch (err) {
      toast(err);
    }
  };


  return (
    <div className='postViewMain'>
      <div className='singlePostView'>

        <div className='singlePostMain'>

          <form onSubmit={updatePost}>
            <div className='singlePostHeader'>
              {editable &&
                <label>
                  Title:
                </label>
              }
              <input
                type="text"
                name="title"
                ref={inputTitle}
                defaultValue={postDetails.title}
                onChange={handleInputChange}
                disabled={!editable}
                style={isEditable ? {} : inputStyle}
              />
            </div>


            <div className='postContentBox'>
              {editable && <label htmlFor='content'>Content: </label>}
              <textarea
                name="content"
                ref={inputContent}
                defaultValue={postDetails.postBody}
                onChange={handleInputChange}
                className='postContent'
                disabled={!editable}
                style={isEditable ? {} : inputStyle}
              />
              {/* <button type='button' onClick={handleButtonClick} style={{display: isScrollable ? "block" : "none"}}>Click to scroll&#128071;</button> */}

            </div>


            {/* <button type="submit">Create Post</button> */}
            <div className="editSaveBtn">
              <input type="button" value={editable ? "Discard" : "Edit Post"} onClick={handleToggleEditable} className="editBtnPost" />
              <input type="submit" value="Save Changes" className="saveChangesBtnPost" style={{ display: editable ? "block" : "none" }} />
            </div>
          </form>
        </div>
        {!postImage &&
          <div className='noFileBox'>

            <p>No file to show</p>
          </div>

        }
        <div>
          <img src={postImage} style={{ maxWidth: '600px', maxHeight: '400px' }} />

        </div>
      </div>
      <div className='centerComment' >

        <div>
          <CreateComment userDBdetails={userDBdetails} onNewComment={handleNewComment} />

        </div>
        <div>
          <CommentsList comments={comments} onDeleteComment={handleDeleteComment} />
        </div>
      </div>
    </div>

  );
};

export default SinglePostView;
