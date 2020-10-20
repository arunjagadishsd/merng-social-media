import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';

import { SECRET_KEY } from '../../config.js';
import User from '../../models/userModel.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../../utils/validators.js';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

const userResolver = {
  Mutation: {
    async login(_, { username, password }) {
      console.log('u,p', username, password);
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) throw new UserInputError('Errors', { errors });
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong Credentials';
        throw new UserInputError('Wrong Credentials', { errors });
      }
      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      console.log(valid, errors);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // TODO: Make sure user doesnt exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      console.log(username, email, password);
      const newUser = new User({
        email,
        username,
        password,
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return { ...res._doc, id: res._id, token };
    },
  },
};
export default userResolver;
