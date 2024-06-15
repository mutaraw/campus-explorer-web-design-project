import mongoose from "mongoose";

//comment Schema with its author referring to User collection 
//and post referring to Post collection
const commentSchema = new mongoose.Schema({
    commentText: { type: String, required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    }
},{ timestamps: {createdAt: 'createdAt',updatedAt: 'lastModified'}})

const Comment = mongoose.model("Comment",commentSchema);

export default Comment;