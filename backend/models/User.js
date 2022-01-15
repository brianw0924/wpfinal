import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  give: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  order: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  n_order: Number
}, {
  collection: "user",
});

const User = mongoose.model("User", UserSchema);

export default User
