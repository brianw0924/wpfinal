import Post from "../../models/Post";

const createPost = async (req, res) => {
    const newPost = new Post({ 
        postId: req.body.postId, 
        title: req.body.title, 
        content: req.body.content,
        number: req.body.number,
        timestamp: req.body.timestamp,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
    });
    try {
        await newPost.save();
        res.status(200).json({
            "message": "success",
        });
    } catch (e) {
        res.status(403).json({
            "message": "error",
        });
    }
};

export default createPost;
