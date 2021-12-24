import Post from "../../models/Post";

const order = async (req, res) => {
  const post = await Post.findOne({
    postId: req.body.postId,
  });
  try {
    if (post.to.length < post.number) {
      post.to = [...to, post.body.user];
      res.status(200).json({
        "message": "success",
      });
      return post.save();
    } else {
      res.status(200).json({
        "message": "failed",
      });
    }
  } catch (e) {
    res.status(403).json({
      "message": "error",
    });
  }
}

export default order;