import postResolver from './postResolver.js';
import userResolver from './userResolver.js';
import commentResolver from './commentResolver.js';

const Query = { ...postResolver.Query };
const Mutation = {
  ...userResolver.Mutation,
  ...postResolver.Mutation,
  ...commentResolver.Mutation,
};
export default { Query, Mutation };
