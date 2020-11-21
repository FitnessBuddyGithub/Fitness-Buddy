import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm } from 'react-hook-form'
import { getUser } from '../store/user'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import store from '../store'

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
      console.log('before', props,)
      await props.getLoggedInUser(data.email, value)

      const state = store.getState();
      console.log('is get state better', state)
      if (!state.singleUser.error) {
        props.navigation.navigate('Welcome')
      } else {
        state.singleUser.error = false
      }
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
// const mapState = (state) => {
//   return {
//     // user: state.singleUser.user,
//     // error: state.singleUser.error,
//     // users: state.users,
//   }
// }
const mapDispatch = dispatch => ({
  getLoggedInUser: (email, password) => dispatch(getUser(email, password)),
})
export default connect(null, mapDispatch)(LogInDC);
