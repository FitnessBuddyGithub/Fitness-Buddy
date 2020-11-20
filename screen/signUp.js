import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form'
import { registerNewUser } from '../store/user'
import { connect } from 'react-redux'
import isEmail from "validator/lib/isEmail";


function SignUpDC(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    let user = {
      email: data.email,
      password: data.password,
      gender: data.gender
    }
    console.log(user)
    props.newUser(user)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email"
        placeholder="Email"
        // style={{ ...styles.input, borderColor: errors.email && "red" }}
        ref={register({ required: true, validate: (input) => isEmail(input) })} />
      <input name="password"
        placeholder="Password"
        // style={{ ...styles.input, borderColor: errors.password && "red" }}
        ref={register({ required: true, minLength: 6, maxLength: 10 })} />
      <select name="gender" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>
      <input type="submit" />
    </form>
  );
}

const mapDispatch = dispatch => ({
  newUser: (user) => dispatch(registerNewUser(user))
})
export default connect(null, mapDispatch)(SignUpDC);
