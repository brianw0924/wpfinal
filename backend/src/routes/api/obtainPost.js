import Post from "../../models/Post";

const obtainPost = async (req, res) => {
    try {
        const posts = await Post.find({to: req.body.user}); // find "to" which include user
        if (posts.length === 0) {
            res.status(403).json({message: "error", data: null})
        } else {
            res.status(200).json({message: "success", data: [...posts]})
        }
    } catch (e) {
        res.status(403).json({message: "error", data: null})
    }
}

export default obtainPost