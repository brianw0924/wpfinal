const Subscription = {
  postCreated: {
    subscribe(parent, args, { db, pubSub }) {
      return pubSub.asyncIterator("POST_CREATED");
    },
  }
  // orderCreated: Post!
  // message: {
  //   subscribe(parent, { from, to }, { pubsub }, info) {
  //     const chatBoxName = makeName(from, to);
  //     return pubsub.asyncIterator(`chatBox $(chatBoxName)`);
  //   },
  // }
};

export default Subscription;
