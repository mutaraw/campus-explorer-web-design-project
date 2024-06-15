import React, { useState, useRef } from 'react';
import './CreatePost.scss';
import FileUploaderForBlog from '../../components/FileUploader/FileUploaderForBlog';
import { toast } from 'react-toastify';


const CreatePost = ({ userDBdetails, addPost }) => {

  // console.log(userDBdetails)

  const [selectedFile, setSelectedFile] = useState(null);
  const [newPost, setNewPost] = useState(null);

  const handleInputChange = () => {
    //it should be nothing since we are using useRef
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", inputTitle.current.value);
    formData.append("postType", inputType.current.value);
    formData.append("postBy", userDBdetails._id);
    formData.append("postBody", inputContent.current.value);
    if (selectedFile) {
      formData.append("postImage", selectedFile);
    }


    try {
      const response = await fetch("http://localhost:9000/posts", {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      toast("Saved");
      setNewPost(data);
      addPost(data);

    } catch (err) {
      toast(err);
    }
  };


  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };

  const divStyle = {
    backgroundImage: selectedFile
      && `url(${URL.createObjectURL(selectedFile)})`

  };

  const inputTitle = useRef("");
  const inputType = useRef("");
  const inputContent = useRef("");


  return (
    <div className='createPostBody'>
      {/* <h2 className='createPostTitle'>Write your <br/>post here&#128591;</h2> */}
      {/* <h2>Create a new post</h2> */}
      <div className='postMain'>

        <form onSubmit={handlePostSubmit}>
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                ref={inputTitle}
                // value={postData.title}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="postType">Post Type:</label>
            <select id="postType" name="postType" ref={inputType}>
              <option value="regular">Experience Share</option>
              <option value="roommate">Roommate Search</option>
              <option value="event">Event Info</option>
            </select>
          </div>

          <div className='createContentBox'>
            <label htmlFor='content'>Content: </label>
            <textarea
              name="content"
              ref={inputContent}
              // value={postData.content}
              onChange={handleInputChange}
              className='postContent'
            />

          </div>

          <FileUploaderForBlog onFileSelected={handleFileSelected} />
          <div className='upload'>

            <h3>{selectedFile && selectedFile.name}</h3>
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
      {selectedFile &&
        <div className='uploadImageBox'>
          <h4>Upload Preview &#128064;</h4>
          <div className='uploadImage' style={divStyle} >

            {/* <img src={URL.createObjectURL(selectedFile)} style={{width: '500px', height: 'auto'}}/>  */}
          </div>
        </div>
      }
    </div>
  );
};

export default CreatePost;
