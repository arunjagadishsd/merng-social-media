import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { SECRET_KEY } from '../config.js';

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new AuthenticationError('Authentication token not valid');
  }
  throw new AuthenticationError('No Authentication token');
};

export default checkAuth;
