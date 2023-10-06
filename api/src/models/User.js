import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true,
      unique: true,
    },
    email: { 
      type: String, 
      required: true,
      unique: true,
    },
    password: { 
      type: String, 
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    profileImg: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("User", UserSchema);
