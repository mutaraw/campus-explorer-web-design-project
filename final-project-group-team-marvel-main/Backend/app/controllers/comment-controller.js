import * as commentServices from "./../services/comment-service.js";
import mongoose from 'mongoose';

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

//controller method for creating a new comment
export const post = async (req, res) =>{
    try{
        const {commentText, author, post} = req.body
        let savedComment = null;
        savedComment = await commentServices.save(req.body);
        setSuccessResponse(savedComment,res);     
    }catch (err){
        setErrorResponse(err,res);
    }
    
}

//method for fetching all comments by post
export const index = async (req, res) =>{
    try {
    
        const postId = req.params.id;
        const comments = await commentServices.fetchAll(postId);
        setSuccessResponse(comments,res);
      } catch (err) {
        setErrorResponse(err,res);
      }
}

//getting comment by its id
export const find = async (req,res) =>{
    const id = req.params.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            const err = new Error("Comment not found!")
            err.status = 404
            throw err;
        }else{
            const comment = await commentServices.read(id)
            setSuccessResponse(comment,res);
        }
    }catch(err){
        setErrorResponse(err,res)
    }
}

//deleting comment by its id
export const remove = async (req,res) =>{
    const id = req.params.id
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            const err = new Error("Comment not found!")
            err.status = 404
            throw err;
        }else{
            const deleted = await commentServices.remove(id)
            setSuccessResponse(deleted,res)
        }
    }catch(err){
        setErrorResponse(err,res)
    }
}