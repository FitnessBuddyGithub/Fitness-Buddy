import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm } from 'react-hook-form'
import { getUser } from '../store/user'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'


//LOGIN
function LogInDC(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [value, onChangeText] = React.useState('');

  const onSubmit = async data => {
    try {
      let user = {
        email: data.email,
        password: value,
      }
      console.log('before', props)
      await props.getLoggedInUser(data.email, value)
      // if (props.isLoggedIn) {
      //   props.navigation.navigate('Welcome')
      // }
      console.log('after', props)
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email"
        placeholder="Email"
        ref={register({ required: true, validate: (input) => isEmail(input) })} />
      <TextInput
        onChangeText={text => onChangeText(text)}
        value={value} secureTextEntry={true} />
      <input type="submit" />
    </form>
  );
}
const mapState = state => {
  return {
    user: state.singleUser.user,
    users: state.users
  }
}
const mapDispatch = dispatch => ({
  getLoggedInUser: (email, password) => dispatch(getUser(email, password)),
})
export default connect(mapState, mapDispatch)(LogInDC);
