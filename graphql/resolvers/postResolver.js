import { AuthenticationError, UserInputError } from 'apollo-server';

import Post from '../../models/postModel.js';
import checkAuth from '../../utils/checkAuth.js';

const postResolver = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        else throw new Error('Post Not Found');
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // To create new post
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
      });
      const post = await newPost.save();

      context.pubsub.publish('NEW_POST', { newPost: post });
      return post;
    },
    // To delete a post
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        console.log('user', user);
        console.log('post', post);
        if (
          user.username === post.username &&
          user.id === post.user.toString()
        ) {
          await post.deleteOne();
          return 'Post Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // To like or unlike a post
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      console.log('username', username);
      const post = await Post.findById(postId);
      console.log('post', post);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // post already liked, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post Not Found');
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
};

export default postResolver;
