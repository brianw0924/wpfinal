import bcrypt from "bcrypt";

const Mutation = {
  // create user
  createUser: async (parent, { name, password }, { db, pubSub }) => {
    const user = await db.User.findOne({ name })
    if (user) return "exist";
    await new db.User({ 
      name, 
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
    }).save();
    return "success";
  },
  // new post
  newPost: async (parent, { input }, { db, pubSub }) => {
    const post = new db.Post(input);
    await post.save();
    const user = await db.User.findOne({ name: input.from });
    user.give.push(post._id);
    user.save();
    pubSub.publish("POST_CREATED", {
      postCreated: post,
    });
    return post;
  },
  // order
  order: async (parent, { name, postId }, { db, pubSub }) => {
    const post = await db.Post.findById(postId);
    if (post.number <= 0) return "failed";
    --post.number;
    await post.save();
    const user = await db.User.findOne({ name });
    user.order.push(postId);
    await user.save();

    pubSub.publish("ORDER_CREATED", {
      orderCreated: post,
    });
    return "success";
  },
  deletePost: async (parent, { postId }, { db, pubSub }) => {
    await db.Post.deleteOne({ _id:postId });
    pubSub.publish("POST_DELETED", {
      postDeleted: postId,
    });
    return postId;
  },

  deleteObtainPost: async (parent, { name, postId }, { db, pubSub }) => {
    await db.User.updateMany(
      { name: name },
      { $pull: { order: postId } }
    );
    return postId;
  },
};

export default Mutation;
