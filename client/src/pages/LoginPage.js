import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

const RegisterPage = ({ history }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      history.push('/');
    },
    onError(err) {
      console.log(errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    addUser();
  };
  const onChangeHandler = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });
  return (
    <div>
      <Form
        onSubmit={onSubmitHandler}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          type="text"
          error={errors.username ? true : false}
          onChange={onChangeHandler}
        ></Form.Input>
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChangeHandler}
        ></Form.Input>
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChangeHandler}
        ></Form.Input>
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={onChangeHandler}
        ></Form.Input>
        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default RegisterPage;
