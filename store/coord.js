const UPDATE_COORD = 'UPDATE_COORD'

export function updateCoord(coord) {
  return {
    type: UPDATE_COORD,
    coord
  }
}

const initialState = {
  latitude: null,
  longitude: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COORD:
      return action.coord
    default:
      return state
  }
}
