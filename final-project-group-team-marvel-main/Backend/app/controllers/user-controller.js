import User from "../models/user.js";
import * as userServices from "./../services/user-service.js";
import mongoose from 'mongoose';
import path from 'path';
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

//defining storage variable for multer upload
const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null, "profilePhotos/");
  },
  filename: (req,file,cb)=>{
    cb(null,file.originalname);
  }

})

const upload = multer({storage: storage}).single('avatar');

//method for creating new user, they may have avatar uploaded
export const post = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      setErrorResponse(err, res);
    } else {
      try {
        const { authID, name, username, email, role, school, program } = req.body;
        if (!authID || !name || !username || !email) {
          const err = new Error('Some fields are empty!');
          err.status = 400;
          throw err;
        } else {
          const savedUser = await userServices.save(req.body, req.file);
          setSuccessResponse(savedUser, res);
        }
      } catch (err) {
        setErrorResponse(err, res);
      }
    }
  });
};


//method for getting users by criteria
export const index = async (req, res) =>{
    try{
        const params = req.body
            const users = await userServices.search(params)
            setSuccessResponse(users, res);
    } catch(err){
        setErrorResponse(err,res);
    }
}

//getting user by their id
export const find = async (req,res) =>{
    const id = req.params.id;
    try{
      const user = userServices.readWithID(id)
      if (!user) {
          const err = new Error("User not found!")
          err.status = 404
          throw err;
      
        }else{
            const user = await userServices.readWithID(id)
            setSuccessResponse(user,res);
        }
    }catch(err){
        setErrorResponse(err,res)
    }
}

//find user by authID
export const findByAuthID = async (req, res) => {
  const authID = req.params.authID;
  try {
    const user = await userServices.read(authID);
    if (!user) {
      const err = new Error("User not found!");
      err.status = 404;
      throw err;
    }
    setSuccessResponse(user, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};


//updating user profile information
export const patch = async (req, res) => {
  const id = req.params.id
  try {
    const user = userServices.readWithID(id)
      if (!user) {
          const err = new Error("User not found!")
          err.status = 404
          throw err;
      }
      
      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          throw new Error('Error handling the upload');
        }
        
        const { name, username, role, school, program } = req.body;
        let updated = null;
      
        if (req.file) {
              updated = await userServices.update(id, req.body, req.file);
            } else {
              updated = await userServices.update(id, req.body);
            }
        
        if (updated !== null) {
            setSuccessResponse(updated, res);
        } else {
            const err = new Error("No updates were applied to the user");
            err.status = 400;
            throw err;
        }
      });
  } catch (err) {
      setErrorResponse(err, res)
  }
}
