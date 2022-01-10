const Subscription = {
  postCreated: {
    subscribe(parent, args, { pubSub }) {
      return pubSub.asyncIterator("POST_CREATED");
    },
  },
  orderCreated: {
    subscribe(parent, args, { pubsub }) {
      return pubsub.asyncIterator("ORDER_CREATED");
    },
  },
  postDeleted: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.asyncIterator("POST_DELETED");
    }
  },
};

export default Subscription;
