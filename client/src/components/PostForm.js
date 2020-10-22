import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { FETCH_POST_QUERY } from '../utils/graphql';

const PostForm = () => {
  const {
    values,
    onChangeHandler,
    onSubmitHandler,
  } = useForm(createPostCallback, { body: '' });

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POST_QUERY });
      const posts = [...data.getPosts];
      const newData = { getPosts: [result.data.createPost, ...posts] };
      proxy.writeQuery({ query: FETCH_POST_QUERY, data: newData });
      values.body = '';
    },
    onError(err) {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <Form onSubmit={onSubmitHandler}>
      <h2>Create a Post:</h2>
      <Form.Input
        placeholder="Hi World"
        name="body"
        onChange={onChangeHandler}
        value={values.body}
      />
      <Button type="submit" primary>
        Submit
      </Button>
    </Form>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
