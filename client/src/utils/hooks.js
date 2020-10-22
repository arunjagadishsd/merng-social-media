import { useState } from 'react';

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    callback();
  };
  return { onChangeHandler, onSubmitHandler, values };
};

export { useForm };
