import bcrypt from "bcrypt";

const Query = {
  // find user
  findUser: async (parent, { name, password }, { db }, info) => {
    const user = await db.User.findOne({ name });
    if (!user) return "User not found.";
    if (!bcrypt.compareSync(password, user.password))
      return "Wrong password.";
    return "success";
  },
  // get all posts
  allPosts: async (parent, args, { db }, info) => {
    const posts = await db.Post.find().sort({ timestamp: -1 });
    return posts;
  },
  // get posts given by user
  givePosts: async (parent, { user }, { db }, info) => {
    const findUser = await db.User.findOne({ name: user });
    return await db.Post.find().where("_id").in(findUser.give);
  },
  // get posts ordered by user
  obtainPosts: async (parent, { user }, { db }, info) => {
    const findUser = await db.User.findOne({ name: user });
    return await db.Post.find().where("_id").in(findUser.order);
  },
  // get posts with number > 0
  validPosts: async (parent, args, { db }, info) => {
    const posts = await db.Post.find({number: { $gt: 0 } }).sort({ timestamp: -1 });
    // console.log(posts);
    return posts
  },
  // get post detail
  postDetail: async (parent, { postId }, { db }, info) => {
    const post = await db.Post.findById(postId);
    return post;
  },
};

export default Query;
