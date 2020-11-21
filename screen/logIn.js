import React, {Component} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm } from 'react-hook-form'
import { getUser } from '../store/user'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import store from '../store'

class LogIn extends Component {
  render(){
    return (
      <View>
      {(this.props.isLoggedIn!==undefined) ?
      (<LogInDC isLoggedIn={this.props.isLoggedIn} getLoggedInUser={this.props.getLoggedInUser} navigation = {this.props.navigation} error={this.props.error} />) :
      <Text>loading</Text>
      }
      </View>

    )
  }
}

//LOGIN
function LogInDC(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [value, onChangeText] = React.useState('');
  // console.log('function props: ', props)
  const onSubmit = async data => {
    try {
      console.log('error before: ',props.error)
      await props.getLoggedInUser(data.email, value)
      console.log('error after: ',props.error)

      // console.log('login indicator', props.isLoggedIn)
      // if (props.isLoggedIn) {
      //   props.navigation.navigate('Welcome')
      // } else{
      //   alert('username or password is incorrect')
      // }
      if (props.error){
        alert('username or password is incorrect')
      }
      else{
        props.navigation.navigate('Welcome')
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
const mapState = (state) => {
  return {
    isLoggedIn: !!state.singleUser.user.id,
    user: state.singleUser.user,
    error: state.singleUser.error
  }
}
const mapDispatch = dispatch => ({
  getLoggedInUser: (email, password) => dispatch(getUser(email, password)),
})
export default connect(mapState, mapDispatch)(LogIn);
