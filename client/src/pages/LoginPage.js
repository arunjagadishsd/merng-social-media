import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/authContext';

const LoginPage = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChangeHandler, onSubmitHandler, values } = useForm(
    loginUserHandler,
    { username: '', password: '' }
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      console.log(errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function loginUserHandler() {
    loginUser();
  }
  return (
    <div>
      <Form
        onSubmit={onSubmitHandler}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1> Login </h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          type="text"
          error={errors.username ? true : false}
          onChange={onChangeHandler}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChangeHandler}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul>
            {Object.values(errors).map((value) => (
              <li key={value}>{value} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default LoginPage;
