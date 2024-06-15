import mongoose from 'mongoose';

//post Schema with its author referring to User collection 

const postSchema = new mongoose.Schema({
    title: String,
    postType: {
        type: String,
        enum: ['regular', 'roommate', 'event']
    },
    postBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    postBody: String,
    likeCount: Number, 
    postImage: {
        name: String,
        img: {
        data: Buffer,
        contentType: String
      }
    }
},{ timestamps: {createdAt:'createdAt', updatedAt: 'lastModified'} })

const Post = mongoose.model("Post",postSchema);

export default Post;