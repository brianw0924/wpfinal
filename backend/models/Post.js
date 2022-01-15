import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  number: Number,
  location: String,
  from: String,
  hashtag: String,
}, {
  collection: "post",
  timestamps: { createdAt: "timestamp" }
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
