import React from 'react'

import { Provider } from 'react-redux'
// import { Router } from 'react-router-dom'
import store from './store'
import Home from './screen/home'
//s
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

