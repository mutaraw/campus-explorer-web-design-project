import React from 'react';
import PostView from './PostView';
import './postslist.scss';

const PostsList = ({ posts, comments, onDelete, userDBdetails }) => {

    return (
        <div className='postList'>
            {posts.map((post) => (
                <PostView key={post._id} post={post} comments={comments} onDelete={onDelete} userDBdetails={userDBdetails} />
            ))}
        </div>
    )
}

export default PostsList;