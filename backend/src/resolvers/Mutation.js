const Mutation = {
  // create user
  createUser: async (parent, { name }, { db, pubSub }) => {
    const user = await db.User.findOne({ name })
    if (user) return "exist";
    await new db.User({ name }).save();
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

    // pubSub.publish("ORDER_CREATED", {
    //   orderCreated: post,
    // });
    return "success";
  },
};

export default Mutation;
