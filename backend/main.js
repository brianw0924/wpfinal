import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as db from './models';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import connectMongoDB from './mongo';

const pubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubSub,
  },
});

connectMongoDB();
const port = process.env.PORT || 5000;
server.start({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
