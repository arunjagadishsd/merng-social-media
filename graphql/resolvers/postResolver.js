import Post from '../../models/postModel.js';
const postResolver = {
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

export default postResolver;
