import React, { useState, useEffect, useContext } from 'react';
import { Buffer } from 'buffer';
import './CommentView.scss';
import {MdOutlineDeleteOutline} from 'react-icons/md';



const CommentView = ({ comment, onDeleteComment }) => {
  const [avatarFile, setAvatarFile] = useState('');

  const convertBufferToBase64 = (buffer) => {
          const base64String = Buffer.from(buffer).toString('base64');
          return base64String;
        };
    useEffect(() => {
      if (comment.author.avatar) {
        const profilePicBase64 = convertBufferToBase64(comment.author.avatar.img.data);
        setAvatarFile(`data:${comment.author.avatar.img.contentType};base64,${profilePicBase64}`);
      }
    }, [comment.author.avatar]);


  const divStyle = {
    backgroundImage: avatarFile && `url(${avatarFile})`
  };

 
  const createdAt = new Date(comment.createdAt);
  const formattedDate = createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleDeleteClick = () => {
    onDeleteComment(comment._id); 
  };


  return (
    <div className='commentOuter'>
    <div className='commentMain'>
      <div  className='commentHeader'>
        <div className='userAvatarComment' style={divStyle}></div>
        <div className='userCommentDate'>
          <div>{comment.author.username}</div>
          <div className='date'>{formattedDate}</div>
        </div>
      </div>

        <div className='commentBody'>
        <p>{comment.commentText}</p>
        <MdOutlineDeleteOutline style={{cursor:'pointer',fontSize:'16px'}} onClick={handleDeleteClick} />
        </div>
       
    </div>
     <div className='deleteIconBox'>
    
     </div>
     </div>
   

  );
};

export default CommentView;
