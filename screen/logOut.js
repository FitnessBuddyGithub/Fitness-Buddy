import React from 'react';
import { removeUser } from '../store/user'
import { Alert, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'

class logOutDC extends React.Component {
  componentDidMount() {
    logOutUser()
  }
  render() {
    return (
      <View>
        <Text>You have successfully logged out</Text>
      </View>
    );
  }
}


const mapDispatch = dispatch => {
  return {
    logOutUser: () => dispatch(removeUser())
  }
}

export default connect(null, mapDispatch)(logOutDC);
