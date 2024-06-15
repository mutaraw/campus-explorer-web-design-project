import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import "./postview.scss";
import {MdOutlineDeleteOutline} from 'react-icons/md';
import { Link } from 'react-router-dom';

const PostView = ({ post, onDelete, userDBdetails }) => {
  const [avatarFile, setAvatarFile] = useState('');
  const [postImage, setPostImage] = useState('');

//when mounted, checks for post and if post author has avatar and post has upload
//converts the files to base64
  useEffect(() => {
    const convertBufferToBase64 = (buffer) => {
      const base64String = Buffer.from(buffer).toString('base64');
      return base64String;
    };
    if(post && post.postBy.avatar){
      const profilePicBase64 = convertBufferToBase64(post.postBy.avatar.img.data);
      setAvatarFile(`data:${post.postBy.avatar.img.contentType};base64,${profilePicBase64}`);
    }
   
    if(post && post.postImage){
      const postPicBase64 = convertBufferToBase64(post.postImage.img.data);
      setPostImage(`data:${post.postImage.img.contentType};base64,${postPicBase64}`);
    }
  }, [post.postBy.avatar,post.postImage]);

  const divStyle = {
    backgroundImage: avatarFile && `url(${avatarFile})`
  };
 
  //formatting post created date 
  const createdAt = new Date(post.createdAt);
  const formattedDate = createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const handleDeleteClick = () => {
    onDelete(post._id); 
  };


  return (
    <Link to={`/posts/${post._id}`} style={{ textDecoration:'none'}} >
    <div className='postView'>
      <div className='postHeader'>
        <div className='userAvatar' style={divStyle}></div>
        <div>
        <p>{post.postBy.name}</p>
        <p style={{color:'#2d2930',fontSize:'14px'}}>{post.postBy.username}</p>
        </div>
        <div className='postDate'>
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className='postBody'>
     
        <h2 style={{color: '#000',lineHeight:'24px'}}>{post.title}</h2>
   
        <br/>
        <p className='bodyText'>{post.postBody}</p>
      </div>
      <div className='postImage' >
          <img src={postImage} style={{width: '400px', height: 'auto'}}/> 
        </div>
        {userDBdetails && userDBdetails._id === post.postBy._id && 
        <MdOutlineDeleteOutline style={{cursor:'pointer',fontSize:'16px', marginLeft:'auto'}} onClick={handleDeleteClick} />
      }
    </div>
    </Link>
  );
};

export default PostView;
