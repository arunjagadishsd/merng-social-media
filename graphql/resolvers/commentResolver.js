import Post from '../../models/postModel.js';
import { UserInputError } from 'apollo-server';
import checkAuth from '../../utils/checkAuth.js';

const commentResolver = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      console.log('username', username);
      if (body.trim() === '') {
        throw new UserInputError('Empty Comment', {
          errors: {
            body: 'Comment must not be empty',
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
};

export default commentResolver;
