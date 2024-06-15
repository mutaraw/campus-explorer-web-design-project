import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    authID: {type: String, required: true},
    name: String,
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['studied', 'guest', 'studying']
    },
    school: String,
    program: String,
    avatar: {
      name: String,
      img: {
        data: Buffer,
        contentType: String
      }
    }
  });

const User = mongoose.model("User",userSchema);

export default User;