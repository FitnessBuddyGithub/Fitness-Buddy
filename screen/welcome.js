import { View, Text, Button, StyleSheet, input } from 'react-native';
import React from 'react';
import { connect } from 'react-redux'

function WelcomePage(props) {
  return (
    <View>
      Welcome!
    </View>
  );
}

const mapState = state => {
  return {
    singleUser: state.user,
    users: state.users
  }
}
// const mapDispatch = dispatch => {
//   return {

//   }
// }

export default connect(mapState)(WelcomePage)
