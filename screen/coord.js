import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'
import user from '../store/user';
import { usersNearBy } from '../store/users'
//coord: {{location: {
//     type: "Point",
//     coordinates: [
//         logitude,
//         latitude,
//     ]
// }}}
export class CoordDC extends Component {
  _isMounted = false;
  state = {
    latitude: null,
    longitude: null
  };
  componentDidMount() {
    this._isMounted = true;
    updateLocation(this.props.singleUser.id)
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        const location = JSON.stringify(position);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    const users = this.props.users || []
    return (
      <View style={styles.container} >
        <Button
          title="Refresh"
          onPress={() =>
            this.findCoordinates()
          }
        />
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          {users.map(user => {
            return (
              <View>{user.name}</View>
            )
          })
          }
          {/* <Text>latitude:{this.state.latitude}</Text>
          <Text>longitude:{this.state.longitude}</Text> */}
        </TouchableOpacity>
        <Button
          title="Back to home"
          onPress={() =>
            this.props.navigation.navigate('signIn')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapState = state => {
  return {
    singleUser: state.user,
    users: state.users
  }
}
const mapDispatch = dispatch => {
  return {
    updateLocation: (userId) => dispatch(usersNearBy(userId))
  }
}

export default connect(mapState, mapDispatch)(CoordDC)
