import Comment from "./../models/comment.js";

export const save = async (newComment) => {
    const comment = new Comment(newComment);
    return comment.save(); 
  };
  


//getting document by id and updating

export const update = async (postId, commentId, userId, updatedComment) => {
  const filter = { _id: commentId, post: postId, author: userId };
  const update = { $set: { commentText: updatedComment } };
  return await Comment.updateOne(filter, update);
};


//getting document by id and populating the user (author)
export const read = async(id) =>{
    const comment = Comment.findById(id).populate("author").exec()
    return comment;
}

//getting all comments for particular post
export const fetchAll = async(postId) =>{
  const comments = await Comment.find({post:postId}).sort({createdAt:"desc"}).populate('author').exec()
  return comments;
}

//getting document by id and deleting
export const remove = async(id) => {
    const comment = Comment.findByIdAndDelete(id).exec()
    return comment;
}

