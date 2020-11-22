import { Alert } from 'react-native';
import axios from 'axios'
import { gotUser } from './user'

export const remove = () => ({ type: REMOVE_USERS })

export const gotUsers = users => ({ type: GOT_USERS, users })

//coord: {location: {
//     type: "Point",
//     coordinates: [
//         logitude,
//         latitude,
//     ]
// }}

export const usersNearBy = (id, coord) => async dispatch => {
  try {
    const res = await axios.put(`https://fitness-buddy-backend.herokuapp.com/api/users/${id}/location`, coord)
    dispatch(gotUser(res.data))
    const { data } = await axios.get(`https://fitness-buddy-backend.herokuapp.com/api/users/${id}/nearby`)
    dispatch(gotUsers(data))
  } catch (err) {
    console.log(err.message)
  }
}

let initalState = []
export default function (state = initalState, action) {
  switch (action.type) {
    case GOT_USERS:
      return action.users;
    default:
      return state;
  }
}
