import * as postServices from "./../services/post-service.js";
import mongoose from 'mongoose';
import multer from 'multer';

//setting a successful response 
const setSuccessResponse = (obj, res) =>{
    res.status(200);
    res.json(obj);
}

//setting an error response
const setErrorResponse = (err,res) =>{
    const status = err.status || 500;
    const message = err.message || "Internal Server Error"
    res.status(status)
    res.json({error:message})
}

//storage variable for multer upload
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
      cb(null, "postPhotos/"); //stores the uploads on server in this dir
    },
    filename: (req,file,cb)=>{
      cb(null,file.originalname);
    }
  
  })
  
  const upload = multer({storage: storage}).single('postImage');


//method for creating a new post, checks if post has upload/not
//if upload exists, it expects file in the request
export const post = async (req, res) =>{
    upload(req, res, async (err) => {
        if (err) {
          setErrorResponse(err, res);
        } else {
    try{
        const {title, postType,postBy, postBody,likeCount} = req.body
        if(!title || !postType || !postBody){
            const err = new Error("Some fields are empty!")
            err.status = 400;
            throw err;
        }else{
            let newPost = null;
      
        if (req.file) { 
                newPost = await postServices.save(req.body, req.file);
            } else {
                newPost = await postServices.save(req.body);
            }
            setSuccessResponse(newPost,res);
        }       
    }catch (err){
        setErrorResponse(err,res);
    }
}
    
})
}

//method for fetching all posts 
export const index = async (req, res) =>{
    try {
        const posts = await postServices.fetchAll();
        setSuccessResponse(posts,res);
      } catch (err) {
        setErrorResponse(err,res);
      }
}


//method for filtering posts by their post type
export const filterByType = async (req, res) => {
    try {
      const postType = req.params.postType;
      const posts = await postServices.fetchByType(postType);
      setSuccessResponse(posts, res);
    } catch (err) {
      setErrorResponse(err, res);
    }
  };
  


//getting post by its id
export const find = async (req,res) =>{
    const id = req.params.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            const err = new Error("Post not found!")
            err.status = 404
            throw err;
        }else{
            const post = await postServices.read(id)
            setSuccessResponse(post,res);
        }
    }catch(err){
        setErrorResponse(err,res)
    }
}

//update method for making changes to a post
export const patch = async (req, res) => {
    const postId = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            const err = new Error("Post not found!")
            err.status = 404
            throw err;
        }
        const { title, postBody } = req.body;
        let updated = null;
        
        updated = await postServices.update(postId, req.body);    
        if (updated !== null) {
            setSuccessResponse(updated, res);
        } else {
            const err = new Error("No updates were applied to the post");
            err.status = 400;
            throw err;
        }
    } catch (err) {
        setErrorResponse(err, res)
    }
}



//delete method 
export const remove = async (req,res) =>{
    const id = req.params.id
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            const err = new Error("Post not found!")
            err.status = 404
            throw err;
        }else{
            const deleted = await postServices.remove(id)
            setSuccessResponse(deleted,res)
        }
    }catch(err){
        setErrorResponse(err,res)
    }
}


