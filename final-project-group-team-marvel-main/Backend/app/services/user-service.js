import User from "./../models/user.js";
import fs from 'fs';
import path from "path";

//saving new User details, checks for avatar (upload) present
//if yes, stores according to the schema defined
export const save = async (newUser, avatar) => {
    const user = new User(newUser);
    if (avatar) {
      user.avatar = {
        name: avatar.originalname,
        img: {
          data: fs.readFileSync('./profilePhotos/' + avatar.originalname),
          contentType: 'image/png'
        }
      };
    }
    return user.save();
  }

  //updating user details and returns the updated 
export const update = async(id, updatedUser, avatar = null) =>{
    const user = await User.findOneAndUpdate({ _id: id }, updatedUser, { new: true }).exec();
    if(avatar){
      user.avatar = {
        name: avatar.originalname,
        img: {
          data: fs.readFileSync('./profilePhotos/' + avatar.originalname),
          contentType: 'image/png'
        }
      }
      await user.save();
    }
        
    return user;
}

export const read = async (authID) => {
  const user = await User.findOne({ authID }).exec();
  return user;
};

export const readWithID = async(id) =>{
  const user = User.findById(id).exec()
  return user;
}

export const search = async(params) =>{
    const users = User.find(params).exec()
    return users;
}
