import { Alert } from 'react-native';
import axios from 'axios'

const GOT_USER = 'GOT_USER'
const REMOVE_USER = "REMOVE-USER"
const UPDATE_LOCATION = 'UPDATE_LOCATION'

export const gotUser = user => ({ type: GOT_USER, user })

export const remove = () => ({ type: REMOVE_USER })

export const getLocation = user => ({ type: UPDATE_LOCATION, user })

export const getUser = (email, password) => async dispatch => {
  try {
    const res = await axios.post('https://fitness-buddy-backend.herokuapp.com/auth/login', { email: email, password: password })
    dispatch(gotUser(res.data))
  } catch (error) {
    Alert.alert('Sorry, there was a problem signing in. Please try again.');
  }
}
//user: email, password, gender
export const registerNewUser = user => async dispatch => {
  try {
    const { data } = await axios.post('https://fitness-buddy-backend.herokuapp.com/auth/signup', user);
    dispatch(gotUser(data));
  } catch (err) {
    console.log(err.message);
  }
}
export const removeUser = () => async dispatch => {
  try {
    await axios.post('https://fitness-buddy-backend.herokuapp.com/auth/logout')
    dispatch(remove())
    history.push('/login')
  } catch (err) {
    next(err)
  }
}


let initalState = {}
export default function (state = initalState, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
