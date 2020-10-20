import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';

import { MONGODB_URI } from './config.js';

console.log('MONGODB_URI', MONGODB_URI);

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;
const resolvers = {
  Query: {
    sayHi: () => 'Hello World!!!',
  },
};

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MONGODB`);
    const server = new ApolloServer({ typeDefs, resolvers });
    server
      .listen(5000)
      .then((res) => console.log(`Server running at ${res.url}`));
  });
