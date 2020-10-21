import mongoose from 'mongoose';
const postSchema = new mongoose.Schema(
  {
    body: String,
    username: String,
    comments: [
      new mongoose.Schema(
        { body: String, username: String, createdAt: String },
        { timestamps: true }
      ),
    ],
    likes: [
      new mongoose.Schema(
        { username: String, createdAt: String },
        { timestamps: true }
      ),
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
);
const Post = mongoose.model('Post', postSchema);

export default Post;
