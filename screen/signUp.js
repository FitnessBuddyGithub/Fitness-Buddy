import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form'


function SignUp() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstName" ref={register({ required: true, maxLength: 20 })} />
      <select name="gender" ref={register({ pattern: /^[A-Za-z]+$/i })}>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>
      <input type="submit" />
    </form>
  );
}

export default SignUp;
