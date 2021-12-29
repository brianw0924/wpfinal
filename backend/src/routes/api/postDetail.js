import Post from "../../models/Post";

const postDetail = async (req, res) => {
    try {
        const {pid} = req.query;
        const post = await Post.findOne({postId: pid});
        if (post) {
            res.status(200).json({"message": "success", post})
        }
    } catch (e) {
        res.status(403).json({"message": "error", "post": null})
    }
}

export default postDetail