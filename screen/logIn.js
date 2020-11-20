import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {useForm} from 'react-hook-form'
import {getUser} from '../store/user'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'


//LOGIN
function LogInDC(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [value, onChangeText] = React.useState('');
  const onSubmit = data => {
    let user = {
      email: data.email,
      password: value,
    }
    console.log(user)
    props.getLoggedInUser( data.email, value)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email"
        placeholder="Email"
        ref={register({ required: true, validate: (input) => isEmail(input)})} />
        <TextInput
        onChangeText={text => onChangeText(text)}
        value={value} secureTextEntry={true} />
      <input type="submit" />
    </form>
  );
}

const mapDispatch = dispatch => ({
  getLoggedInUser: (email, password) => dispatch(getUser(email, password))
})
export default connect(null, mapDispatch)(LogInDC);
