import Post from "./../models/post.js";
import fs from 'fs';

//saving new post with default image as null, if there is avatar uploaded
//add according to the schema
export const save = async (newPost, image=null) => {
    const post = new Post(newPost);
    if(image){
      post.postImage = {
        name: image.originalname,
        img: {
          data: fs.readFileSync('./postPhotos/' + image.originalname),
          contentType: 'image/png'
        }
      }
    }
    return post.save(); 
  };


  export const update = async(postId, updatedPost) =>{
    const post = await Post.findByIdAndUpdate(postId, updatedPost).exec(); 
    return post;
}


export const read = async(id) =>{
    const post = Post.findById(id).populate("postBy").exec()
    return post;
}

export const remove = async(id) => {
    const post = Post.findByIdAndDelete(id).exec()
    return post;
}

//getting all posts populated with their associated authors in desc order
export const fetchAll = async() =>{
    const posts = await Post.find().sort({createdAt:"desc"}).populate("postBy").exec()
    return posts;
}

//getting all posts populated with their associated authors by their types
export const fetchByType = async(postType) =>{
    const posts = await Post.find({postType: postType}).sort({createdAt:"desc"}).populate("postBy").exec()
    return posts;
}


