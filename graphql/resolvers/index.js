import postResolver from './postResolver.js';
import userResolver from './userResolver.js';

const Query = { ...postResolver.Query };
const Mutation = { ...userResolver.Mutation };
export default { Query, Mutation };
