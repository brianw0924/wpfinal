import Post from "../../models/Post";

const newPost = async (req, res) => {
  const post = new Post({ 
    postId: req.body.postId, 
    title: req.body.title, 
    content: req.body.content,
    number: req.body.number,
    timestamp: req.body.timestamp,
    location: req.body.location,
    from: req.body.from,
    to: [],
  });
  console.log(req)
  try {
    await post.save();
    res.status(200).json({
      "message": "success",
    });
  } catch (e) {
    res.status(403).json({
      "message": "error",
    });
  }
};

export default newPost;
