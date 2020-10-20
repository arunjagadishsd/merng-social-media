import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';

import Post from './models/postModel.js';
import { MONGODB_URI } from './config.js';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({});
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
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
