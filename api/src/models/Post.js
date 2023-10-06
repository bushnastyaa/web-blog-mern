import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      unique: true,
    },
    desc: { 
      type: String, 
      required: true,
    },
    img: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      required: true,
    },
    tags: {
      type: Array, 
      default: [],
    },
    viewsCount: {
      type: Number, 
      default: 0,
    }
  },
  {
    timestamps: true,
  },
);

export const PostModel = mongoose.model("Post", PostSchema);
