import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  postId: { type: String, unique: true },
  title: String,
  content: String,
  number: Number,
  timestamp: Date,
  location: String,
  from: String,
  to: [String],
}, {
  collection: 'post',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const Post = mongoose.model('Post', PostSchema);

export default Post;