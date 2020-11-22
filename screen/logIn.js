import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, RefreshControl } from 'react-native';
import { useForm } from 'react-hook-form'
import { getUser } from '../store/user'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import store from '../store'

//LOGIN
function LogInDC(props) {
  const { register, handleSubmit, watch, errors } = useForm()
  const [value, onChangeText] = React.useState('');
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  // const [refreshing, setRefreshing] = React.useState(false);
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);
  // const wait = (timeout) => {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, timeout);
  //   });
  // }
  const setUser = (email, value) => {
    console.log('email and password', email, value)
    props.getLoggedInUser(email, value)
    console.log('in setuser after fx call')
  }
  useEffect(() => {
    console.log('in on submit err should be true', props)
    if (props.error == false) {
      props.navigation.navigate('Welcome')
    } else if (props.error == true) {

      alert('error loggin in, would you like to try again?')
      setEmail('')
      setPassword('')
      // onRefresh()
    }
  })

  const onSubmit = async data => {
    await setUser(email, value)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email"
        placeholder="Email"
        ref={register({ required: true, validate: (input) => isEmail(input) })} onChange={() => setEmail(watch("email"))} />
      <TextInput
        onChangeText={text => onChangeText(text)}
        onChange={() => { setPassword(value) }}
        value={value} secureTextEntry={true} />
      <input type="submit" />
    </form>
  );
}
const mapState = (state) => {
  return {
    user: state.singleUser.user,
    error: state.singleUser.error,
    users: state.users,
  }
}
const mapDispatch = dispatch => ({
  getLoggedInUser: (email, password) => dispatch(getUser(email, password)),
})
export default connect(mapState, mapDispatch)(LogInDC);
