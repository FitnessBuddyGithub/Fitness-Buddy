import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Home from './screen/home'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

