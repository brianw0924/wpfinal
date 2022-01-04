import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  give: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  order: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
}, {
  collection: "user",
});
export const User = mongoose.model("User", UserSchema);
