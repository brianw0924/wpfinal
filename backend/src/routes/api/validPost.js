import Post from "../../models/Post";

const validPost = async (req, res) => {
    try {
        const posts = await Post.find({number: { $gt: 0 } }); // find numbers > 0
        if (posts.length === 0) {
            res.status(403).json({message: "error", data: null})
        } else {
            res.status(200).json({message: "success", data: [...posts]})
        }
    } catch (e) {
        res.status(403).json({message: "error", data: null})
    }
}

export default validPost