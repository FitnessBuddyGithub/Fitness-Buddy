import { Alert } from 'react-native';
import axios from 'axios'
import { noExtendLeft } from 'sequelize/types/lib/operators';

const GOT_USERS = 'GOT_USERS'

export const gotUser = user => ({ type: GOT_USER, user })

export const remove = () => ({ type: REMOVE_USERS })

export const gotUsers = users => ({ type: GOT_USERS, users })

//coord: {{location: {
//     type: "Point",
//     coordinates: [
//         logitude,
//         latitude,
//     ]
// }}}
export const usersNearBy = (id, coord) => async dispatch => {
  try {
    await axios.put(`/heroku/users/${id}/location`, coord)
    const { data } = await axios.get(`/heroku/users/${id}/nearby`)
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
