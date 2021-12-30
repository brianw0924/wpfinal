import Post from "../../models/Post";

const givePost = async (req, res) => {
    try {
        const posts = await Post.find({from: req.body.user}); // find "from" == user
        if (posts.length === 0) {
            res.status(403).json({message: "error", data: null})
        } else {
            res.status(200).json({message: "success", data: [...posts]})
        }
    } catch (e) {
        res.status(403).json({message: "error", data: null})
    }
}

export default givePost