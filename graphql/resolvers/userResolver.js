import User from '../../models/userModel.js';
const userResolver = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: validate the user data
      // TODO: Make sure user doesnt exist
      // TODO: hash passowrd and create auth token
    },
  },
};
