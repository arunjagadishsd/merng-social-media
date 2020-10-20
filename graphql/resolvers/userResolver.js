import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../../config.js';
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
      const user 
      password = await bcrypt.hash(password, 12);
      console.log(username, email, password);
      const newUser = new User({
        email,
        username,
        password,
      });
      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      return { ...res._doc, id: res._id, token };
    },
  },
};
export default userResolver;
