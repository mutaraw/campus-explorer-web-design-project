import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../components/Users/UserContext';
//import { useComments } from '../components/comments/CommentsContextProvider';
import PostsList from '../../components/Posts/PostsList';
import './home.scss';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

//import CreatePost from '../PostComments/CreatePost'


const Home = () => {
  const navigate = useNavigate();
  const userDBdetails = useContext(UserContext);
  const [posts, setPosts] = useState([]);


  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const toCreatePost = () => {
    navigate('/createpost');
  };

  useEffect(() => {
    fetch("http://localhost:9000/posts")
      .then(
        response => response.json()
      )
      .then(
        data => {
          setPosts(data)
        }
      )
  }, [])


  const handleDeletePost = async (id) => {
    try {
      await fetch(`http://localhost:9000/posts/${id}`, {
        method: "DELETE"
      });
      toast("Deleted!")
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      toast(err);
    }
  }
  const handleFilterByType = async (postType) => {
    try {
      let response;
      if (postType) {
        response = await fetch(`http://localhost:9000/posts/type/${postType}`, {
          method: "GET"
        });
      } else {
        response = await fetch("http://localhost:9000/posts", {
          method: "GET"
        });
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      toast(err);
    }
  };

  const [filterType, setFilterType] = useState("all");

  const handleFilter = async (e) => {
    const postType = e.target.value === "" ? null : e.target.value;
    setFilterType(postType);
    if (postType === 'all') {
      // fetch all posts
      await handleFilterByType(null); // pass null to fetchAll
    } else {
      // fetch posts by postType
      await handleFilterByType(postType);
    }
  }

  const postTypes = ["regular", "roommate", "event"];



  return (
    <div className='homeBody'>
      {/* <h1>Home</h1> */}
      <div>
        <button className='createBtn' onClick={toCreatePost}>Create post</button>
      </div>
      <div className="filter">
        <h3>Need filtering?&#129300;</h3>
        <select value={filterType} onChange={handleFilter}>
          <option value="">Select post type</option>
          {postTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {/* <button onClick={handleFilter}>Filter</button> */}
      </div>
      <PostsList posts={posts} onDelete={handleDeletePost} onFilterByType={handleFilterByType} userDBdetails={userDBdetails} />

    </div>
  )
}

export default Home
