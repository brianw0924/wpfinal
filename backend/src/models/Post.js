import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  number: Number,
  location: String,
  from: String,
}, {
  collection: "post",
  timestamps: { updatedAt: "timestamp" }
});
export const Post = mongoose.model("Post", PostSchema);
