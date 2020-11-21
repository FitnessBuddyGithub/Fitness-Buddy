import { View, Text, Button, StyleSheet, input } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form'
import { registerNewUser } from '../store/user'
import { connect } from 'react-redux'
import isEmail from "validator/lib/isEmail";
import Constants from 'expo-constants';

function SignUpDC(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data)
    let user = {
      email: data.email,
      password: data.password,
      gender: data.Gender
    }
    console.log(user)
    props.newUser(user)
  };
  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <input name='email'
          placeholder="Email"
          style={{ ...styles.input, borderColor: errors.email ? "red" : "black" }}
          ref={register({ required: true, validate: (input) => isEmail(input) })} />
        <input name="password"
          placeholder="Password"
          style={{ ...styles.input, borderColor: errors.password ? "red" : "black" }}
          ref={register({ required: true, minLength: 6, maxLength: 10 })} />
        <label>
          Gender:
        <select name="Gender" ref={register}>
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
        </label>
        <input type="submit" />
      </form>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0
  },
  button: {
    marginTop: 40,
    color: 'white',
    backgroundColor: 'blue',
    height: 40,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: 'white'
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  }
});

const mapDispatch = dispatch => ({
  newUser: (user) => dispatch(registerNewUser(user))
})
export default connect(null, mapDispatch)(SignUpDC);
